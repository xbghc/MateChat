import type { App } from 'vue';
import McMarkDownCard from './mdCard.vue';

McMarkDownCard.install = (app: App) => {
  app.component('McMarkDownCard', McMarkDownCard);
};

export { McMarkDownCard };