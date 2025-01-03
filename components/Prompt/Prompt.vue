<template>
  <div class="mc-prompt">
    <List :data="props.list" :direction="props.direction" :variant="props.variant" :selectable="false">
      <template #item="{ item }">
        <PromptItem :prompt="item" @click="emit('itemClick', item)"></PromptItem>
      </template>
    </List>
  </div>
</template>

<script setup lang="ts">
import List from '../List/List.vue';
import PromptItem from './PromptItem.vue';
import { promptProps } from './prompt-types';
const emit = defineEmits(['itemClick']);

const props = defineProps(promptProps);
</script>

<style scoped lang="scss"></style>
