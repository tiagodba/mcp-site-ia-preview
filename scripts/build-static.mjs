import { cp, mkdir, readdir } from 'node:fs/promises';
import { extname, join } from 'node:path';

const root = process.cwd();
const output = join(root, 'dist');
const extensions = new Set(['.html', '.js', '.css', '.pdf', '.png', '.jpg', '.jpeg', '.webp', '.svg', '.ico', '.xml', '.txt', '.woff', '.woff2', '.mp3', '.mp4']);

await mkdir(output, { recursive: true });
for (const item of await readdir(root, { withFileTypes: true })) {
  if (item.isFile() && extensions.has(extname(item.name).toLowerCase())) {
    await cp(join(root, item.name), join(output, item.name));
  }
}
for (const folder of ['assets', 'ambientes', 'public']) {
  await cp(join(root, folder), folder === 'public' ? output : join(output, folder), { recursive: true, force: true });
}
