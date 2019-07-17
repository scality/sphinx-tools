# coding: utf-8
"""`scaldoc` package.

Includes a Sphinx theme and other Sphinx customizations.
"""
from setuptools import setup

from scaldoc import __version__

with open('README.md', encoding='utf-8') as f:
    readme_data = f.read()

setup(
    name='scaldoc',
    version=__version__,
    author='Scality',
    author_email='docs@scality.com',  # FIXME
    description='Scality package for Sphinx (includes theme)',
    long_description=readme_data,
    zip_safe=False,
    packages=['scaldoc'],
    package_data={
        'scaldoc': [
            'theme.conf',
            '*.html',
            'static/css/*.css',
            'static/js/*.js',
            'static/fonts/**/*.*',
            'static/img/**/*.*',
        ]
    },
    entry_points={
        'sphinx.html_themes': [
            'scaldoc = scaldoc',
        ]
    },
    install_requires=['sphinx'],
    classifiers=[
        'Framework :: Sphinx',
        'Framework :: Sphinx :: Theme',
        'Intended Audience :: Developers',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
        'Operating System :: OS Independent',
        'Topic :: Documentation',
        'Topic :: Software Development :: Documentation',
    ],
)