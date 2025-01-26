import fs from 'fs-extra';
import { IgnoreDirs, ComponentsDir, ComponentIndexFile } from './const.js';
import { resolveFilesInfo, parseExport, createIndexTemplate } from './utils.js';

function generateComponent() {
  const exportModules = [];
  const filesInfo = resolveFilesInfo(ComponentsDir, IgnoreDirs);

  filesInfo.forEach((item) => {
    exportModules.push(parseExport(item));
  });

  const template = createIndexTemplate(exportModules);

  fs.writeFile(ComponentIndexFile, template, 'utf-8');
}

generateComponent();
