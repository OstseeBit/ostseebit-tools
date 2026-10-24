const appEnvs = ['production', 'development', 'preview', 'test'] as const;
type AppEnv = typeof appEnvs[number];

function parseAppEnv(value: string | undefined): AppEnv {
  if (value === undefined || value === '') {
    return import.meta.env.PROD ? 'production' : 'development';
  }
  if (!(appEnvs as readonly string[]).includes(value)) {
    throw new Error(`Invalid configuration: VITE_VERCEL_ENV must be one of ${appEnvs.join(', ')}, got "${value}"`);
  }
  return value as AppEnv;
}

// Plain reads of Vite's environment. The string 'import.meta.env.PACKAGE_VERSION' is statically
// replaced during build time (see 'define' in vite.config.ts), so it has to be accessed literally.
export const config = {
  app: {
    version: (import.meta.env.PACKAGE_VERSION as string | undefined) || '0.0.0',
    lastCommitSha: (import.meta.env.VITE_GIT_COMMIT_SHA as string | undefined) ?? '',
    baseUrl: (import.meta.env.BASE_URL as string | undefined) ?? '/',
    env: parseAppEnv(import.meta.env.VITE_VERCEL_ENV as string | undefined),
  },
} as const;
