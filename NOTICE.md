# Upstream notice and attribution

OstseeBit Tools is an independent continuation of IT-Tools, originally created by
Corentin Thomasset and developed with the IT-Tools contributors.

- Original project: https://github.com/CorentinTh/it-tools
- Original authors and contributions: https://github.com/CorentinTh/it-tools/graphs/contributors
- Source baseline: https://github.com/CorentinTh/it-tools/commit/d505845f918e946ec300af7b36efc107e2f66e9e
- Continuation maintained by OstseeBit: https://github.com/OstseeBit/ostseebit-tools

The upstream project is distributed under GNU GPL version 3. The original LICENSE
is retained without modification. Existing copyright, attribution and third-party
license notices remain applicable; OstseeBit does not claim authorship of the
upstream work. This notice does not replace LICENSE or third-party license terms.

## Changes made on 2026-10-03

Imported the exact upstream source snapshot, added provenance and phase 0/1
documentation, and moved the four inherited GitHub Actions workflows from
.github/workflows/ to .github/workflows-disabled/ without changing their contents.
This prevents inherited CI, scheduled publishing and release jobs from running
on the working main branch before a dedicated review.

Application branding, runtime source, dependencies and lockfile are unchanged.
This is not yet a rebranded or validated release. No endorsement by upstream is implied.

Original Git history was not imported. The exact upstream commit and tree identify
the source and its original history. See docs/BASELINE.md for verification and recovery.

Future modifications must retain applicable notices and clearly identify changes
and dates. Before distributing built artifacts, provide their corresponding source,
build materials and applicable license notices as required by GPLv3.
