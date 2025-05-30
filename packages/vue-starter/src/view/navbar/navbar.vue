<template>
  <div class="navbar-container">
    <div class="navbar-top">
      <McHeader :logoImg="GlobalConfig.logoPath || '/logo.svg'" :title="GlobalConfig.title || 'MateChat'"></McHeader>
      <div class="dividing-line"></div>
      <div class="chat-box">
        <div class="chat-icon-box active">
          <i class="icon-develop-collaboration"></i>
        </div>
        <span>{{ $t("navbar.chat") }}</span>
      </div>
    </div>
    <div class="navbar-bottom">
      <SwitchLang v-if="!GlobalConfig.language" />
      <Theme v-if="!GlobalConfig.theme" />
      <d-popover :position="['right']" trigger="hover">
        <template #content>
          <span class="devui-text">{{ $t('navbar.systemSetting') }}</span>
        </template>
        <div class="switch-lang-container">
          <i class="icon-setting system-setting" />
        </div>
      </d-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import GlobalConfig from '@/global-config';
import { Theme } from '@/view/theme';
import SwitchLang from './switch-lang.vue';
</script>

<style scoped lang="scss">
@import "devui-theme/styles-var/devui-var.scss";

:deep(.switch-lang-container) {
  width: 36px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  color: $devui-text;
  border-radius: $devui-border-radius-card;
  transition: all $devui-animation-duration-slow
  $devui-animation-ease-in-out-smooth;
  cursor: pointer;

  &:hover {
    background-color: $devui-base-bg;
    box-shadow: $devui-shadow-length-base $devui-light-shadow;
  }
}

.navbar-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 80px;
  height: 100%;
  box-sizing: border-box;

  .navbar-top,
  .navbar-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .navbar-bottom {
    padding-bottom: 16px;
    gap: 16px;
  }

  :deep(.mc-header-logo-container) {
    flex-direction: column;
    cursor: pointer;

    .mc-header-title.mc-header-title {
      font-size: 10px;
      font-weight: 600;
    }
  }

  .dividing-line {
    width: 50%;
    height: 1px;
    margin: 20px 0;
    background-color: $devui-dividing-line;
  }

  .chat-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    font-size: $devui-font-size-sm;
    cursor: pointer;

    .chat-icon-box {
      width: 36px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      color: $devui-text;
      border-radius: $devui-border-radius-card;
      transition: all $devui-animation-duration-slow
        $devui-animation-ease-in-out-smooth;

      &.active,
      &:hover {
        background-color: $devui-base-bg;
        box-shadow: $devui-shadow-length-base $devui-light-shadow;
      }

      i {
        font-size: 20px;
      }
    }
  }

  ::v-deep .system-setting {
    font-size: 20px;
    cursor: pointer;
  }
}

.devui-text {
  color: $devui-text;
}

@media screen and (max-width: 940px) {
  .navbar-container {
    display: none;
  }
}
</style>
