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
      // Read current Chinese source file
      const currentContent = await fs.readFile(sourcePath, 'utf-8');
      
      // Get target path (zh-CN -> en-US)
      const targetPath = getTargetPath(file, rootDir);
      
      // Try to read existing English translation
      let previousEnglishContent = null;
      if (await fs.pathExists(targetPath)) {
        previousEnglishContent = await fs.readFile(targetPath, 'utf-8');
      }
      
      // Get previous Chinese version using git
      let previousChineseContent = null;
      let baseCommit = null;
      
      try {
        const { execSync } = await import('child_process');
        
        // First, try to find the last commit where the English file exists
        if (await fs.pathExists(targetPath)) {
          try {
            // Get the last commit that modified the English file
            baseCommit = execSync(
              `git log -1 --format=%H -- "${targetPath.replace(rootDir + '/', '')}"`,
              { encoding: 'utf-8', cwd: rootDir }
            ).toString().trim();
            
            if (baseCommit) {
              // Get the Chinese file at that commit
              previousChineseContent = execSync(
                `git show ${baseCommit}:${file}`,
                { encoding: 'utf-8', cwd: rootDir }
              ).toString();
              console.log(`   → Found base version at commit: ${baseCommit.substring(0, 7)}`);
            }
          } catch (e) {
            // English file exists but no git history, fall back to HEAD~1
          }
        }
        
        // If no base commit found, try HEAD~1
        if (!previousChineseContent) {
          previousChineseContent = execSync(
            `git show HEAD~1:${file}`,
            { encoding: 'utf-8', cwd: rootDir }
          ).toString();
        }
      } catch (gitError) {
        // If git command fails, it might be a new file
        console.log('   → Note: Unable to get previous version (might be a new file)');
      }
      
      let translatedContent;
      
      if (previousEnglishContent && previousChineseContent) {
        // Incremental translation
        console.log('   → Using incremental translation');
        translatedContent = await translateContent(
          currentContent,
          apiKey,
          translationConfig,
          {
            previousChinese: previousChineseContent,
            previousEnglish: previousEnglishContent,
            incremental: true
          }
        );
      } else {
        // Full translation (new file or no previous English version)
        console.log('   → Using full translation');
        // Parse markdown to separate translatable content from code/special blocks
        const parsed = parseMarkdown(currentContent);
        
        // Translate content
        const translatedParts = await translateContent(
          parsed.translatableContent,
          apiKey,
          translationConfig,
          { incremental: false }
        );
        
        // Reconstruct the full markdown with translated content
        translatedContent = reconstructMarkdown(parsed, translatedParts);
      }
      
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