import type { App } from 'vue';
import Header from './Header/Header.vue';
import Bubble from './Bubble/Bubble.vue';
import Input from './Input/Input.vue';
import Introduction from './Introduction/Introduction.vue';
import Prompt from './Prompt/Prompt.vue';
import List from './List/List.vue';
import Mention from './Mention/Mention.vue';
import Layout from './Layout/Layout.vue';
import LayoutContent from './Layout/Content.vue';
import LayoutHeader from './Layout/Header.vue';
import LayoutAside from './Layout/Aside.vue';
import LayoutSender from './Layout/Sender.vue';

export default {
  install(app: App): void {
    app.component('McHeader', Header);
    app.component('McBubble', Bubble);
    app.component('McInput', Input);
    app.component('McIntroduction', Introduction);
    app.component('McPrompt', Prompt);
    app.component('McList', List);
    app.component('McMention', Mention);
    app.component('McLayout', Layout);
    app.component('McLayoutContent', LayoutContent);
    app.component('McLayoutHeader', LayoutHeader);
    app.component('McLayoutAside', LayoutAside);
    app.component('McLayoutSender', LayoutSender);
  },
};
