# coding: utf-8

from os import path

from . import directives
from . import __version__


def setup(app):
    app.add_html_theme("sphinx_scality", path.abspath(path.dirname(__file__)))

    directives.setup(app)

    return {
        "version": __version__.VERSION,
        "parallel_read_safe": True,
        "parallel_write_safe": True,
    }
