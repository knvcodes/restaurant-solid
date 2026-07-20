// vite-seo-plugin.ts
import fs from "fs";
import path from "path";
import { globSync } from "glob";
import type { Plugin } from "vite";

interface SeoPluginOptions {
  hostname: string;
  outputDir?: string;
}

export function seoPlugin(options: SeoPluginOptions): Plugin {
  const { hostname, outputDir = "dist" } = options;

  return {
    name: "vite-seo-plugin",
    apply: "build", // Only run during production build

    async writeBundle() {
      console.log("🚀 Generating SEO files...");

      // 1. Find all route files (adjust pattern if your structure differs)
      // Looks for .tsx files in src/pages or src/routes
      const routeFiles = globSync([
        "src/pages/**/*.tsx",
        "src/routes/**/*.tsx",
      ]);

      const urls: {
        loc: string;
        lastmod: string;
        changefreq: string;
        priority: string;
      }[] = [];

      routeFiles.forEach((file) => {
        // Convert file path to URL path
        let urlPath = file
          .replace(/^src\/(pages|routes)\//, "") // Remove prefix
          .replace(/\.tsx$/, "") // Remove extension
          .replace(/\/index$/, "") // Handle index files
          .replace(/\\/g, "/"); // Fix Windows paths

        // Ensure leading slash
        if (!urlPath.startsWith("/")) {
          urlPath = "/" + urlPath;
        }

        // Skip dynamic routes like [id] or (group)
        if (urlPath.includes("[") || urlPath.includes("(")) {
          return;
        }

        urls.push({
          loc: `${hostname}${urlPath === "" ? "/" : urlPath}`,
          lastmod: new Date().toISOString().split("T")[0],
          changefreq: "weekly",
          priority: urlPath === "" ? "1.0" : "0.8",
        });
      });

      // 2. Generate sitemap.xml
      const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

      fs.writeFileSync(path.join(outputDir, "sitemap.xml"), sitemapContent);
      console.log("✅ sitemap.xml generated");

      // 3. Generate robots.txt
      const robotsContent = `User-agent: *
Allow: /

Sitemap: ${hostname}/sitemap.xml`;

      fs.writeFileSync(path.join(outputDir, "robots.txt"), robotsContent);
      console.log("✅ robots.txt generated");
    },
  };
}
