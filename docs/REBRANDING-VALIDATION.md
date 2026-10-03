# Rebranding validation — 2026-10-03

This draft implements the OstseeBit Tools source rebranding. It is not ready for
merge or release until build and runtime checks have completed.

## Baseline and recovery

- Main at the start of this task: 6fad823cce4f2ec7a1c15304ec090925c5fa9f06.
- Rebranding started from 79a61055a4d22f654728f56063edd251f8f04300.
- Recovery branch: recovery/pre-rebranding-2026-10-03, pointing to that starting commit.
- The original upstream tree and source provenance remain documented in BASELINE.md.
- During implementation, inventory-only PR #1 was merged outside this task. Main
  advanced to 2883b12319194d3e3915de938ac0dea1fb70ab61, whose tree is identical to
  the starting rebranding commit. The application changes are submitted separately.
- Repository reads and writes use the GitHub connector; the local verification copy
  was materialized from 501 connector-fetched blobs, checking every Git blob hash.

## Completed checks

- LICENSE remains byte-identical to upstream blob
  e72bfddabc15be5718a7cc061ac10e47741d8219.
- pnpm-lock.yaml, dependency/devDependency constraints, package manager, application
  version and build/test scripts are unchanged.
- All nine locales retain their complete tool sections byte-for-byte. Their About
  sections retain original-author attribution and GNU GPLv3 information. Removed
  promotional/social locale keys have no remaining source consumers.
- Node 24.19.0 syntax checks passed for 43 modified script sources, including script
  blocks extracted from Vue components. These are syntax checks, not TypeScript
  type checking. Declaration files were excluded from this check.
- Template tag-balance checks passed for nine modified Vue components. This is not
  a Vue compilation or an accessibility/browser test.
- SVG/XML assets parse successfully; PNG dimensions and decoding were checked;
  the ICO contains 16/32/48/64-pixel variants. The wordmark and banner were visually
  inspected. New artwork is original wave geometry, with a generation script in
  scripts/generate-brand-assets.py (requires Pillow and a listed system font).
- No Plausible imports, tracking configuration, social accounts or upstream
  sponsorship URLs remain in the application source. The unused plausible-tracker
  dependency is retained to avoid changing dependency resolution in this PR.
- The four inherited workflows remain unchanged in .github/workflows-disabled/;
  no active workflow was created. LICENSE, historic changelog and OTP issuer behavior
  remain unchanged.

## Build and test blocker

A frozen-lockfile install was attempted with the available pnpm 11.19.0 runtime;
registry requests failed with EACCES in the sandbox. That incomplete process was
stopped. It did not change the lockfile.

A request to download the manifest-pinned pnpm 9.11.0 and frozen dependencies with
install scripts disabled was rejected by the user. It did not execute. No further
package-download attempt or remote CI workaround was made.

Baseline build, ESLint, vue-tsc, Vitest, application build, Playwright and browser
network/PWA tests have therefore NOT RUN. Static checks do not demonstrate release
readiness. The PR remains a draft; major upgrades are deferred until the baseline
can be measured.

## Remaining acceptance checks

1. Install dependencies with pnpm 9.11.0 and the frozen lockfile in an isolated,
   agreed toolchain. Review and run required dependency build scripts explicitly.
2. Run lint, type checking, non-watch unit tests, production build and E2E against
   both the imported baseline and the modified branch; record inherited failures.
3. Inspect home/About/tool/404 pages, nine locales, narrow/wide screens and both
   color themes. Confirm updated page-title expectations pass.
4. Inspect PWA installation/update and a nested base URL. Verify icon requests and
   confirm no tracking/sponsorship network requests. Review production CSP separately.
5. Decide the deployment hostname before adding canonical or absolute social-image
   URLs. No placeholder production hostname is advertised.
6. Review corresponding-source/third-party licensing and publication workflow before
   distributing containers or release artifacts.

Recovery: close the draft without merging, or revert subsequent commits through a
PR. Keep baseline and recovery refs. Do not force-push or restore unreviewed workflows.
