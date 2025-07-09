# Other

Currently, most large model service APIs use OpenAI-compatible API format, but until now, there is no standard protocol defining model interface specifications, so protocol incompatibility issues may still exist.

Here we supplement the introduction of the following `fetch + SSE` integration solution for reference:

### Fetch Event Source

[Fetch Event Source](https://www.npmjs.com/package/@microsoft/fetch-event-source#usage) is a JavaScript library for handling Server-Sent Events (SSE) with all the features provided by the Fetch API.

1. Install dependencies

```bash
npm install @microsoft/fetch-event-source
```

2. Use fetchEventSource to call model interface

```typescript

import { fetchEventSource } from '@microsoft/fetch-event-source';

const getAIAnswer = (content, type) => {
  abortController = new AbortController();
  const aiAnswer = {
    from: 'ai-model',
    content: '',
    type,
    avatarPosition: 'side-left',
    avatarConfig: { ...aiModelAvatar },
    loading: true,
  };
  messages.value.push(aiAnswer);
  const source = fetchEventSource(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'user',
          content,
        },
      ],
      apikey: apiKey,
    }),
    signal: abortController.signal,
    onopen: (response) => {},
    onmessage: (msg) => {
      messages.value.at(-1).loading = false;
      if (msg.data === '[DONE]') {
        nextTick(() => {
          conversationRef.value?.scrollTo({
            top: conversationRef.value.scrollHeight,
            behavior: 'smooth',
          });
        });
        return;
      }
      const data = JSON.parse(msg.data);
      const responseContent = data.choices[0].delta.content;
      messages.value.at(-1).content += responseContent;
    },
    onerror: (err) => {
      messages.value.at(-1).loading = false;
      messages.value.at(-1).content = 'Request failed';
      throw err;
    },
  });
};

const stop = () => {
  if (abortController) {
    abortController.abort();
    abortController = null;
    // Update the status of the last message
    if (messages.value.length > 0) {
      messages.value.at(-1).loading = false;
      messages.value.at(-1).content += ' Conversation aborted';
    }
  }
};
```