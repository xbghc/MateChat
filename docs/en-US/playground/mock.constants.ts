import bindProjectSpaceMd from './bind-project-space.md?raw';
import formatDateMd from './format-date.md?raw';
import helpMd from './help.md?raw';
import piplineListMd from './pipeline-list.md?raw';
import quickSortMd from './quicksort.md?raw';

export const introPrompt = {
  direction: 'horizontal',
  list: [
    {
      value: 'quickSort',
      label: 'Help me write a quick sort',
      iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
      desc: 'Implement a quick sort using JavaScript',
    },
    {
      value: 'helpMd',
      label: 'What can you help me with?',
      iconConfig: { name: 'icon-star', color: 'rgb(255, 215, 0)' },
      desc: 'Learn what the current large model can help you with',
    },
    {
      value: 'bindProjectSpace',
      label: 'How to bind project space',
      iconConfig: { name: 'icon-priority', color: '#3ac295' },
      desc: 'How to bind a project in the cloud space',
    },
  ],
};

export const guessQuestions = [
  { label: 'Recent pipeline execution list', value: 'pipelineList' },
  { label: 'Help me write a quick sort', value: 'quickSort' },
  { label: 'Format time using JavaScript', value: 'formatDate' },
];

export const simplePrompt = [
  {
    value: 'quickSort',
    iconConfig: { name: 'icon-info-o', color: '#5e7ce0' },
    label: 'Help me write a quick sort',
  },
  {
    value: 'helpMd',
    iconConfig: { name: 'icon-star', color: 'rgb(255, 215, 0)' },
    label: 'What can you help me with?',
  },
];

export const mockAnswer = {
  quickSort: quickSortMd,
  helpMd: helpMd,
  bindProjectSpace: bindProjectSpaceMd,
  pipelineList: piplineListMd,
  formatDate: formatDateMd,
};
