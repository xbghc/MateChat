<template>
  <NotFound v-if="page.isNotFound" />
  <Home v-else-if="frontmatter.layout === 'home'" />
  <Page v-else />
</template>

<script setup lang="ts">
import { useData } from 'vitepress';
import NotFound from './404.vue';
import Home from './Home/index.vue';
import Page from './Page.vue';

const { page, frontmatter } = useData();
</script>
