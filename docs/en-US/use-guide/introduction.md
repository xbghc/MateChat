# MateChat

A frontend AI scenario solution UI library for easily building your AI applications. It has served multiple intelligent application transformations within Huawei and helped build intelligent assistants such as CodeArts and InsCode AI IDE.

![example](/example1.png)

![example](/example3.png)

## 🌈 Features

- AI-oriented scenario component library
- Ready to use out of the box
- Multi-scenario matching
- Multi-theme adaptation
- More features continuously evolving...

## 🖥️ Quick Start

### 1. Installation

If you haven't created a new project yet, you can use vite to initialize a `vue+ts` project first:

```bash
$ npm create vite@latest
```

```bash
$ npm i vue-devui @matechat/core @devui-design/icons
```

### 2. Import

Import `matechat` and `icon library` style files in the `main.ts` file:

```ts
import { createApp } from 'vue';
import App from './App.vue';

import MateChat from '@matechat/core';

import '@devui-design/icons/icomoon/devui-icon.css';

createApp(App).use(MateChat).mount('#app');
```

### 3. Usage

Use MateChat components in the `App.vue` file, for example:

```html
<template>
  <McBubble :content="'Hello, MateChat'" :avatarConfig="{ name: 'matechat' }"></McBubble>
</template>
```

Here's a simple example of building a conversation interface:

```ts
<template>
  <McLayout class="container">
    <McHeader :title="'MateChat'" :logoImg="'https://matechat.gitcode.com/logo.svg'">
      <template #operationArea>
        <div class="operations">
          <i class="icon-helping"></i>
        </div>
      </template>
    </McHeader>
    <McLayoutContent
      v-if="startPage"
      style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px"
    >
      <McIntroduction
        :logoImg="'https://matechat.gitcode.com/logo2x.svg'"
        :title="'MateChat'"
        :subTitle="'Hi, Welcome to MateChat'"
        :description="description"
      ></McIntroduction>
      <McPrompt
        :list="introPrompt.list"
        :direction="introPrompt.direction"
        class="intro-prompt"
        @itemClick="onSubmit($event.label)"
      ></McPrompt>
    </McLayoutContent>
    <McLayoutContent class="content-container" v-else>
      <template v-for="(msg, idx) in messages" :key="idx">
        <McBubble
          v-if="msg.from === 'user'"
          :content="msg.content"
          :align="'right'"
          :avatarConfig="{ imgSrc: 'https://matechat.gitcode.com/png/demo/userAvatar.svg' }"
        >
        </McBubble>
        <McBubble v-else :content="msg.content" :avatarConfig="{ imgSrc: 'https://matechat.gitcode.com/logo.svg' }"> </McBubble>
      </template>
    </McLayoutContent>
    <div class="shortcut" style="display: flex; align-items: center; gap: 8px">
      <McPrompt
        v-if="!startPage"
        :list="simplePrompt"
        :direction="'horizontal'"
        style="flex: 1"
        @itemClick="onSubmit($event.label)"
      ></McPrompt>
      <Button
        style="margin-left: auto"
        icon="add"
        shape="circle"
        title="New Conversation"
        size="md"
        @click="newConversation"
      />
    </div>
    <McLayoutSender>
      <McInput :value="inputValue" :maxLength="2000" @change="(e) => (inputValue = e)" @submit="onSubmit">
        <template #extra>
          <div class="input-foot-wrapper">
            <div class="input-foot-left">
              <span v-for="(item, index) in inputFootIcons" :key="index">
                <i :class="item.icon"></i>
                {{ item.text }}
              </span>
              <span class="input-foot-dividing-line"></span>
              <span class="input-foot-maxlength">{{ inputValue.length }}/2000</span>
            </div>
            <div class="input-foot-right">
              <Button icon="op-clearup" shape="round" :disabled="!inputValue" @click="inputValue = ''"><span class="demo-button-content">Clear Input</span></Button>
            </div>
          </div>
        </template>
      </McInput>
    </McLayoutSender>
  </McLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button } from 'vue-devui/button';
import 'vue-devui/button/style.css';

const description = [
  'MateChat can assist developers with coding, querying knowledge and related task information, writing documentation, etc.',
  'As an AI model, MateChat\'s answers may not always be certain or accurate, but your feedback can help MateChat do better.',
];
const introPrompt = {
  direction: 'horizontal',
  list: [
    {
      value: 'quickSort',
      label: 'Help me write a quick sort',
      iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
      desc: 'Implement a quick sort using JavaScript',
    },
    {
      value: 'helpMd',
      label: 'What can you help me with?',
      iconConfig: { name: 'icon-star', color: 'rgb(255, 215, 0)' },
      desc: 'Learn what the current large model can help you with',
    },
    {
      value: 'bindProjectSpace',
      label: 'How to bind project space',
      iconConfig: { name: 'icon-priority', color: '#3ac295' },
      desc: 'How to bind a project in the cloud space',
    },
  ],
};
const simplePrompt = [
  {
    value: 'quickSort',
    iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
    label: 'Help me write a quick sort',
  },
  {
    value: 'helpMd',
    iconConfig: { name: 'icon-star', color: 'rgb(255, 215, 0)' },
    label: 'What can you help me with?',
  },
];
const startPage = ref(true);
const inputValue = ref('');
const inputFootIcons = [
  { icon: 'icon-at', text: 'Agent' },
  { icon: 'icon-standard', text: 'Dictionary' },
  { icon: 'icon-add', text: 'Attachment' },
];

const messages = ref<any[]>([]);

const newConversation = () => {
  startPage.value = true;
  messages.value = [];
}

const onSubmit = (evt) => {
  inputValue.value='';
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
</script>

<style>
.container {
  width: 1000px;
  margin: 20px auto;
  height: calc(100vh - 82px);
  padding: 20px;
  gap: 8px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 16px;
}

.content-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
}

.input-foot-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-right: 8px;

  .input-foot-left {
    display: flex;
    align-items: center;
    gap: 8px;

    span {
      font-size: 14px;
      line-height: 18px;
      color: #252b3a;
      cursor: pointer;
    }

    .input-foot-dividing-line {
      width: 1px;
      height: 14px;
      background-color: #d7d8da;
    }

    .input-foot-maxlength {
      font-size: 14px;
      color: #71757f;
    }
  }

  .input-foot-right {
    .demo-button-content {
      font-size: 14px;
    }

    & > *:not(:first-child) {
      margin-left: 8px;
    }
  }
}
</style>
```

### 4. Theming

Implementation based on [vue-devui theming](https://vue-devui.github.io/theme-guide/).

## 🧩 Connecting to Model Services

After completing the page setup, you can start connecting to model services such as `PanGu Large Model`, `ChatGPT`, and other excellent large models. After registering and generating the corresponding model's API_Key, you can refer to the following method for invocation:

1. Install openai via npm:

```bash
$ npm install openai
```

2. Use OpenAI to initialize and call the model interface. Here's a code example:

```js
import OpenAI from 'openai';

const client = ref<OpenAI>();

client.value = new OpenAI({
  apiKey: '', // Model API Key
  baseURL: '', // Model API URL
  dangerouslyAllowBrowser: true,
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

Following the above steps, you can adjust the code in the [Quick Start] example.

Replace the following code:

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

With:

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
  for await (const chunk of completion) {
    const content = chunk.choices[0]?.delta?.content || '';
    const chatId = chunk.id;
    messages.value[messages.value.length - 1].content += content;
    messages.value[messages.value.length - 1].id = chatId;
  }
};
```

After completing the model API URL and API Key configuration, you'll have a simple application connected to a large model. If you want to refer to more complete page examples, you can check the [Demo Scenarios](https://matechat.gitcode.com/playground/playground.html).

## 📝 Feedback & Suggestions

We welcome your suggestions. Every idea you have could help us improve this project. If you have any suggestions about feature improvements, new features, documentation supplements, or other aspects, feel free to submit them in [issues](https://gitcode.com/DevCloudFE/MateChat/issues).

## 🔧 Local Development

```bash
git clone git@gitcode.com:DevCloudFE/MateChat.git
cd matechat
pnpm i
pnpm run docs:dev
```

## 📅 Feature Roadmap

MateChat is constantly evolving. You can learn about our plans here: [MateChat Feature Roadmap](https://gitcode.com/DevCloudFE/MateChat/issues/1)

## 🤝 Welcome to Contribute

We sincerely invite you to join the MateChat community and participate in the project's construction. Whether you're an experienced developer or a programming enthusiast just starting out, your contributions are essential to us. Here's our [Contributing Guide](https://gitcode.com/DevCloudFE/MateChat/blob/main/CONTRIBUTING.md).

## Who's Using It

[CodeArts PanGu Assistant](https://www.huaweicloud.com/product/codeartside/snap.html)

[InsCode AI IDE](https://inscode.csdn.net/)

## License

[MIT](https://gitcode.com/DevCloudFE/MateChat/blob/main/LICENSE)

## Contact

Welcome to join our open source community, follow DevUI WeChat Official Account: DevUI