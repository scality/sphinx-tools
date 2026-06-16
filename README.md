# Scality theme for Sphinx documentation

To test this theme, you will need:

- `make`
- `tox`, with Python 3

To build the example docs provided in this repository, using the local
definition of the `scaldoc` package, simply run:

```
tox -e docs
```

The built HTML will be in `example/_build`.

If you need extra dependencies to install, first edit the
`example/requirements.in` file, then run `tox -e pip-compile` before
re-building with `tox -e docs`.

## Search box

The theme's search box (`searchbox.html`) is the `<docs-search>` web component
from [`scality/docs-static-search`](https://github.com/scality/docs-static-search).
It reads the doc's own `searchindex.js` and runs fully client-side, so every doc
built with this theme gets it automatically — no per-project setup.

The bundle is **vendored** into the theme and ships in the wheel
(`package_data: static/**/*`), so Sphinx copies it to each doc's
`_static/js/docs-search.js`:

- **`searchbar.json`** (repo root) pins the release: `{ "repo", "version" }`.
- **`scripts/vendor-searchbar.sh`** downloads the matching release asset
  (`docs-search-<version>.js`) into `sphinx_scality/static/js/docs-search.js`,
  which is committed.

To upgrade the search box: bump `version` in `searchbar.json`, run
`bash scripts/vendor-searchbar.sh` (uses your `gh` login), commit the updated
`sphinx_scality/static/js/docs-search.js`, then release a new theme version.
