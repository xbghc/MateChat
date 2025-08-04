#!/usr/bin/env node

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import translationConfig from './translation-config.js';
import { 
  translateContent, 
  parseMarkdown, 
  reconstructMarkdown,
  getTargetPath 
} from './utils/translation-utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

async function main() {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    console.error('Error: DEEPSEEK_API_KEY environment variable is not set');
    process.exit(1);
  }

  // Get changed files from environment variable
  const changedFiles = process.env.CHANGED_FILES;
  if (!changedFiles) {
    console.log('No files to translate');
    return;
  }

  const files = changedFiles.split(',').filter(f => f.trim());
  console.log(`Found ${files.length} files to translate`);

  let successCount = 0;
  let errorCount = 0;
  const errors = [];

  for (const file of files) {
    const sourcePath = path.join(rootDir, file);
    
    // Check if file exists
    if (!await fs.pathExists(sourcePath)) {
      console.warn(`File not found: ${file}`);
      continue;
    }

    console.log(`\nTranslating: ${file}`);
    
    try {
      // Read source file
      const content = await fs.readFile(sourcePath, 'utf-8');
      
      // Parse markdown to separate translatable content from code/special blocks
      const parsed = parseMarkdown(content);
      
      // Translate content
      const translatedParts = await translateContent(
        parsed.translatableContent,
        apiKey,
        translationConfig
      );
      
      // Reconstruct the full markdown with translated content
      const translatedContent = reconstructMarkdown(parsed, translatedParts);
      
      // Get target path (zh-CN -> en-US)
      const targetPath = getTargetPath(file, rootDir);
      
      // Ensure target directory exists
      await fs.ensureDir(path.dirname(targetPath));
      
      // Write translated file
      await fs.writeFile(targetPath, translatedContent, 'utf-8');
      
      console.log(`✅ Translated successfully: ${file}`);
      console.log(`   → Saved to: ${path.relative(rootDir, targetPath)}`);
      successCount++;
      
    } catch (error) {
      console.error(`❌ Failed to translate ${file}:`, error.message);
      errors.push({ file, error: error.message });
      errorCount++;
    }
  }

  // Summary
  console.log('\n' + '='.repeat(50));
  console.log('Translation Summary:');
  console.log(`✅ Successfully translated: ${successCount} files`);
  if (errorCount > 0) {
    console.log(`❌ Failed: ${errorCount} files`);
    errors.forEach(({ file, error }) => {
      console.log(`   - ${file}: ${error}`);
    });
  }
  console.log('='.repeat(50));

  // Exit with error code if any translations failed
  if (errorCount > 0) {
    process.exit(1);
  }
}

// Run the script
main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});