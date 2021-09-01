import os.path

VERSION_FILE = os.path.realpath(os.path.join(os.path.dirname(__file__), "../VERSION"))
with open(VERSION_FILE, encoding="utf-8") as f:
    VERSION = f.read()
