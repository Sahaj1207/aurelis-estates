// Generates the responsive WebP set in public/images from the masters in source-images.
// Run with: npm run images
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const SRC = "source-images";
const OUT = "public/images";
const WIDTHS = [
  { width: 1376, suffix: "", quality: 80 },
  { width: 800, suffix: "-800", quality: 74 },
];

await mkdir(OUT, { recursive: true });

for (const file of await readdir(SRC)) {
  if (!/\.(jpe?g|png)$/i.test(file)) continue;
  const name = path.parse(file).name;
  for (const { width, suffix, quality } of WIDTHS) {
    const target = path.join(OUT, `${name}${suffix}.webp`);
    const info = await sharp(path.join(SRC, file))
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(target);
    console.log(`${target}  ${(info.size / 1024).toFixed(0)} KB`);
  }
}

// Social share card
const og = await sharp(path.join(SRC, "marine-house-hero.jpg"))
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile("public/og-image.jpg");
console.log(`public/og-image.jpg  ${(og.size / 1024).toFixed(0)} KB`);
