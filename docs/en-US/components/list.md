---
title: List
desc: Used to display a set of content or options
bannerSrc: '/listBanner.png'
iconSrc: '/listIcon.png'
---

Import path:

```ts
import { McList } from '@matechat/core';
```

### Basic Usage

Generally used for selection scenarios. Options can be disabled via the `disabled` field and selected via the `active` field in the option data. By default, hover highlights and click selection highlights are enabled.

:::demo

```vue
<template>
  <McList :data="options" @select="onSelect"></McList>
</template>

<script setup>
import { defineComponent, ref } from 'vue';

const options = ref(
  new Array(6).fill(0).map((item, i) => ({
    label: `Option ${i + 1}`,
    value: i + 1,
    disabled: i === 1,
    active: i === 2,
  })),
);

const onSelect = (e) => {
  console.log('list selected', e);
};
</script>
```

:::

### Horizontal Layout

Generally used for display scenarios. The `direction` parameter sets the list arrangement, `variant` parameter sets the option display style, `autoWrap` parameter enables automatic wrapping when the list is arranged horizontally, and `selectable` set to `false` disables selection highlighting when clicking options.

:::demo

```vue
<template>
  <d-radio-group v-model="selectedVariant" direction="row">
    <d-radio v-for="item in variantList" :key="item.value" :value="item.value">{{ item.label }}</d-radio>
  </d-radio-group>
  <div style="display:flex;align-items:center;"><d-switch v-model="autoWrap" size="sm"></d-switch>Auto Wrap</div>
  <McList :data="options" :selectable="false" :autoWrap="autoWrap" direction="horizontal" :variant="selectedVariant"></McList>
</template>

<script setup>
import { defineComponent, ref } from 'vue';

const selectedVariant = ref('filled');
const autoWrap = ref(true);
const variantList = ref([
  { label: 'Filled', value: 'filled' },
  { label: 'Bordered', value: 'bordered' },
]);
const options = ref(new Array(10).fill(0).map((item, i) => ({ label: `Option ${i + 1}`, value: i + 1 })));
</script>
```

:::

### Lazy Loading

`enableLazyLoad` enables lazy loading. When enabled, scrolling near the bottom triggers the `loadMore` event.

The component sets a default maximum height of `300px` for the list. Users can customize styles directly on the component tag using `style` or `class`.

:::demo

```vue
<template>
  <div v-loading="loading" :backdrop="true" position-type="relative" :view="{ top: '50%', left: '50%' }" :z-index="100">
    <McList :data="options" enableLazyLoad @loadMore="onLoadMore" style="height:400px"></McList>
  </div>
</template>

<script setup>
import { defineComponent, ref } from 'vue';

const options = ref(new Array(10).fill(0).map((item, i) => ({ label: `Option ${i + 1}`, value: i + 1 })));
const loading = ref(false);
const total = 30;
const onLoadMore = () => {
  if (loading.value || options.value.length >= total) {
    return;
  }
  loading.value = true;
  setTimeout(() => {
    const newData = new Array(10).fill(0).map((item, i) => ({
      label: `Option ${options.value.length + i}`,
      value: options.value.length + i,
    }));
    options.value.push(...newData);
    loading.value = false;
  }, 1500);
};
</script>
```

:::

### Customization

:::demo

```vue
<template>
  <h4>Partial Customization</h4>
  <p>Customize option content through the item slot while hover highlights and border radius are still controlled by the component.</p>
  <McList :data="options">
    <template #item="{ item }"><i :class="item.icon" style="margin-right:4px;"></i>{{ item.label }}</template>
  </McList>

  <h4>Full Customization</h4>
  <p>Customize option content through the item slot with variant set to none, allowing full user control over hover highlights and border radius.</p>
  <McList :data="options" variant="none">
    <template #item="{ item }">
      <div class="custom-list-item"><i :class="item.icon" style="margin-right:4px;"></i>{{ item.label }}</div>
    </template>
  </McList>
</template>

<script setup>
import { defineComponent, ref } from 'vue';

const options = ref([
  { label: `Option 1`, value: 1, icon: 'icon-information' },
  { label: `Option 2`, value: 2, icon: 'icon-inform' },
  { label: `Option 3`, value: 3, icon: 'icon-infrastructure' },
]);
</script>

<style scoped lang="scss">
.custom-list-item {
  line-height: 20px;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: var(--devui-list-item-active-bg);
  }
}
</style>
```

:::

### Keyboard Shortcuts

Generally used for dropdown list scenarios requiring seamless operation. `enableShortKey` enables keyboard shortcuts, allowing option pre-selection with up/down arrow keys and selection with the Enter key. When shortcuts are enabled, the `inputEl` parameter can specify which element to listen for keyboard events (defaults to `document`).

:::demo

```vue
<template>
  <d-dropdown :visible="isOpen" trigger="manually" :position="['top-start']" @toggle="(e) => (isOpen = e)">
    <d-input
      ref="inputEl"
      v-model="inputValue"
      placeholder="Click here, then use keyboard shortcuts to select options and display selected item here"
      clearable
      @click="() => (isOpen = true)"
    ></d-input>
    <template #menu>
      <McList :data="options" enableShortKey :inputEl="inputEl" style="width:300px" @select="onSelect"></McList>
    </template>
  </d-dropdown>
</template>

<script setup>
import { defineComponent, ref } from 'vue';

const inputValue = ref('');
const inputEl = ref();
const isOpen = ref(false);
const options = ref(new Array(4).fill(0).map((item, i) => ({ label: `Option ${i + 1}`, value: i + 1 })));

const onSelect = (e) => {
  inputValue.value = e.label;
  isOpen.value = false;
};
</script>
```

:::