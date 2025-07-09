---
title: ThoughtChain 思维链
desc: 用于展示AI思考过程的组件，支持多步骤思维流程可视化
---

按需引入路径：

```ts
import { McThoughtChain } from '@matechat/core';
```

### 基本用法

展示基本的思维链，包含多个思考步骤和不同的状态。

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
    title: '分析问题',
    content: '首先我需要理解用户的需求：用户想要创建一个思维链组件。这个组件需要能够展示AI的思考过程，包含多个步骤。',
    status: 'success'
  },
  {
    key: 'step2',
    title: '设计方案',
    content: '基于需求分析，我设计了以下方案：\n\n1. 使用Vue 3 + TypeScript\n2. 支持多种状态：pending、success、error、todo\n3. 提供丰富的插槽用于自定义\n4. 使用Grid布局实现灵活的结构',
    status: 'success'
  },
  {
    key: 'step3',
    title: '实现功能',
    content: '正在实现组件的核心功能...',
    status: 'pending'
  },
  {
    key: 'step4',
    title: '测试验证',
    content: '待完成：编写单元测试和集成测试',
    status: 'todo'
  }
]);
</script>
```

:::
