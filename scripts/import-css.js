import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const importCss = () => {
  const targetFile = path.resolve(__dirname, '../dist/mate-chat.js');
  const fileContent = fs.readFileSync(targetFile);
  const outputFileContent = `import "./mate-chat.css";\n` + fileContent;
  fs.outputFile(targetFile, outputFileContent, 'utf-8');
};

importCss();
