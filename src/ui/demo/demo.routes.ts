import type { RouteRecordRaw } from 'vue-router';
import DemoHome from './demo-home.page.vue';

// Lazy on purpose: an eager glob would pull every demo (including c-diff-editor and with it the
// whole of monaco-editor, ~7.7 MB of source) into the entry chunk that every visitor downloads,
// even though the demo routes are only registered in development.
const demoPages = import.meta.glob('../*/*.demo.vue');

export const demoRoutes = Object.entries(demoPages).map(([demoComponentPath, loadDemoComponent]) => {
  const [, , fileName] = demoComponentPath.split('/');
  const demoComponentName = fileName.split('.').shift();

  return {
    path: demoComponentName,
    name: demoComponentName,
    component: loadDemoComponent,
  } as RouteRecordRaw;
});

export const routes = [
  {
    path: '/c-lib',
    name: 'c-lib',
    children: [
      {
        path: '',
        name: 'c-lib-index',
        component: DemoHome,
      },
      ...demoRoutes,
    ],
    component: () => import('./demo-wrapper.vue'),
  },
];
