<template>
  <div :class="['history-item', isOperateOpen && 'open']">
    <div class="history-item-top">
      <span :title="itemData.messages[0].content">
        {{ itemData.messages[0].content }}
      </span>
      <OperateIcon
        class="history-operate-icon"
        @toggle-change="(e) => (isOperateOpen = e)"
        @delete="emits('delete')"
      />
    </div>
    <div class="history-item-bottom">
      <div class="agent-box">
        <img
          :src="
            itemData.chatModel?.iconPath ??
            'https://matechat.gitcode.com/logo.svg'
          "
        />
        <span
          class="agent-name"
          :title="itemData.chatModel?.modelName ?? 'MateChat'"
        >
          {{ itemData.chatModel?.modelName ?? "MateChat" }}
        </span>
      </div>
      <span class="create-time">{{ itemData.updateTime }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { IHistoryItem } from "@/types";
import OperateIcon from "./operate-icon.vue";

defineProps({
  itemData: {
    type: Object as PropType<IHistoryItem>,
    default: () => ({}),
  },
});
const emits = defineEmits(["delete"]);

const isOperateOpen = ref(false);
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

.history-item {
  width: 100%;
  height: 82px;
  padding: 16px;
  border-radius: 8px;
  box-sizing: border-box;
  background-color: $devui-base-bg;

  .history-item-top {
    display: flex;
    align-items: center;
    margin-bottom: 8px;

    span {
      flex: 1;
      height: 22px;
      line-height: 22px;
      font-size: $devui-font-size;
      padding-right: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &:deep(.history-operate-icon) {
      visibility: hidden;
      width: 12px;
    }
  }

  .history-item-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .agent-box {
      display: flex;
      align-items: center;
      flex: 1;
      width: 0;
      margin-right: 8px;

      img {
        width: 16px;
        height: 16px;
        margin-right: 8px;
      }

      .agent-name {
        flex: 1;
        width: 0;
        height: 20px;
        line-height: 20px;
        color: $devui-aide-text;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .create-time {
      width: 32px;
      height: 20px;
      line-height: 20px;
      font-size: $devui-font-size-sm;
      color: #aeaeae;
    }
  }

  &:not(:last-child) {
    margin-bottom: 8px;
  }

  &.active,
  &.open,
  &:hover {
    color: $devui-list-item-hover-text;
    background-color: $devui-list-item-hover-bg;
    border-radius: $devui-border-radius-card;
    cursor: pointer;

    :deep(.history-operate-icon) {
      visibility: visible;
    }
  }
}
</style>
