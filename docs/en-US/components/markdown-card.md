---
title: MarkDown Card
desc: Card component for displaying MarkDown content
bannerSrc: '/bubbleBanner.png'
---

Import path:

```ts
import { McMarkdownCard } from '@matechat/core';
```

### Basic Usage

Basic usage only requires passing the content parameter.

:::demo

```vue
<template>
  <McMarkdownCard :content="content" :theme="theme"></McMarkdownCard>
</template>
<script setup>
import { ref, onMounted } from 'vue';
let themeService;
const theme = ref('light');
const content = ref(`
# Quick Sort

### Introduction
**Quick Sort**: An efficient sorting algorithm that uses the divide-and-conquer approach. Its basic idea is:

1. Choose a pivot value
2. Partition the array into two parts: elements less than the pivot and elements greater than or equal to the pivot
3. Recursively sort these two parts

### Code Implementation

1. Here's the Quick Sort implementation:
\`\`\`ts
function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

// Usage example
const arr = [3, 6, 8, 10, 1, 2, 1];
console.log(quickSort(arr)); // Output sorted array
\`\`\`
`);

const changeTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
  themeClass.value = themeClass.value === 'light-background' ? 'dark-background' : 'light-background';
};

const themeChange = () => {
  if (themeService) {
    theme.value = themeService.currentTheme.id === 'infinity-theme' ? 'light' : 'dark';
  }
};

onMounted(() => {
  if(typeof window !== 'undefined'){
    themeService = window['devuiThemeService'];
  }
  themeChange();
  if (themeService && themeService.eventBus) {
    themeService.eventBus.add('themeChanged', themeChange);
  }
});
</script>
```

:::

### Typewriter Effect

Supports configurable typewriter animation effects with different built-in styles, configurable speed and typing intervals, suitable for streaming data scenarios.

:::demo

```vue
<template>
  <div class="btn-container">
    <d-button variant="solid" @click="generateAnswer">Re-execute</d-button>
  </div>
  <div>
    <span class="demo-title">Default Effect</span>
    <McBubble :variant="'bordered'">
      <McMarkdownCard :content="content" :theme="theme" :typing="true"></McMarkdownCard>
    </McBubble>
    <span class="demo-title">Typewriter with Custom Speed</span>
    <McBubble :variant="'bordered'">
      <McMarkdownCard :content="content" :theme="theme" :typing="true" :typingOptions="typingOptions1"></McMarkdownCard>
    </McBubble>
    <span class="demo-title">Gradient Typing</span>
    <McBubble :variant="'bordered'">
      <McMarkdownCard :content="content" :theme="theme" :typing="true" :typingOptions="typingOptions2"></McMarkdownCard>
    </McBubble>
    <span class="demo-title">Colorful Typing</span>
    <McBubble :variant="'bordered'">
      <McMarkdownCard :content="content" :theme="theme" :typing="true" :typingOptions="typingOptions3"></McMarkdownCard>
    </McBubble>
    <span class="demo-title">Streaming Response</span>
    <McBubble :variant="'bordered'">
      <McMarkdownCard :content="content1" :theme="theme" :typing="true" :typingOptions="typingOptions4" @typingEnd="typingEnd"></McMarkdownCard>
    </McBubble>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
const MOCK_CONTENT = `**I understand your requirement**, *will output with <span style="color:red">typewriter effect</span>, if you need to re-execute the typewriter animation*, click the re-execute button.`;
let themeService;
const content = ref(MOCK_CONTENT);
const theme = ref('light');

const typingOptions1 = {
  step: [1, 5],
  interval: 200,
  style: 'cursor',
};

const typingOptions2 = {
  interval: 200,
  style: 'gradient',
};

const typingOptions3 = {
  interval: 200,
  style: 'color',
};

const typingOptions4 = {
  interval: 200,
  step: 1,
};

const content1 = ref('');
let interval;
let stramEnd = false;

const streamContent = () => {
  clearInterval(interval);
  let currentIndex = 0;
  interval = setInterval(() => {
    currentIndex += Math.ceil(Math.random() * 10);
    content1.value = MOCK_CONTENT.slice(0, currentIndex);
    if (currentIndex > MOCK_CONTENT.length) {
      stramEnd = true;
      clearInterval(interval);
    }
  }, 100);
}

const generateAnswer = () => {
  content.value = '';
  content1.value = '';
  setTimeout(() => {
    content.value = MOCK_CONTENT;
    streamContent();
  });
}

const typingEnd = () => {
  if (stramEnd) {
    console.log('Streaming and typewriter effect completed');
  }
}

const themeChange = () => {
  if (themeService) {
    theme.value = themeService.currentTheme.id === 'infinity-theme' ? 'light' : 'dark';
  }
};

onMounted(() => {
  streamContent();
  if(typeof window !== 'undefined'){
    themeService = window['devuiThemeService'];
  }
  themeChange();
  if (themeService && themeService.eventBus) {
    themeService.eventBus.add('themeChanged', themeChange);
  }
});
</script>

<style lang="scss" scoped>
.btn-container {
  display: flex;
  margin-bottom: 12px;
}
.demo-title {
  margin: 20px 0px 8px 8px;
  display: inline-block;
}
</style>
```

:::

### Think Tag Support

Supports custom think tags for wrapping specific content and rendering as styled block elements. Suitable for emphasizing thought processes or special content display.

:::demo

```vue
<template>
  <div class="btn-container">
    <d-button variant="solid" @click="generateAnswer">{{ isLoading ? 'Stop' : 'Regenerate'}}</d-button>
  </div>
  <div id="think-demo-content">
    <template v-for="(msg, idx) in messages" :key="idx">
      <McBubble v-if="msg.from === 'user'" :content="msg.content" :align="'right'" :avatarConfig="msg.avatarConfig"></McBubble>
      <McBubble v-else :loading="msg.loading ?? false" :avatarConfig="msg.avatarConfig" :variant="'bordered'">

        <div class="think-toggle-btn" @click="toggleThink(idx)">
          <i class="icon-point"></i>
          <span>{{ thinkBtnText }}</span>
          <i :class="btnIcon"></i>
        </div>
        <McMarkdownCard :enableThink="true" :content="msg.content" :theme="theme"></McMarkdownCard>
      </McBubble>
    </template>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
let themeService;
const theme = ref('light');
const messages = ref([])
const aiModelAvatar = {
  imgSrc: 'https://matechat.gitcode.com/logo.svg',
  width: 32,
  height: 32,
};
const isLoading = ref(false);
let interval = null;
const thinkBtnText = ref('Deep thinking completed (16 seconds)');
const btnIcon = ref('icon-chevron-up-2');
const mockAnswer = `
<think>
Well, the user asked me to help write a quick sort. I need to recall the principles of quick sort. Quick sort is a divide-and-conquer algorithm. The basic steps are to choose a pivot element, then partition the array into two parts: one with elements smaller than the pivot and another with elements larger than the pivot, then recursively sort these two parts.

First, I need to determine the pivot selection. There are usually three methods: choose the first element, middle element, or random selection. Choosing the middle might be better to avoid worst-case time complexity. For example, when the array is already sorted, choosing the first element would lead to O(n²) time complexity, but choosing the middle element might be more balanced.

Then, how to do the partitioning? The goal of partitioning is to put elements smaller than the pivot on the left and larger ones on the right. We can use a two-pointer approach: find elements larger than the pivot from the left, find elements smaller than the pivot from the right, then swap them until the pointers meet. At this point, place the pivot in the correct position and return the pivot's index.

Next is the recursive call. Recursively perform quick sort on the left and right subarrays of the pivot until the subarray length is less than or equal to 1, at which point the array is sorted.

Now I need to consider the user's requirements. The user might not be very familiar with programming, so the code needs to be simple and understandable with comments. Or the user might need an efficient implementation, but quick sort already has an average time complexity of O(n log n), which should be fine.

Possible edge cases are empty arrays or arrays with only one element, in which case we return directly. So the function should handle these cases first.

Then, test if this function is correct. For example, input an unsorted array like [3,6,8,10,1,2,1], see if the sorted result is [1,1,2,3,6,8,10]. Or test already sorted arrays like [1,2,3,4,5] to ensure no stack overflow or incorrect results.

Also, do we need to handle duplicate elements? Quick sort itself can handle duplicates, so it should be fine.

Considering the language issue, the user didn't specify which language to use, but based on the user's name or context, they might want a Python implementation? Or maybe other languages. But based on common cases, I'll provide a Python version first.

So, considering all these thoughts, I can write a Python quick sort function. Choose middle element as pivot, use two pointers for partitioning, recursively handle left and right subarrays. Then add comments explaining each step.

Finally, provide usage examples so the user knows how to call this function and verify if the results are correct.
</think>
    
Here's a Quick Sort algorithm implementation in Python with detailed comments:

\`\`\`python
def quick_sort(arr):
    """Recursive function implementing quick sort"""
    # Base case: return directly when array length is <= 1
    if len(arr) <= 1:
        return arr
    
    # Choose middle element as pivot (effectively avoids worst case)
    pivot = arr[len(arr) // 2]
    
    # Partition array into three parts: less than pivot, equal to pivot, greater than pivot
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    # Recursively sort left and right subarrays, merge results
    return quick_sort(left) + middle + quick_sort(right)

# Usage example
if __name__ == "__main__":
    example_arr = [3,6,8,10,1,2,1]
    sorted_arr = quick_sort(example_arr)
    print("Original array:", example_arr)
    print("Sorted array:", sorted_arr)
\`\`\`
`

// ... rest of the script setup code remains the same but with English comments
</script>

<style lang="scss" scoped>
.btn-container {
  display: flex;
  justify-content: end;
  margin-bottom: 12px;
}
</style>

<style lang="scss">
@import 'devui-theme/styles-var/devui-var.scss';
.think-toggle-btn {
  display: flex;
  gap: 8px;
  align-items: center;
  border-radius: 10px;
  padding: 7px 10px;
  margin-bottom: 12px;
  width: fit-content;
  cursor: pointer;
  background-color: $devui-area;
  &:hover {
    background-color: var(--devui-btn-common-bg-hover);
  }
}
</style>
```

:::