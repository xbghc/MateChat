import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const release = () => {
  const packageSourceFile = path.resolve(__dirname, '../components/package.json');
  const packageTargetFile = path.resolve(__dirname, '../dist/package.json');
  const readmeSourceFile = path.resolve(__dirname, '../components/README.md');
  const readmeTargetFile = path.resolve(__dirname, '../dist/README.md');

  fs.copySync(packageSourceFile, packageTargetFile);
  fs.copySync(readmeSourceFile, readmeTargetFile);
};

release();
