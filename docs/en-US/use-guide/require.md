# On-demand Import

In addition to full import, we also support on-demand import of individual components.

#### Global installation of individual components:

Install components in the `main.ts` file:

```ts
import App from './App.vue';
import { McBubble } from '@matechat/core';

createApp(App).use(McBubble).mount('#app');
```

Use components in any `.vue` file:

```vue
<template>
  <McBubble :content="'Hello MateChat'"></McBubble>
</template>
```

#### Direct use of individual components:

Directly import components in any `.vue` file:

```vue
<template>
  <McBubble :content="'Hello MateChat'"></McBubble>
</template>

<script setup>
import { McBubble } from '@matechat/core';
</script>
```