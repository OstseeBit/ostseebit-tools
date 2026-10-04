declare module '*.vue' {
  import type { ComponentOptions } from 'vue';

  const Component: ComponentOptions;
  export default Component;
}

declare module '*.md' {
  import type { ComponentOptions } from 'vue';

  const Component: ComponentOptions;
  export default Component;
}

declare module 'emojilib' {
  const lib: Record<string, string[]>;
  export default lib;
}

declare module 'unicode-emoji-json' {
  const emoji: Record<string, {
    name: string
    slug: string
    group: string
    emoji_version: string
    unicode_version: string
    skin_tone_support: boolean
    skin_tone_support_unicode_version: string
  }>;

  export default emoji;
}

declare module 'pdf-signature-reader' {
  const verifySignature: (pdf: ArrayBuffer) => ({ signatures: SignatureInfo[] });

  export default verifySignature;
}

declare module '@tabler/icons-vue/dist/esm/icons/IconDragDrop.mjs' {
  const icon: typeof import('@tabler/icons-vue').IconDragDrop;
  export default icon;
}

declare module '@tabler/icons-vue/dist/esm/icons/IconBrandGithub.mjs' {
  const icon: typeof import('@tabler/icons-vue').IconBrandGithub;
  export default icon;
}

declare module '@tabler/icons-vue/dist/esm/icons/IconInfoCircle.mjs' {
  const icon: typeof import('@tabler/icons-vue').IconInfoCircle;
  export default icon;
}

declare module '@tabler/icons-vue/dist/esm/icons/IconMoon.mjs' {
  const icon: typeof import('@tabler/icons-vue').IconMoon;
  export default icon;
}

declare module '@tabler/icons-vue/dist/esm/icons/IconSun.mjs' {
  const icon: typeof import('@tabler/icons-vue').IconSun;
  export default icon;
}
