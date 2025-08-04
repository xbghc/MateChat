export default {
  // DeepSeek API configuration
  deepseek: {
    model: 'deepseek-chat',
    temperature: 0.3,  // Lower temperature for more consistent translations
    baseURL: 'https://api.deepseek.com',
    maxTokens: 4000,
  },
  
  // Correction rules (add as needed when issues are found)
  corrections: {
    // Example:
    // 'incorrect translation': 'correct translation'
  },

  // System prompt for translation
  systemPrompt: `You are a professional technical documentation translator specializing in software documentation.
Translate the given Chinese text to English following these rules:
1. Maintain all Markdown formatting exactly as in the original
2. Do not translate code blocks, code snippets, or anything within backticks
3. Keep URLs, file paths, and technical identifiers unchanged
4. Translate table contents but preserve table structure
5. Maintain the tone and style appropriate for technical documentation
6. Use clear, concise, and professional English
7. Preserve all HTML tags and their attributes
8. Keep component names, API names, and technical terms consistent

Only return the translated text without any explanations or additional comments.`
};