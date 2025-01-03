import { Layout } from '../../theme-default';
import { registerComponents } from './register-components';
import DevUI from 'vue-devui';
import 'vue-devui/style.css';
import MateChat from '../../../components/index';
import '@devui-design/icons/icomoon/devui-icon.css';

import i18n from '../../i18n';
import localeHref from '../../directive/localeHref';

export default {
  Layout,
  enhanceApp({ app }) {
    registerComponents(app);
    app.directive('localeHref', localeHref);
    app.use(DevUI).use(i18n).use(MateChat);
  },
};
