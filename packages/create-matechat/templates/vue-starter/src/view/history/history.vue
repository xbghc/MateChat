<template>
  <div class="history-list-container">
    <div class="history-header">
      <div class="history-header-left">
        <span class="history-title">{{ $t("history.chatHistory") }}</span>
      </div>
    </div>
    <d-search
      v-model="searchKey"
      is-keyup-search
      icon-position="left"
      :placeholder="$t('history.searchChat')"
      :show-glow-style="false"
      class="history-search"
      @search="onSearch"
    />
    <div class="history-list-box">
      <template v-for="(item, index) in renderList" :key="index">
        <Collapse v-model="item.expand" :title="item.title">
          <HistoryItem
            v-for="(val, i) in item.list"
            :key="i"
            :itemData="val"
            :class="{
              active: val.chatId === chatHistoryStore.activeHistoryId,
            }"
            @click="() => onHistoryClick(val)"
            @delete="() => onHistoryDelete(val)"
          />
        </Collapse>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Collapse } from '@/components';
import {
  useChatHistoryStore,
  useChatMessageStore,
  useChatStatusStore,
} from '@/store';
import type { CategorizedHistoryItem, IHistoryItem } from '@/types';
import { getHistoryTitle } from '@/utils';
import { useI18n } from 'vue-i18n';
import HistoryItem from './history-item.vue';

const { t } = useI18n();
const chatHistoryStore = useChatHistoryStore();
const chatMessageStore = useChatMessageStore();
const chatStatusStore = useChatStatusStore();

const { proxy } = getCurrentInstance();
const searchKey = ref('');
const renderList = ref<CategorizedHistoryItem[]>([]);
let categorizedHistoryList: CategorizedHistoryItem[] = [];

const onSearch = (e: string) => {
  if (e) {
    const res = [];
    for (let i = 0; i < categorizedHistoryList.length; i++) {
      const item = { ...categorizedHistoryList[i] };
      for (let j = 0; j < item.list.length; j++) {
        item.list = item.list.filter((listItem) =>
          listItem.messages[0].content.includes(e),
        );
        item.list.length && res.push(item);
      }
    }
    renderList.value = res;
  } else {
    renderList.value = categorizedHistoryList;
  }
};
const onHistoryClick = (e: IHistoryItem) => {
  chatHistoryStore.setActiveHistoryId(e.chatId);
  chatStatusStore.currentChatId = e.chatId;
  chatMessageStore.messages = e.messages;
};
const onHistoryDelete = (e: IHistoryItem) => {
  chatHistoryStore.deleteHistory(e.chatId);
  proxy.$notificationService.open({
    type: 'success',
    title: t('history.deleteHistoryTipTitle'),
    content: t('deleteSuccess'),
  });
  if (chatStatusStore.currentChatId === e.chatId) {
    chatStatusStore.startChat = false;
    chatMessageStore.messages = [];
  }
};
const updateCategorizedHistoryList = () => {
  const map: Record<
    CategorizedHistoryItem['updateDate'],
    CategorizedHistoryItem
  > = {};
  for (let i = 0; i < chatHistoryStore.historyList.length; i++) {
    const item = chatHistoryStore.historyList[i];
    if (map[item.updateDate]) {
      map[item.updateDate].list.push(item);
    } else {
      map[item.updateDate] = {
        title: getHistoryTitle(item.updateDate),
        updateDate: item.updateDate,
        updateTime: item.updateTime,
        expand: true,
        list: [item],
      };
    }
  }
  categorizedHistoryList = Object.values(map);
};

watch(
  chatHistoryStore.historyList,
  () => {
    searchKey.value = '';
    updateCategorizedHistoryList();
    onSearch('');
  },
  { immediate: true },
);
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.history-list-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 240px;
  max-width: 420px;
  height: 100%;
  padding: 12px;
  color: $devui-text;

  .history-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .history-header-left,
    .history-header-right {
      display: flex;
      align-items: center;
    }
  }

  .history-title {
    font-size: $devui-font-size-lg;
    font-weight: bold;
    margin-bottom: 8px;
    white-space: nowrap;
  }

  .history-search :deep() {
    .devui-input {
      border: none;
      border-radius: 100px;
    }
  }

  .history-list-box {
    flex: 1;
    margin-top: 8px;
    overflow: auto;
  }
}
</style>
