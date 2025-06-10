<template>
  <div class="input-container">
    <McInput
      :value="inputValue"
      :maxLength="2000"
      class="shadow"
      @change="(e:string) => (inputValue = e)"
      @submit="onSubmit"
    >
      <template #extra>
        <div class="input-foot-wrapper">
          <InputAtModel @click="onModelClick" />
          <d-popover :content="$t('thesaurus') + $t('underDevelop')" trigger="hover" :position="['top']" style="color: var(--devui-text)">
            <span class="input-word-container">
              <i class="icon-standard"></i>
            </span>
          </d-popover>
          <InputAppendix />
          <InputAudio />
          <InputOnlineSearch />
          <span class="input-foot-dividing-line"></span>
          <span class="input-foot-maxlength">
            {{ inputValue.length }}/2000
          </span>
        </div>
      </template>
    </McInput>
    <div class="statement-box">
        <div>{{ $t('input.disclaimer') }}</div>
        <div class="separator" />
        <div>
          <span class="link-span">{{ $t('input.privacyStatement') }}</span>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatMessageStore, useChatModelStore } from '@/store';
import { InputAppendix } from '@view/appendix';
import { InputAudio } from '@view/audio';
import { InputAtModel } from '@view/chat-model';
import { InputOnlineSearch } from '@view/online-search';
import { ref } from 'vue';

const chatMessageStore = useChatMessageStore();
const chatModelStore = useChatModelStore();

const inputValue = ref('');

chatMessageStore.$onAction(({ name }) => {
  if (name === 'ask') {
    inputValue.value = '';
  }
});

const onSubmit = (val: string) => {
  chatMessageStore.ask(val);
};

const onModelClick = () => {
  inputValue.value += `@${chatModelStore.currentModel}`;
};
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.input-container {
  padding: 0 12px 12px 12px;

  .input-foot-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 8px;
    margin-right: 8px;

    .input-word-container {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: $devui-font-size;

      .input-word-text {
        font-size: $devui-font-size-sm;
      }

      i {
        font-size: $devui-font-size-icon;
      }
    }

    span {
      color: $devui-text;
      cursor: pointer;
    }

    .input-foot-dividing-line {
      width: 1px;
      height: 14px;
      background-color: $devui-line;
    }

    .input-foot-maxlength {
      font-size: $devui-font-size-sm;
      color: $devui-aide-text;
    }
  }
  :deep(.mc-input-foot-left) {
      overflow-x: auto;
      scrollbar-width: none;
  }

  .shadow {
    box-shadow: 0 1px 8px 0 rgba(25, 25, 25, 0.06);
  }

  .statement-box {
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
    color: $devui-disabled-text;

    .separator {
      height: 12px;
      margin: 0 4px;
      border: 0.6px solid $devui-disabled-text;
    }

    .link-span {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
</style>
