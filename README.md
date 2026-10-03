<picture>
  <source srcset="./.github/logo-white.svg" media="(prefers-color-scheme: dark)">
  <img src="./.github/logo-dark.svg" alt="OstseeBit Tools" width="640">
</picture>

Handy online tools for developers and IT professionals, maintained by **OstseeBit**.

This is an independent continuation of [IT-Tools](https://github.com/CorentinTh/it-tools),
originally created by **Corentin Thomasset and the IT-Tools contributors**.
Their authorship and contributions are preserved. See [NOTICE.md](NOTICE.md)
and the [baseline report](docs/BASELINE.md) for source provenance.

## Status

The application is being rebranded as OstseeBit Tools. The imported source baseline,
LICENSE and dependency lockfile are preserved. The rebranding PR remains a draft
until build and runtime validation is complete. No OstseeBit container image or
production deployment is currently advertised.

- [Report a bug or request a tool](https://github.com/OstseeBit/ostseebit-tools/issues/new/choose)
- [Rebranding inventory](docs/REBRANDING-INVENTORY.md)
- [Validation report](docs/REBRANDING-VALIDATION.md)

## Development

The upstream manifest specifies pnpm **9.11.0**. The baseline uses Node 18.18.2 in
.nvmrc and Node 20 in its inherited CI; selecting a consistent supported toolchain
is a separate modernization change. Use an isolated environment and the preserved
lockfile. Do not run unrestricted upgrades to resolve a build failure.

```sh
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Checks after installing dependencies:

```sh
pnpm lint
pnpm typecheck
pnpm exec vitest run --environment jsdom
pnpm build
pnpm test:e2e
```

The inherited build script uses POSIX environment-variable syntax; use a Linux
environment for that script or invoke its two build steps explicitly on Windows.

Create a tool with `pnpm run script:create:tool my-tool-name`.
Vue 3, TypeScript, Naive UI, Vite, Vitest and Playwright are used by the project.

## Self-hosting and privacy

The existing Dockerfile builds a static application served by nginx. Its floating
base images and unpinned global pnpm installation need review before release.
Inherited CI and publication workflows remain in `.github/workflows-disabled/`.
They must be reviewed before activation, including all registry destinations.

The Plausible integration, tracking configuration, social links and sponsorship UI
have been removed from the application. An unused `plausible-tracker` dependency
remains in the preserved manifest/lockfile until a separate dependency cleanup.
No production URL or analytics endpoint is configured by this rebranding.

## Attribution and license

Original project: [CorentinTh/it-tools](https://github.com/CorentinTh/it-tools).
Thanks to [its contributors](https://github.com/CorentinTh/it-tools/graphs/contributors).
Continuation maintainer: [OstseeBit](https://github.com/OstseeBit).

This project is distributed under [GNU GPLv3](LICENSE), without warranty.
Existing copyright and third-party notices remain applicable. Before distributing
built artifacts, provide their corresponding source and applicable license notices.
