import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputDir = path.resolve(__dirname, '../dist/index.d.ts');

function generateIndexDts() {
  const fileStr = `import type { App } from 'vue';
  declare function install(app: App): void
  declare const _default: {
      install: typeof install;
      version: string;
  };
  export default _default;`;
  fs.outputFileSync(outputDir, fileStr, 'utf8');
}

generateIndexDts();
