from . import command
from . import copy


def setup(app):
    command.setup(app)
    copy.setup(app)
