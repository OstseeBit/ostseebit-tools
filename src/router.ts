import { createRouter, createWebHistory } from 'vue-router';
import { config } from './config';
import { layouts } from './layouts/index';
import NotFound from './pages/404.page.vue';
import HomePage from './pages/Home.page.vue';
import { tools } from './tools';
import { routes as demoRoutes } from './ui/demo/demo.routes';
import { isChunkLoadError } from './utils/chunk-error';
import { toolLoadFailed } from './utils/load-error';

const toolsRoutes = tools.map(({ path, name, component, ...config }) => ({
  path,
  name,
  component,
  meta: { isTool: true, layout: layouts.toolLayout, name, ...config },
}));
const toolsRedirectRoutes = tools
  .filter(({ redirectFrom }) => redirectFrom && redirectFrom.length > 0)
  .flatMap(
    ({ path, redirectFrom }) => redirectFrom?.map(redirectSource => ({ path: redirectSource, redirect: path })) ?? [],
  );

const router = createRouter({
  history: createWebHistory(config.app.baseUrl),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./pages/About.vue'),
    },
    ...toolsRoutes,
    ...toolsRedirectRoutes,
    ...(config.app.env === 'development' ? demoRoutes : []),
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ],
});

// Ein Werkzeug lässt sich nicht nachladen (neue Version veröffentlicht oder keine Verbindung): einmal neu laden,
// damit die aktuellen Dateien geholt werden; klappt es wieder nicht, eine sichtbare Meldung statt einer leeren Seite
// (das Banner steht im Grundlayout).
router.onError((error, to) => {
  if (!isChunkLoadError(error)) {
    return;
  }
  const key = `chunk-reload:${to.fullPath}`;
  try {
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, '1');
      window.location.assign(to.fullPath);
      return;
    }
  }
  catch {
    // Speicher gesperrt: direkt die Meldung zeigen.
  }
  toolLoadFailed.value = true;
});

export default router;
