# OstseeBit rebranding inventory

Prepared 2026-10-03 against upstream d505845f918e946ec300af7b36efc107e2f66e9e.
This draft prepares phase 2; it does not implement application rebranding.
See [baseline](BASELINE.md) and [attribution](../NOTICE.md).

## Decisions

Working product name: OstseeBit Tools (ASSUMPTION; final display name TBD).
Repository: https://github.com/OstseeBit/ostseebit-tools.
Intended GHCR namespace: ghcr.io/ostseebit/ostseebit-tools (not yet published).
Production URL, logo, social accounts and Docker Hub destination: TBD.
Do not invent destinations or preserve upstream hosting claims as our own.

## File-level worklist

| Area | Locations | Planned change and acceptance |
| --- | --- | --- |
| Package identity | package.json:2,7,11 | Change package/repository identity; retain original-author attribution and add continuation-maintainer identity. Preserve dependency names and versions. |
| Project documentation | README.md | Describe continuation and current validation state; replace operational issue/install links only when destinations exist; keep original credits and GPL notice. Do not advertise an unpublished image. |
| Funding and issue metadata | .github/FUNDING.yml; .github/ISSUE_TEMPLATE/bug-report.yml; feature-request.yml | Remove upstream default assignee and funding destination; update product/environment text. Do not redirect contributions without an explicit destination. |
| Browser/SEO metadata | index.html:7-48 | Update title, descriptions, canonical, OG and Twitter metadata. Remove unsupported upstream social/hosting claims. Hostname remains TBD. |
| PWA | vite.config.ts:60 onwards | Product name, description, language, icon set, theme and start URL. Review service-worker/cache upgrade behavior and base-path handling. |
| Logo and images | .github/logo-dark.png; .github/logo-white.png; public/banner.png; public/favicon.ico; public/favicon-{16x16,32x32}.png; public/apple-touch-icon.png; public/android-chrome-{192x192,512x512}.png; public/mstile-*.png; public/safari-pinned-tab.svg; public/browserconfig.xml | Supply consistent OstseeBit assets and inspect every format/size, dark/light mode and install icon. Preserve archived upstream snapshot. |
| Layout and credits | src/layouts/base.layout.vue:64-126 | Product heading, version/commit source links, footer author presentation and sponsorship. Keep explicit IT-Tools/Corentin/contributor credit in About/NOTICE. Version links must resolve against actual refs. |
| Navigation | src/components/NavbarButtons.vue:14; src/modules/command-palette/command-palette.store.ts:51-67; src/pages/Home.page.vue:31 | Repository, issue and About navigation must point to this continuation. |
| Page titles | src/layouts/tool.layout.vue:13; src/pages/Home.page.vue:13; src/pages/About.vue:4; src/pages/404.page.vue:4 | Centralize display name so individual pages do not drift. |
| Translations | locales/{de,en,es,fr,no,pt,uk,vi,zh}.yml | Review home/navigation/About, donation links, authorship, hosting claims and package/issue links in all nine locales. German already says GPL-3.0; do not claim a current MIT defect. Preserve locale keys and tool descriptions. |
| Human credits | public/humans.txt | Distinguish original authors from continuation maintainers; preserve provenance. |
| Tracking | src/config.ts:31 onwards; src/plugins/plausible.plugin.ts; src/modules/tracker/tracker.services.ts; src/main.ts; env.d.ts; package.json | Decide removal vs explicitly opt-in operation. Keep default off and test browser requests. Do not remove dependency without updating lockfile and consumers together. |
| Sponsorship | src/config.ts showBanner/showSponsorBanner; src/layouts/base.layout.vue; locale support/buyMeACoffee strings | Remove upstream promotional paths as a scoped UI change; preserve historical attribution. |
| CI and publishing | .github/workflows-disabled/{ci,e2e-tests,docker-nightly-release,releases}.yml | Currently inactive. Review least-privilege permissions, explicit toolchain/lockfile use, cache version lookup, registry paths and release artifacts before reactivation. Do not publish to corentinth namespaces. |
| Release tooling | scripts/release.mjs; scripts/getLatestChangelog.mjs; .versionrc; CHANGELOG.md | Review version/tag and generated release references. Preserve historical changelog entries as history. |
| Generated tests | scripts/create-tool.mjs:88; src/tools/**/*.e2e.spec.ts | Update title expectations and generator consistently with central product name. Existing test sample strings need not be globally renamed. |
| OTP default issuer | src/tools/otp-code-generator-and-validator/otp.service.ts:110 and otp.service.test.ts:111 | Deliberate behavior change: update issuer default and matching test together, while retaining explicit custom issuer behavior. |
| Example URLs | src/tools/qr-code-generator/qr-code-generator.vue:12; src/tools/url-parser/url-parser.vue:6; src/tools/meta-tag-generator/og-schemas/twitter.ts:27 | Replace product-owned example destinations/accounts with neutral examples or confirmed OstseeBit values. |
| Demo/theme identifiers | src/ui/c-markdown/c-markdown.demo.vue; src/ui/c-diff-editor/c-diff-editor.vue | Review visible demo branding; internal theme keys can remain unless renamed consistently. |
| Deployment templates | Dockerfile; nginx.conf; netlify.toml; vercel.json; .dockerignore | Review deployment assumptions separately. Do not claim inherited hosting integrations are active. |

## Preserve rather than blanket-replace

- LICENSE must remain byte-identical: e72bfddabc15be5718a7cc061ac10e47741d8219.
- Original copyright, contributor attribution and third-party notices remain.
- @it-tools/bip39 and @it-tools/oggen are dependency package names, not branding
  strings to substitute blindly.
- Historical changelog, source provenance, recovery refs and generic test input
  strings must not be rewritten just to eliminate every upstream-name match.
- No major dependency upgrade is part of this PR.

## Completion criteria for a later rebranding implementation

1. Document the final display name, assets and production URL (or omit unavailable links).
2. Obtain a reproducible baseline build with the existing lockfile and record failures.
3. Implement UI, metadata and translation changes together; keep source attribution visible.
4. Run lint, typecheck, non-watch unit tests, production build and E2E; inspect home,
   About, tool and 404 pages in light/dark modes and all locales.
5. Inspect PWA installation/update, nested base URL, browser network traffic and all
   repository/issue/version links. Confirm no unintended tracking or sponsorship requests.
6. Review remaining upstream-name matches; classify them as attribution, dependency,
   historical material, example or unresolved branding.
7. Review corresponding-source and third-party notices before any binary/container release.
8. Restore only reviewed CI workflows; publishing requires a separate controlled change.

Rollback: close this draft without merging, or revert the eventual rebranding commits
through a PR. Keep baseline refs. No force-push, dependency upgrades, release, container
publication or production deployment is included in this phase.
