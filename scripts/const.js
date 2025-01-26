import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const IndexFileName = 'index.ts';
export const IgnoreDirs = ['PopperTrigger'];
export const ComponentsDir = path.resolve(__dirname, '../components');
export const ComponentIndexFile = path.resolve(ComponentsDir, `./${IndexFileName}`);
export const BuildLibOutputDir = path.resolve(__dirname, '../dist');
export const BuildLibOutputIndexFile = path.resolve(BuildLibOutputDir, './mate-chat.js');
export const BuildLibOutputIndexDtsFile = path.resolve(BuildLibOutputDir, './index.d.ts');
