<template>
  <div class="related-container">
    <div class="title">相关资源</div>
    <div class="content">
      <template v-for="(item, i) in list" :key="i">
        <div class="info-container">
          <a class="info" :href="item.href" rel="noopener noreferrer" target="_blank">
            <img :src="item.icon" />
            {{ item.label }}
          </a>
          <img v-if="item.expandImg" class="expand" :src="item.expandImg" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const list = [
  {
    label: 'GitCode',
    href: 'https://gitcode.com/DevCloudFE/MateChat/overview',
    icon: '/png/footer/gitcode.svg',
  },
  {
      label: 'DevUI Design',
      href: 'https://devui.design/home',
      icon: '/png/footer/devui.svg'
  },
  {
    label: 'DevUI团队',
    href: 'https://juejin.cn/user/712139267650141',
    icon: '/png/footer/juejin.svg',
  },
  {
    label: 'DevUI Design',
    href: 'https://zhuanlan.zhihu.com/devui',
    icon: '/png/footer/zhihu.svg',
  },
  {
    label: '官方交流群',
    icon: '/png/footer/wechat.svg',
    expandImg: '/png/footer/wechat.jpg',
  },
];
</script>

<style lang="scss" scoped>
@import 'devui-theme/styles-var/devui-var.scss';

.related-container {
  width: 100%;
  padding: 20px 60px;
  color: $devui-light-text;
  background: no-repeat center/cover url(/png/home/footerBg.png);
  .title {
    margin-bottom: 20px;
    font-size: 16px;
  }
}
.content {
  display: flex;
  flex-wrap: wrap;
  gap: 20px 100px;
  font-size: 14px;
  .info-container {
    position: relative;
  }
  .info {
    display: flex;
    align-items: center;
    gap: 8px;
    width: auto;
    img {
      height: 1em;
      object-fit: contain;
    }
  }
  a:hover {
    color: $devui-link-light;
  }
  .expand {
    position: absolute;
    display: none;
    left: 0;
    bottom: 2em;
    width: 160px;
    transform-origin: left bottom;
    transition: all 0.1s linear;
    transform: scale(2.5);
  }
  .info-container:hover .expand {
    display: block !important;
  }
}
</style>
