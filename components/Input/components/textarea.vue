<template>
  <Textarea
    v-model="inputValue"
    :placeholder="placeholder"
    :showGlowStyle="false"
    :disabled="rootProps.disabled"
    :maxlength="rootProps.maxLength"
    :class="['mc-textarea', { 'mc-textarea-simple': rootProps.displayType === DisplayType.Simple }]"
    @input="onInput"
    @compositionstart="onCompositionStart"
    @compositionend="onCompositionEnd"
    @keydown="onKeydown"
  ></Textarea>
</template>

<script setup lang="ts">
import { nextTick, inject, computed } from 'vue';
import { Textarea } from 'vue-devui/textarea';
import 'vue-devui/textarea/style.css';
import { inputInjectionKey, SubmitShortKey, DisplayType } from '../input-types';
import type { InputContext } from '../input-types';

const { inputValue, rootProps, rootEmits } = inject(inputInjectionKey) as InputContext;
const placeholder = computed(() => {
  let enterKey = '';
  let shiftEnterKey = '';
  if (rootProps.submitShortKey === SubmitShortKey.Enter) {
    enterKey = 'Enter';
    shiftEnterKey = 'Shift + Enter';
  }
  if (rootProps.submitShortKey === SubmitShortKey.ShiftEnter) {
    enterKey = 'Shift + Enter';
    shiftEnterKey = 'Enter';
  }
  return rootProps.placeholder ?? (enterKey ? `请输入您的问题，并按${enterKey}发送，按${shiftEnterKey}换行` : '请输入您的问题...');
});
let lock = false;

const emitChange = () => {
  nextTick(() => {
    rootEmits('change', inputValue.value);
  });
};
const onInput = () => {
  if (!lock) {
    emitChange();
  }
};
const onCompositionStart = () => {
  lock = true;
};
const onCompositionEnd = () => {
  lock = false;
  emitChange();
};

const onKeydown = (e: KeyboardEvent) => {
  if (rootProps.submitShortKey === null) {
    return;
  }
  const shiftKey =
    rootProps.submitShortKey === SubmitShortKey.Enter
      ? !e.shiftKey
      : rootProps.submitShortKey === SubmitShortKey.ShiftEnter
        ? e.shiftKey
        : false;
  if (shiftKey && e.code === 'Enter') {
    e.preventDefault();
    rootEmits('submit', inputValue.value);
    inputValue.value = '';
  }
};
</script>

<style lang="scss">
@import 'devui-theme/styles-var/devui-var.scss';

.mc-textarea.devui-textarea {
  height: 64px;
  padding-left: 0;
  padding-right: 0;
  border: none;

  &.mc-textarea-simple {
    height: 32px;
  }

  &::placeholder {
    color: $devui-placeholder;
  }
}
</style>
