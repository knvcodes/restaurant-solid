import sharp from "sharp";
import fs from "fs";
import path from "path";
import type { Plugin } from "vite";

export default function optimizeImagesPlugin(): Plugin {
  return {
    name: "optimize-images",

    buildStart() {
      const assetsDir = path.resolve("src/assets");
      const outputDir = path.resolve("public/images/resized");

      // Clean and recreate output dir
      if (fs.existsSync(outputDir)) {
        fs.rmSync(outputDir, { recursive: true, force: true });
      }
      fs.mkdirSync(outputDir, { recursive: true });

      // Recursively find all images
      const imageFiles: string[] = [];

      function scanDir(dir: string) {
        const items = fs.readdirSync(dir, { withFileTypes: true });

        for (const item of items) {
          const fullPath = path.join(dir, item.name);

          if (item.isDirectory()) {
            scanDir(fullPath); // recurse into subfolders
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
        // Preserve folder structure in output
        const relativePath = path.relative(assetsDir, filePath);
        const outputName = relativePath.replace(/\.png$/i, ".jpg");
        const outputPath = path.join(outputDir, outputName);

        // Create subdirectories if needed
        fs.mkdirSync(path.dirname(outputPath), { recursive: true });

        await sharp(filePath)
          .resize(737, 450, { fit: "cover" })
          .jpeg({ quality: 80, mozjpeg: true })
          .toFile(outputPath);

        const inSize = (fs.statSync(filePath).size / 1024).toFixed(1);
        const outSize = (fs.statSync(outputPath).size / 1024).toFixed(1);

        console.log(`  ✓ ${relativePath}: ${inSize} KB → ${outSize} KB`);
      });

      return Promise.all(promises) as unknown as void;
    },
  };
}
