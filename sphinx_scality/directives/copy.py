"""Directives for building command blocks."""

from docutils import nodes
from docutils.parsers.rst import directives
from sphinx.util.docutils import SphinxDirective


class CopyBlockDirective(SphinxDirective):
    """Generate a container node with highlighted content and a copy button."""

    has_content = True
    required_arguments = 1  # The copy-block ID used in references

    option_spec = dict(
        language=directives.unchanged,
    )

    def run(self):
        block_node = nodes.container(
            classes=["copy-block"], ids=[f"copy-block-{self.arguments[0]}"]
        )
        language = self.options.get("language", "none")
        content_node = nodes.literal_block(
            language=language, classes=["copy-block__content"]
        )
        content_node += nodes.Text("\n".join(self.content))
        block_node += content_node
        block_node += nodes.container(classes=["copy-block__copy"])
        return [block_node]


def setup(app):
    app.add_directive("copy-block", CopyBlockDirective)
