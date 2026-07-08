import sharp from "sharp";
import fs from "fs";
import path from "path";
import type { Plugin } from "vite";

type ImageConfig = {
  width: number;
  height?: number;
  fit?: "cover" | "contain" | "fill" | "inside" | "outside";
  mobile?: boolean;
};

export default function optimizeImagesPlugin(): Plugin {
  return {
    name: "optimize-images",

    buildStart() {
      // Only run on actual build, not dev
      if (process.env.NODE_ENV === "development") {
        return;
      }

      const assetsDir = path.resolve("src/assets");
      const outputDir = path.resolve("public/images/resized");

      if (fs.existsSync(outputDir)) {
        fs.rmSync(outputDir, { recursive: true, force: true });
      }
      fs.mkdirSync(outputDir, { recursive: true });

      const imageFiles: string[] = [];

      function scanDir(dir: string) {
        const items = fs.readdirSync(dir, { withFileTypes: true });
        for (const item of items) {
          const fullPath = path.join(dir, item.name);
          if (item.isDirectory()) {
            scanDir(fullPath);
          } else if (item.name.match(/\.(jpg|jpeg|png)$/i)) {
            imageFiles.push(fullPath);
          }
        }
      }

      scanDir(assetsDir);

      if (imageFiles.length === 0) {
        console.log("No images found to optimize.");
        return;
      }

      console.log(`\n🖼️  Optimizing ${imageFiles.length} images...\n`);

      const promises = imageFiles.map(async (filePath) => {
        const relativePath = path.relative(assetsDir, filePath);
        const fileName = path.basename(filePath, path.extname(filePath));

        // Determine config based on path/filename
        const config = getImageConfig(relativePath, fileName);

        // Output paths
        const outputRelPath = relativePath.replace(
          /\.(jpg|jpeg|png)$/i,
          ".webp",
        );
        const outputRelPathMobile = relativePath.replace(
          /\.(jpg|jpeg|png)$/i,
          "-mobile.webp",
        );

        const outputPath = path.join(outputDir, outputRelPath);
        const outputPathMobile = path.join(outputDir, outputRelPathMobile);
        const jpegOutputPath = outputPath.replace(".webp", ".jpg");

        fs.mkdirSync(path.dirname(outputPath), { recursive: true });

        // if imageconfig is object
        if (!Array.isArray(config)) {
          // Generate WebP
          await sharp(filePath)
            .resize(config.width, config.height, { fit: config.fit })
            .webp({ quality: 80 })
            .toFile(outputPath);

          // Generate JPEG fallback
          await sharp(filePath)
            .resize(config.width, config.height, { fit: config.fit })
            .jpeg({ quality: 80, mozjpeg: true })
            .toFile(jpegOutputPath);
        } else {
          config.forEach(async (configItem) => {
            if (Object.keys(configItem).includes("mobile")) {
              await sharp(filePath)
                .resize(configItem.width, configItem.height, {
                  fit: configItem.fit,
                })
                .webp({ quality: 80 })
                .toFile(outputPathMobile);
            } else {
              await sharp(filePath)
                .resize(configItem.width, configItem.height, {
                  fit: configItem.fit,
                })
                .webp({ quality: 80 })
                .toFile(outputPath);
            }

            // Generate JPEG fallback
            await sharp(filePath)
              .resize(configItem.width, configItem.height, {
                fit: configItem.fit,
              })
              .jpeg({ quality: 80, mozjpeg: true })
              .toFile(jpegOutputPath);
          });
        }
      });

      return Promise.all(promises) as unknown as void;
    },
  };
}

function getImageConfig(
  relativePath: string,
  fileName: string,
): ImageConfig | ImageConfig[] {
  // Hero images — full width, keep aspect ratio
  if (relativePath.includes("hero") || fileName.startsWith("welcome")) {
    return { width: 1920, fit: "inside" }; // max 1920px wide, keep ratio
  }

  if (relativePath.includes("reservation")) {
    return { width: 1113, height: 626, fit: "cover" }; // max 1920px wide, keep ratio
  }

  // Restaurant cards — fixed size
  if (relativePath.includes("restaurant")) {
    return [
      { width: 737, height: 450, fit: "cover" },
      { width: 430, height: 450, fit: "cover", mobile: true },
    ];
  }

  // Dishes — adjust as needed
  if (relativePath.includes("dishes")) {
    return { width: 600, height: 400, fit: "cover" };
  }

  // Default — just compress, don't resize much
  return { width: 1200, fit: "inside" };
}
