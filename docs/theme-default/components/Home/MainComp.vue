<template>
  <div class="main-container">
    <div class="model">
      <!-- <Scene3D class="scene-container"></Scene3D> -->
      <img class="text1" src="/png/home/text1.png" />
      <img class="text2" src="/png/home/text2.png" />
      <img class="text3" src="/png/home/text3.png" />
    </div>
    <div class="main-input">
      <div class="use-panel">
        <div class="use">如何接入使用</div>
      </div>
      <a v-localeHref="'/use-guide/introduction.html'">
        <div class="btn-send">{{ $t('home.send') }}</div>
      </a>
    </div>
    <div class="main-text">- <span class="light-text">生成式人工智能</span> 体验设计系统 & 前端解决方案 -</div>
    <a v-localeHref="'/components/introduction/demo.html'">
      <div class="btn-learn">开始使用</div>
    </a>
  </div>
</template>

<script setup lang="ts">
import Scene3D from './Scene3D.vue';
</script>

<style lang="scss" scoped>
@import 'devui-theme/styles-var/devui-var.scss';

.main-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.model {
  position: relative;
  width: 65%;
  height: 50%;
  margin-top: 10vh;
  background: no-repeat center/contain url(/png/home/bigLogo.png);
  .scene-container {
    width: 100%;
    height: 100%;
  }
  .text1,
  .text2,
  .text3 {
    position: absolute;
  }
  .text1 {
    top: 12%;
    left: 17%;
    width: 30%;
    aspect-ratio: 1 / 0.15;
    // animation: rockText 1s linear infinite;
  }
  .text2 {
    top: 26%;
    left: 15%;
    width: 30%;
    aspect-ratio: 1 / 0.23;
    // animation: rockText 1s linear infinite;
  }
  .text3 {
    top: 43%;
    left: 60%;
    width: 36%;
    aspect-ratio: 1 / 0.25;
    // animation: rockText 1s linear infinite;
  }
}
.main-input {
  margin: 3vh 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.8);
  padding-left: 48px;
  background-image: url(/png/home/star.png);
  background-repeat: no-repeat;
  background-position: 12px center;
  background-size: 4%;
  font-size: 22px;
  .use-panel {
    width: 11em;
    display: flex;
    align-items: baseline;
  }
  .use {
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    animation: showText 1s steps(6) forwards;
  }

  .use::after {
    content: '';
    position: absolute;
    width: 2px;
    right: 0;
    height: 100%;
    animation: blink 0.5s steps(2) infinite;
  }

  .btn-send {
    margin-left: 100px;
    margin-right: 12px;
    padding: 12px 40px;
    background-image: url(/png/home/btnDefault.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 80%;
    transition: all 0.3s ease-in-out;
    color: $devui-light-text;
    cursor: pointer;
    font-size: 20px;
    text-indent: 1px;
  }
  .btn-send:hover {
    transform: scale(1.1);
    background-image: url(/png/home/btnActive.png);
  }
}

.main-text {
  .light-text {
    color: $devui-link-active;
  }
}
.btn-learn {
  // background: linear-gradient(to right, #f157ff, #7b79ff);
  margin-top: 5vh;
  padding: 20px 40px;
  background-image: url(/png/home/btnDefault.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 90%;
  transition: all 0.3s ease-in-out;
  color: $devui-light-text;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    background-image: url(/png/home/btnActive.png);
  }
}

@keyframes showText {
  0% {
    width: 0;
  }
  100% {
    width: 6em;
  }
}

@keyframes blink {
  0% {
    border-left: 2px solid transparent;
  }

  100% {
    border-left: 2px solid $devui-text;
  }
}

@keyframes rockText {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-2px);
  }
  50% {
    transform: translateX(0);
  }
  75% {
    transform: translateX(2px);
  }
  100% {
    transform: translateX(0);
  }
}

@media (max-width: 1600px) {
  .model {
    .text1,
    .text2,
    .text3 {
      transform: scale(0.8);
    }
  }
  .btn-learn {
    font-size: 25px;
  }
}
@media (max-width: 768px) {
  .model {
    height: 35%;
  }
  .main-input {
    padding-left: 38px;
    font-size: 14px;
    .btn-send {
      margin-left: 50px;
      padding: 8px 30px;
      font-size: 12px;
    }
  }
  .main-text {
    font-size: 12px;
  }
  .btn-learn {
    padding: 15px 30px;
    font-size: 16px;
  }
}
</style>
