import ArrowsShuffle from '@vicons/tabler/es/ArrowsShuffle';
import { translate } from '@/plugins/i18n.plugin';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: translate('tools.token-generator.title'),
  path: '/token-generator',
  description: translate('tools.token-generator.description'),
  keywords: ['token', 'random', 'string', 'alphanumeric', 'symbols', 'number', 'letters', 'lowercase', 'uppercase', 'password'],
  component: () => import('./token-generator.vue'),
  icon: ArrowsShuffle,
});
