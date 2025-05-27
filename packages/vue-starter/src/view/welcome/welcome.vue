<template>
  <div class="welcome-page">
    <McIntroduction
      logo-img="/logo2x.svg"
      :title="GlobalConfig.title"
      :sub-title="GlobalConfig.subTitle || `Hi，${$t('welcome.welcomeTo')} MateChat`"
      :description="[$t('welcome.description1'), $t('welcome.description2')]"
    ></McIntroduction>
    <div class="guess-question">
      <div class="guess-title">
        <div>{{ $t("welcome.guessYouWantAsk") }}</div>
        <div>
          <i class="icon-recover"></i>
          <span>{{ $t("welcome.change") }}</span>
        </div>
      </div>
      <div class="guess-content">
        <span
          v-for="(item, index) in list"
          :key="index"
          @click="onItemClick(item)"
        >
          {{ item.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GlobalConfig from '@/global-config';
import {
  guessQuestionsCn,
  guessQuestionsEn,
  mockAnswer,
} from '@/mock-data/mock-chat-view';
import { useChatMessageStore, useLangStore } from '@/store';
import { LangType } from '@/types';

const langStore = useLangStore();
const chatMessageStore = useChatMessageStore();

const list = computed(() =>
  langStore.currentLang === LangType.CN ? guessQuestionsCn : guessQuestionsEn,
);

const onItemClick = (item) => {
  if (mockAnswer[item.value]) {
    // 使用 mock 数据
    chatMessageStore.ask(item.label, mockAnswer[item.value]);
  }
};
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.welcome-page {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: auto;
  padding: 0 12px;
  gap: 24px;

  .guess-question {
    width: 100%;
    padding: 24px;
    border-radius: $devui-border-radius-card;
    box-shadow: 0 1px 8px 0 rgba(25, 25, 25, 0.1);

    .guess-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $devui-text;
      margin-bottom: 16px;

      & > div:first-child {
        font-weight: 700;
        font-size: $devui-font-size;
      }
      & > div:last-child {
        font-size: $devui-font-size-sm;
        cursor: pointer;
        color: $devui-placeholder;
        span {
          margin-left: 4px;
        }
      }
    }

    .guess-content {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      span {
        font-size: $devui-font-size-sm;
        color: $devui-aide-text;
        padding: 10px 16px;
        border-radius: $devui-border-radius-full;
        background-color: $devui-dividing-line;
        cursor: pointer;
      }
    }
  }
}
</style>
