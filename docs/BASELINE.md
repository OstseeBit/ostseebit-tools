# Phase 0/1 baseline — 2026-10-03

## Scope and preflight

Migration/change, development repository in GitHub Cloud, risk Medium.
Authenticated connector identity: OstseeBit. Repository permissions reported admin,
maintain, push and pull. Target was public, not archived, size 0, with no branches;
Git refs returned 409 "Git Repository is empty". Rulesets returned [].
After bootstrap, branches were reported unprotected. No deployment is authorized by this phase.

## Immutable source identity

- Upstream: https://github.com/CorentinTh/it-tools
- Observed branch: main
- Commit: d505845f918e946ec300af7b36efc107e2f66e9e
- Upstream commit date: 2026-02-12T00:59:29Z
- Tree: c033c4c7b567f58aaa4c886e1443705838cfe04a
- Files: 498 (484 UTF-8 text, 14 binary); recursive tree response was not truncated.
- LICENSE blob: e72bfddabc15be5718a7cc061ac10e47741d8219
- Lockfile blob: 5d1138932335484ec8781253f87694cf6fbcda84
- Exact imported snapshot commit: 358374351dac7070b188a503a1f0aeb7c341510f
- Snapshot branch: upstream/baseline-2026-10-03
- Bootstrap commit: b260d2d2f60636d2dfc9e647af1499c316c3f2fe
- Bootstrap recovery branch: recovery/bootstrap-2026-10-03

All repository reads and writes used the GitHub connector. Base64 retrieval retained
binary bytes; file sizes were checked. GitHub produced exactly the upstream tree SHA
from all imported paths, modes and contents. This verifies source-tree equality,
including LICENSE and lockfile. The imported commit is newly authored; it does not
reproduce upstream commit authorship, signatures or parent history.

The working main branch derives from this snapshot and adds documentation while
relocating four workflows to .github/workflows-disabled/. Their bytes are preserved.
Do not merge the raw baseline branch into main or activate its workflows.

## Upstream analysis

Vue 3 SPA with Vite, TypeScript, Naive UI, PWA and browser-side tools. Static
deployment via nginx is provided. Package manifest declares pnpm 9.11.0,
Vue ^3.3.4, Vite ^4.4.9, TypeScript ~5.2.0, Vitest ^0.34.0 and Playwright ^1.32.3.
These are manifest constraints, not a claim about the exact installed versions.

.nvmrc specifies Node 18.18.2; CI uses Node 20; Docker uses floating node:lts-alpine
and nginx:stable-alpine and installs an unpinned global pnpm. Reproducibility needs a
separate change. No version was upgraded here.

CI provides lint, unit tests, type checking and build; E2E is split into three shards.
The browser-cache version lookup reads dependencies.playwright although the manifest
declares @playwright/test under devDependencies. Review before reactivating CI.

Nightly and tag-triggered releases push corentinth/it-tools and
ghcr.io/corentinth/it-tools. These inherited destinations must not be used by this
continuation. All workflows are quarantined on working main. No secrets were read,
added or copied. No registry image, release or deployment was created.

Plausible tracking and sponsor-banner configuration default to false, but the
implementation and dependency remain. No browser network test has been performed.
The German About text already states GPL-3.0, not MIT.

## Validation status and follow-up

PASS: source snapshot tree identity, LICENSE identity, complete 498-file retrieval.
Build, dependency installation, unit tests, E2E and runtime security audit:
NOT RUN in this phase. No claim of a working or secure release is made.

Next establish a reproducible isolated build using the preserved lockfile, capture
the baseline failures, then review runtime and package-manager versions. Run lint,
typecheck, non-watch unit tests, build and E2E before/after each scoped change.
Do not mix major dependency upgrades into the rebranding PR.

## Recovery and stop conditions

The original target contained no code, so no earlier application needs restoring.
Keep the two recovery/snapshot refs and these immutable SHAs. For rollback after
later merges, revert the relevant commits through a PR; never force-push main.
To inspect the source, create a disposable branch from the snapshot SHA without
making it the default branch or dispatching workflows. Do not restore live workflow
paths until publication destinations and permissions have been reviewed.
Stop if target refs change unexpectedly, a tree/blob hash differs, or connector
permissions reject an operation. Re-read current refs before resuming.

A ruleset/branch-protection configuration, tested build, third-party license review,
branding assets, production hostname and release strategy remain separate follow-ups.
