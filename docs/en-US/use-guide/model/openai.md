# OpenAI

After completing the page setup, we can start connecting to model services such as `DeepSeek`, `PanGu Large Model`, `ChatGPT`, and other excellent large models. After registering and generating the corresponding model's API_Key, you can refer to the following method for invocation:

1. Install openai via npm:

```bash
$ npm install openai
```

2. Use OpenAI to initialize and call the model interface. Here's a code example:

> Note: Usually openai-node is used for node environment. If used in browser environment, you need to enable `dangerouslyAllowBrowser`. Enabling this configuration has security risks (API credential leakage), please ensure use in a secure environment. See [openai-node official documentation](https://github.com/openai/openai-node?tab=readme-ov-file#why-is-this-dangerous) for details.

```js
import OpenAI from 'openai';

const client = ref();

client.value = new OpenAI({
  apiKey: '', // Model API Key
  baseURL: '', // Model API URL
  dangerouslyAllowBrowser: true, // Need to enable for browser environment
});

const fetchData = (ques) => {
  const completion = await client.value!.chat.completions.create({
    model: 'my-model', // Replace with your model name
    messages: [
      { role: 'user', content: ques },
    ],
    stream: true, // Set to true to enable streaming response
  });

  for await (const chunk of completion) {
    console.log('content: ', chunk.choices[0]?.delta?.content || '');
    console.log('chatId: ', chunk.id);
  }
}
```

Combining with the MateChat [Quick Start] example code, modify the `onSubmit` function as follows:

```ts
import OpenAI from 'openai';

const client = ref<OpenAI>();

client.value = new OpenAI({
  apiKey: '', // Model API Key
  baseURL: '', // Model API URL
  dangerouslyAllowBrowser: true,
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
  // Message response bubble
  messages.value.push({
    from: 'model',
    content: '',
    avatarConfig: { name: 'model' },
    id: '',
    loading: true,
  });
  const completion = await client.value!.chat.completions.create({
    model: 'my-model', // Replace with your model name
    messages: [{ role: 'user', content: ques }],
    stream: true, // Set to true to enable streaming response
  });
  messages.value[messages.value.length - 1].loading = false;
  // Concatenate streaming response to message content
  for await (const chunk of completion) {
    const content = chunk.choices[0]?.delta?.content || '';
    const chatId = chunk.id;
    messages.value[messages.value.length - 1].content += content;
    messages.value[messages.value.length - 1].id = chatId;
  }
};
```

After completing the model API URL and API Key configuration, you'll have a simple application connected to a large model. If you want to refer to more complete page examples, you can check the [Demo Scenarios](https://matechat.gitcode.com/playground/playground.html).