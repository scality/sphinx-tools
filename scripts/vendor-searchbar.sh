#!/usr/bin/env bash
#
# Vendor the docs-static-search "search box" bundle into the theme's static dir.
#
# Source of truth is searchbar.json ({ repo, version }). The matching release
# asset (docs-search-<version>.js) is committed at sphinx_scality/static/js/
# docs-search.js so it ships in the wheel (package_data: static/**/*) and Sphinx
# copies it into every doc's _static/. Re-run this and commit when bumping the
# version in searchbar.json.
#
# Auth: uses your `gh` login locally (needs read access to the internal repo).
set -euo pipefail
cd "$(dirname "$0")/.."

REPO=$(python3 -c "import json;print(json.load(open('searchbar.json'))['repo'])")
VERSION=$(python3 -c "import json;print(json.load(open('searchbar.json'))['version'])")
ASSET="docs-search-${VERSION}.js"
OUT="sphinx_scality/static/js/docs-search.js"

echo "Vendoring ${REPO}@${VERSION} (${ASSET}) -> ${OUT}"
gh release download "${VERSION}" --repo "${REPO}" --pattern "${ASSET}" --output "${OUT}" --clobber
echo "Vendored $(wc -c < "${OUT}" | tr -d ' ') bytes. Commit ${OUT} (it ships in the wheel)."
