/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module '*?preset=modern' {
  const src: import('vite-plugin-image-presets').ImageAttrs[];
  export default src;
}
