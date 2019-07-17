# coding: utf-8

from os import path

__version__ = '0.1.0'


def setup(app):
    app.add_html_theme('scaldoc', path.abspath(path.dirname(__file__)))

    return {
        'version': __version__,
        'parallel_read_safe': True,
    }
