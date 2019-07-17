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
