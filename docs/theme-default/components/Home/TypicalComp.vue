<template>
  <div class="typical-container">
    <div class="title">典型组件展示</div>
    <div class="content">
      <div class="comp-card" v-for="(item, i) in list" :key="i" :class="item.class">
        <div class="img-container">
          <a v-localeHref="item.href">
            <img :data-src="item.img" src="/logo.svg" />
          </a>
        </div>
        <div class="bottom">
          <div class="label">{{ item.label }}</div>
          <div class="desc">{{ item.desc }}</div>
        </div>
      </div>
    </div>
    <div class="typical-btn">
      <a v-localeHref="'/components/introduction/demo.html'">
        <div class="btn">了解更多组件</div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const list = [
  {
    label: '消息气泡',
    desc: '用于承载对话内容的气泡组件',
    class: ['bg1'],
    img: '/png/home/comp1.png',
    href: '/components/bubble/demo.html',
  },
  {
    label: '快捷使用',
    desc: '用于根据输入内容进行快捷提示的组件',
    class: ['bg2'],
    img: '/png/home/comp2.png',
    href: '/components/mention/demo.html',
  },
  {
    label: '输入框',
    desc: '用于对话的输入框组件',
    class: ['bg3'],
    img: '/png/home/inputComp.png',
    href: '/components/input/demo.html',
  },
  // {
  //   label: '对话历史管理',
  //   desc: '开箱即用、易于配置、极致体验的通用图表库',
  //   class: ['bg4'],
  //   img: '/png/home/comp4.png',
  //   href: '/components/history.html',
  // },
  // {
  //   label: '信息来源',
  //   desc: '开箱即用、易于配置、极致体验的通用图表库',
  //   class: ['bg5'],
  //   img: '/png/home/comp5.png',
  //   href: '/components/introduction.html',
  // },
  // {
  //   label: '思考过程',
  //   desc: '开箱即用、易于配置、极致体验的通用图表库',
  //   class: ['bg6'],
  //   img: '/png/home/comp6.png',
  //   href: '/components/introduction.html',
  // },
];
</script>

<style lang="scss" scoped>
@import 'devui-theme/styles-var/devui-var.scss';
@import './common.scss';

.typical-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.content {
  width: 80%;
  margin: 98px 0 56px 0;
  margin-left: calc(10% - 4em);
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
  .comp-card {
    width: 30%;
    aspect-ratio: 1 / 1.1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    .img-container {
      width: 100%;
      height: 70%;
      display: flex;
      align-items: center;
      justify-content: center;
      a {
        width: 60%;
        max-height: 90%;
      }
      img {
        width: 100%;
        max-height: 100%;
        object-fit: contain;
        transition: all 0.5s ease-in-out;
        cursor: pointer;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
    .bottom {
      width: 60%;
      height: auto;
      display: flex;
      flex-direction: column;
      gap: 10%;
      padding-bottom: 5%;
      .label {
        font-size: 28px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.8);
        margin-bottom: 8px;
      }
      .desc {
        font-size: 16px;
        color: $devui-aide-text;
      }
    }
  }
}
.bg1 {
  background: no-repeat center/cover url(/png/home/compBg1.png);
  background-size: 100% 100%;
}
.bg2 {
  background: no-repeat center/cover url(/png/home/compBg2.png);
  background-size: 100% 100%;
}
.bg3 {
  background: no-repeat center/cover url(/png/home/compBg3.png);
  background-size: 100% 100%;
}
.bg4 {
  background: no-repeat center/cover url(/png/home/compBg4.png);
  background-size: 100% 100%;
}
.bg5 {
  background: no-repeat center/cover url(/png/home/compBg5.png);
  background-size: 101% 100%;
}
.bg6 {
  background: no-repeat center/cover url(/png/home/compBg6.png);
  background-size: 100% 100%;
}
.typical-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 56px;
  .btn {
    padding: 20px 40px;
    border-radius: 40px;
    border: 1px solid #7b79ff;
    color: #db6fe5;
    font-size: 30px;
    cursor: pointer;
    transition: all 0.5s ease-in-out;
    &:hover {
      transform: scale(1.1);
    }
  }
}

@media (max-width: 1600px) {
  .content {
    margin: 56px 0;
    margin-left: calc(10% - 4em);
    .comp-card .bottom {
      .label {
        font-size: 18px;
      }
      .desc {
        font-size: 11px;
      }
    }
  }
}
@media (max-width: 768px) {
  .content .comp-card {
    width: 45%;
    .bottom {
      .label {
        font-size: 12px;
        margin-bottom: 0;
      }
      .desc {
        display: none;
      }
    }
  }
  .typical-btn .btn {
    padding: 10px 30px;
    border-radius: 30px;
    font-size: 20px;
  }
}
</style>
