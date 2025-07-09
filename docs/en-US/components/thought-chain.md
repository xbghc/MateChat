---
title: ThoughtChain
desc: Component for displaying AI thinking processes, supporting multi-step thought flow visualization
bannerSrc: '/png/contentSlider/thoughtChainBanner.png'
iconSrc: '/png/contentSlider/thoughtChainIcon.png'
---

Import path:

```ts
import { McThoughtChain } from '@matechat/core';
```

### Basic Usage

Display basic thought chain with multiple thinking steps and different statuses.

:::demo

```vue
<template>
  <McThoughtChain v-model="thoughtNodes" />
</template>

<script setup>
import { ref } from 'vue';

const thoughtNodes = ref([
  {
    key: 'step1',
    title: 'Analyze Problem',
    content: 'First, I need to understand the user\'s requirement: the user wants to create a thought chain component. This component needs to display AI thinking processes with multiple steps.',
    status: 'success'
  },
  {
    key: 'step2',
    title: 'Design Solution',
    content: 'Based on requirement analysis, I designed the following solution:\n\n1. Use Vue 3 + TypeScript\n2. Support multiple statuses: pending, success, error, todo\n3. Provide rich slots for customization\n4. Use Grid layout for flexible structure',
    status: 'success'
  },
  {
    key: 'step3',
    title: 'Implement Features',
    content: 'Implementing core component functionality...',
    status: 'pending'
  },
  {
    key: 'step4',
    title: 'Test & Verify',
    content: 'TODO: Write unit tests and integration tests',
    status: 'todo'
  }
]);
</script>
```

:::