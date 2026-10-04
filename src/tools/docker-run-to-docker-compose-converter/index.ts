import BrandDocker from '@vicons/tabler/es/BrandDocker';
import { translate } from '@/plugins/i18n.plugin';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: translate('tools.docker-run-to-docker-compose-converter.title'),
  path: '/docker-run-to-docker-compose-converter',
  description: translate('tools.docker-run-to-docker-compose-converter.description'),
  keywords: ['docker', 'run', 'compose', 'yaml', 'yml', 'convert', 'deamon'],
  component: () => import('./docker-run-to-docker-compose-converter.vue'),
  icon: BrandDocker,
});
