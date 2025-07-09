# DeepSeek

Here we take DeepSeek as an example to introduce how to integrate DeepSeek's model services into applications built with MateChat.

DeepSeek API uses OpenAI-compatible API format. See official documentation: [DeepSeek - First API Call](https://api-docs.deepseek.com/zh-cn/)

- baseURL: https://api-docs.deepseek.com/zh-cn/
- apiKey: https://platform.deepseek.com/api_keys

After obtaining the relevant baseURL and apiKey from the DeepSeek development platform, you can adjust the example code in [Quick Start] according to the following method:

```ts
const onSubmit = (evt) => {
  inputValue.value = '';
  startPage.value = false;
  // User sends message
  messages.value.push({
    from: 'user',
    content: evt,
  });
  setTimeout(() => {
    // Model returns message
    messages.value.push({
      from: 'model',
      content: evt,
    });
  }, 200);
};
```

Replace with:

```ts
import OpenAI from 'openai';

const client = ref<OpenAI>();

client.value = new OpenAI({
  apiKey: '', // Model API Key
  baseURL: '', // Model API URL
  dangerouslyAllowBrowser: true, // Need to enable for browser environment
});

const onSubmit = (evt) => {
  inputValue.value = '';
  startPage.value = false;
  // User sends message
  messages.value.push({
    from: 'user',
    content: evt,
    avatarConfig: { name: 'user' },
  });

  fetchData(evt);
};

const fetchData = async (ques) => {
  messages.value.push({
    from: 'model',
    content: '',
    avatarConfig: { name: 'model' },
    id: '',
    loading: true,
  });
  const completion = await client.value!.chat.completions.create({
    model: 'deepseek-reasoner', // Replace according to deepseek model list
    messages: [{ role: 'user', content: ques }],
    stream: true, // Set to true to enable streaming response
  });
  messages.value[messages.value.length - 1].loading = false;
  for await (const chunk of completion) {
    const content = chunk.choices[0]?.delta?.content || '';
    const chatId = chunk.id;
    messages.value[messages.value.length - 1].content += content;
    messages.value[messages.value.length - 1].id = chatId;
  }
};
```

After completing the model API URL and API Key configuration, you'll have a simple application connected to the DeepSeek large model. If you want to refer to more complete page examples, you can check the [Demo Scenarios](https://matechat.gitcode.com/playground/playground.html).