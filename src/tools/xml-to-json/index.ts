import Braces from '@vicons/tabler/es/Braces';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'XML to JSON',
  path: '/xml-to-json',
  description: 'Convert XML to JSON',
  keywords: ['xml', 'json'],
  component: () => import('./xml-to-json.vue'),
  icon: Braces,
  createdAt: new Date('2024-08-09'),
});
