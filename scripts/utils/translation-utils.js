import path from 'path';
import fetch from 'node-fetch';

/**
 * Parse markdown content to separate translatable text from code blocks
 */
export function parseMarkdown(content) {
  const lines = content.split('\n');
  const parsed = {
    frontmatter: null,
    translatableContent: [],
    structure: []
  };
  
  let inFrontmatter = false;
  let inCodeBlock = false;
  let currentTranslatable = [];
  let frontmatterLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Handle frontmatter
    if (i === 0 && line === '---') {
      inFrontmatter = true;
      frontmatterLines.push(line);
      parsed.structure.push({ type: 'frontmatter', start: i });
      continue;
    }
    
    if (inFrontmatter) {
      frontmatterLines.push(line);
      if (line === '---' && i > 0) {
        inFrontmatter = false;
        parsed.frontmatter = frontmatterLines.join('\n');
        parsed.structure[parsed.structure.length - 1].end = i;
      }
      continue;
    }
    
    // Handle code blocks
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        // Save any pending translatable content
        if (currentTranslatable.length > 0) {
          parsed.translatableContent.push(currentTranslatable.join('\n'));
          parsed.structure.push({ 
            type: 'translatable', 
            index: parsed.translatableContent.length - 1,
            start: i - currentTranslatable.length,
            end: i - 1
          });
          currentTranslatable = [];
        }
        inCodeBlock = true;
        parsed.structure.push({ type: 'code', start: i, content: [line] });
      } else {
        inCodeBlock = false;
        parsed.structure[parsed.structure.length - 1].content.push(line);
        parsed.structure[parsed.structure.length - 1].end = i;
      }
      continue;
    }
    
    if (inCodeBlock) {
      parsed.structure[parsed.structure.length - 1].content.push(line);
    } else {
      // Regular translatable content
      currentTranslatable.push(line);
    }
  }
  
  // Handle remaining translatable content
  if (currentTranslatable.length > 0) {
    parsed.translatableContent.push(currentTranslatable.join('\n'));
    parsed.structure.push({ 
      type: 'translatable', 
      index: parsed.translatableContent.length - 1,
      start: lines.length - currentTranslatable.length,
      end: lines.length - 1
    });
  }
  
  return parsed;
}

/**
 * Reconstruct markdown from parsed structure and translated parts
 */
export function reconstructMarkdown(parsed, translatedParts) {
  const parts = [];
  
  for (const block of parsed.structure) {
    switch (block.type) {
      case 'frontmatter':
        // Translate frontmatter title and desc if present
        let frontmatter = parsed.frontmatter;
        if (frontmatter) {
          // Simple translation of title and desc in frontmatter
          const titleMatch = frontmatter.match(/title:\s*(.+)/);
          const descMatch = frontmatter.match(/desc:\s*(.+)/);
          
          if (titleMatch && translatedParts.frontmatterTitle) {
            frontmatter = frontmatter.replace(
              titleMatch[0], 
              `title: ${translatedParts.frontmatterTitle}`
            );
          }
          if (descMatch && translatedParts.frontmatterDesc) {
            frontmatter = frontmatter.replace(
              descMatch[0],
              `desc: ${translatedParts.frontmatterDesc}`
            );
          }
        }
        parts.push(frontmatter);
        break;
        
      case 'code':
        parts.push(block.content.join('\n'));
        break;
        
      case 'translatable':
        parts.push(translatedParts[block.index] || '');
        break;
    }
  }
  
  return parts.join('\n');
}

/**
 * Call DeepSeek API to translate content
 */
async function callDeepSeekAPI(text, apiKey, config) {
  const response = await fetch(`${config.deepseek.baseURL}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: config.deepseek.model,
      messages: [
        { role: 'system', content: config.systemPrompt },
        { role: 'user', content: text }
      ],
      temperature: config.deepseek.temperature,
      max_tokens: config.deepseek.maxTokens,
      stream: false
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`DeepSeek API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/**
 * Call DeepSeek API for incremental translation
 */
async function callDeepSeekAPIIncremental(currentChinese, previousChinese, previousEnglish, apiKey, config) {
  const userContent = `Previous Chinese version:
${previousChinese}

Current Chinese version:
${currentChinese}

Previous English translation:
${previousEnglish}`;

  const response = await fetch(`${config.deepseek.baseURL}/v1/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: config.deepseek.model,
      messages: [
        { role: 'system', content: config.incrementalSystemPrompt },
        { role: 'user', content: userContent }
      ],
      temperature: config.deepseek.temperature,
      max_tokens: config.deepseek.maxTokens,
      stream: false
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`DeepSeek API error: ${response.status} - ${error}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
}

/**
 * Translate content with retry logic
 */
export async function translateContent(contentArray, apiKey, config, options = {}) {
  const maxRetries = 3;
  
  // Handle incremental translation
  if (options.incremental && options.previousChinese && options.previousEnglish) {
    let retries = 0;
    let success = false;
    let translatedText = '';
    
    while (retries < maxRetries && !success) {
      try {
        translatedText = await callDeepSeekAPIIncremental(
          contentArray, // currentChinese
          options.previousChinese,
          options.previousEnglish,
          apiKey,
          config
        );
        
        // Apply any corrections from config
        for (const [incorrect, correct] of Object.entries(config.corrections)) {
          translatedText = translatedText.replace(
            new RegExp(incorrect, 'g'), 
            correct
          );
        }
        
        success = true;
      } catch (error) {
        retries++;
        console.warn(`Translation attempt ${retries} failed:`, error.message);
        if (retries < maxRetries) {
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retries)));
        } else {
          throw error;
        }
      }
    }
    
    return translatedText;
  }
  
  // Full translation (original logic)
  const translated = [];
  let frontmatterTitle = null;
  let frontmatterDesc = null;
  
  for (const content of contentArray) {
    // Check for title and desc in the content (if they appear outside frontmatter)
    const titleMatch = content.match(/^title:\s*(.+)$/m);
    const descMatch = content.match(/^desc:\s*(.+)$/m);
    
    let retries = 0;
    let success = false;
    let translatedText = '';
    
    while (retries < maxRetries && !success) {
      try {
        // Use full translation prompt
        const promptConfig = { ...config, systemPrompt: config.fullTranslationSystemPrompt };
        translatedText = await callDeepSeekAPI(content, apiKey, promptConfig);
        
        // Apply any corrections from config
        for (const [incorrect, correct] of Object.entries(config.corrections)) {
          translatedText = translatedText.replace(
            new RegExp(incorrect, 'g'), 
            correct
          );
        }
        
        success = true;
      } catch (error) {
        retries++;
        console.warn(`Translation attempt ${retries} failed:`, error.message);
        if (retries < maxRetries) {
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retries)));
        } else {
          throw error;
        }
      }
    }
    
    translated.push(translatedText);
    
    // Extract translated title/desc if found
    if (titleMatch) {
      const translatedTitleMatch = translatedText.match(/^title:\s*(.+)$/m);
      if (translatedTitleMatch) {
        frontmatterTitle = translatedTitleMatch[1];
      }
    }
    if (descMatch) {
      const translatedDescMatch = translatedText.match(/^desc:\s*(.+)$/m);
      if (translatedDescMatch) {
        frontmatterDesc = translatedDescMatch[1];
      }
    }
  }
  
  // Add frontmatter translations if found
  if (frontmatterTitle) translated.frontmatterTitle = frontmatterTitle;
  if (frontmatterDesc) translated.frontmatterDesc = frontmatterDesc;
  
  return translated;
}

/**
 * Convert zh-CN path to en-US path
 */
export function getTargetPath(sourcePath, rootDir) {
  // Replace zh-CN with en-US in the path
  const relativePath = path.relative(rootDir, sourcePath);
  const targetRelativePath = relativePath.replace(
    /docs[\/\\]zh-CN/,
    'docs/en-US'
  );
  
  return path.join(rootDir, targetRelativePath);
}

// Add node-fetch for environments that don't have fetch
import('node-fetch').then(module => {
  if (!globalThis.fetch) {
    globalThis.fetch = module.default;
  }
}).catch(() => {
  // Fetch is already available or will be imported when needed
});