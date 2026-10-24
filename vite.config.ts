import { resolve } from 'node:path';
import { URL, fileURLToPath } from 'node:url';

import VueI18n from '@intlify/unplugin-vue-i18n/vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Icons from 'unplugin-icons/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import markdown from 'unplugin-vue-markdown/vite';
import svgLoader from 'vite-svg-loader';
import { configDefaults } from 'vitest/config';
import { brand } from './src/branding.ts';

const baseUrl = process.env.BASE_URL ?? '/';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      fullInstall: true,
      strictMessage: false,
      include: [
        resolve(import.meta.dirname, 'locales/**'),
      ],
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        'vue-i18n',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
      vueTemplate: true,
      eslintrc: {
        enabled: true,
      },
    }),
    Icons({ compiler: 'vue3' }),
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    vueJsx(),
    markdown({}),
    svgLoader(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      workbox: {
        // Include the existing Monaco editor and MAC vendor database in offline precaching.
        // Keep a bounded limit; bundle splitting is tracked separately in the roadmap.
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        // Kept out of the install-time precache (22 MiB in total) to keep the first visit fast:
        //  - the /c-lib component showcase is only registered in development;
        //  - the heavy, rarely used chunks below are cached on first use instead (runtimeCaching),
        //    so those tools still work offline after their first visit.
        globIgnores: [
          '**/assets/*.demo-*.js',
          '**/assets/demo-wrapper-*.js',
          '**/assets/figlet-fonts/**',
          '**/assets/c-diff-editor-*',
          '**/assets/editor.worker-*.js',
          '**/assets/mac-address-lookup-*.js',
        ],
        runtimeCaching: [
          {
            urlPattern: /\/assets\/(?:figlet-fonts\/|c-diff-editor-|editor\.worker-|mac-address-lookup-)/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'heavy-tool-assets',
              // Hashed file names never change content, so a long lifetime is safe.
              expiration: { maxEntries: 400, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [200] },
            },
          },
        ],
      },
      manifest: {
        name: brand.name,
        description: brand.description,
        display: 'standalone',
        lang: 'de',
        start_url: baseUrl,
        orientation: 'any',
        theme_color: brand.themeColor,
        background_color: '#f1f5f9',
        icons: [
          {
            src: `${baseUrl}favicon-16x16.png`,
            type: 'image/png',
            sizes: '16x16',
          },
          {
            src: `${baseUrl}favicon-32x32.png`,
            type: 'image/png',
            sizes: '32x32',
          },
          {
            src: `${baseUrl}android-chrome-192x192.png`,
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: `${baseUrl}android-chrome-512x512.png`,
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
    Components({
      // TSX components use explicit imports; dotted Vue filenames are not valid globals.
      dtsTsx: false,
      dirs: ['src/'],
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      resolvers: [NaiveUiResolver(), IconsResolver({ prefix: 'icon' })],
    }),
    Unocss(),
  ],
  // Auto-registered components and lazy tools must be scanned before the first navigation.
  optimizeDeps: {
    entries: ['index.html', 'src/**/*.vue'],
  },
  base: baseUrl,
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // sax (via xml-js) extends Node's `stream` module for its SAXStream
      // class; Vite replaces unaliased Node builtins with an empty
      // browser-external stub, which makes that class definition crash with
      // "Cannot read properties of undefined (reading 'prototype')" the
      // moment xml-js is imported, regardless of which part of it is used.
      stream: 'stream-browserify',
      // vuedraggable's published "main"/"module" dist files are a
      // pre-bundled webpack+core-js@2 artifact. Its global-object detection
      // falls back to `Function('return this')()`, which this project's CSP
      // (no 'unsafe-eval') blocks outright, breaking every page in Firefox
      // since Home.page.vue (the "/" route) pulls it into the eagerly
      // loaded main chunk. Alias straight to the package's own un-bundled
      // ES source instead (plain sortablejs + Vue, no eval anywhere).
      vuedraggable: fileURLToPath(new URL('./node_modules/vuedraggable/src/vuedraggable.js', import.meta.url)),
      // vue-shadow-dom declares a "browser" field that points at its IIFE build
      // (dist/shadow.global.prod.js), which Vite prefers over "module". That file does a CommonJS
      // require('vue'), so it dragged a second copy of Vue plus the template compiler
      // (@vue/compiler-core/-dom, ~190 KB) into the entry chunk. Use the plain ES module instead.
      'vue-shadow-dom': fileURLToPath(new URL('./node_modules/vue-shadow-dom/shadow.mjs', import.meta.url)),
    },
  },
  define: {
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(process.env.npm_package_version),
  },
  test: {
    exclude: [...configDefaults.exclude, '**/*.e2e.spec.ts'],
    setupFiles: ['./src/test-setup.ts'],
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        // The ~330 figlet fonts are one tiny chunk each. A separate folder lets the service worker
        // cache them on first use instead of pre-caching all of them (see VitePWA above).
        chunkFileNames: chunk =>
          chunk.moduleIds.some(id => id.replaceAll('\\', '/').includes('/figlet/fonts/'))
            ? 'assets/figlet-fonts/[name]-[hash].js'
            : 'assets/[name]-[hash].js',
      },
    },
  },
});
