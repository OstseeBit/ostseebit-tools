import Lock from '@vicons/tabler/es/Lock';
import { translate } from '@/plugins/i18n.plugin';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: translate('tools.encryption.title'),
  path: '/encryption',
  description: translate('tools.encryption.description'),
  keywords: ['cypher', 'encipher', 'text', 'AES', 'TripleDES', 'Rabbit', 'RC4'],
  component: () => import('./encryption.vue'),
  icon: Lock,
  redirectFrom: ['/cypher'],
});
