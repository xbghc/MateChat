# Multiple Ways to Use MateChat

Currently, MateChat is primarily developed based on Vue3, but we can still integrate MateChat with your project in multiple ways.

Here are some feasible solutions for reference:

### 1. Integrate MateChat in Vue3 projects (mainstream approach)

**Applicable scenarios**: Scenarios that require deep customization of AI assistant functions and seamless integration with existing Vue projects.

**Steps**:
Refer to the usage method in [Quick Start](https://matechat.gitcode.com/use-guide/introduction.html#_1-%E5%AE%89%E8%A3%85)

```ts
import { createApp } from 'vue';
import App from './App.vue';

import MateChat from '@matechat/core';

import '@devui-design/icons/icomoon/devui-icon.css';

createApp(App).use(MateChat).mount('#app');
```

### 2. Embed independent pages through iframe

**Applicable scenarios**: Quickly add AI assistants to third-party platforms without invading the host environment.

**Steps**:

1. `Build independent MateChat page`: Create an independent Vue project containing MateChat components and package it as static resources or deploy it independently.
2. `Embed iframe`: Load the matechat application through iframe in the host page.

### 3. Integration with other frameworks (such as React/Angular)

**Applicable scenarios**: Need to integrate with existing host applications of other frameworks

**Solution suggestions**:
1. `Encapsulate Web Component`: Package MateChat components as custom elements for any framework to call.
2. `Through micro-frontend architecture`: Use micro-frontend solutions like qiankun, microApp, etc. to load MateChat as an independent sub-application.

## Future Plans (Community Co-construction)

**Official React/Angular adaptation library**: We are planning to launch adaptation versions such as `@matechat/react` and `@matechat/angular` to provide native API support.

**Sincerely invite developers to participate**: If you are familiar with React/Angular or cross-framework development, welcome to join the [MateChat project](https://gitcode.com/DevCloudFE/MateChat) to build a unified multi-framework ecosystem together!