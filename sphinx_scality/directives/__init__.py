from . import command
from . import copy
from . import searchindexer


def setup(app):
    command.setup(app)
    copy.setup(app)
    searchindexer.setup(app)
