import type { PropType } from 'vue';
import type { Options } from 'markdown-it';  

export interface CustomXssRule {
  key: string;
  value: string[] | null;
}

export interface CodBlockData {
  code: string;
  language: string;
}

export type Theme = 'light' | 'dark';

export const mdCardProps = {
  content: {
    type: String,
    default: '',
  },

  mdOptions: {
    type: Object as PropType<Options>,
    default: () => ({})
  },

  customXssRules: {
    type: Array as PropType<Array<CustomXssRule>>,
    default: () => [],
  },

  theme: {
    type: String as PropType<Theme>,
    default: 'light'
  }
}