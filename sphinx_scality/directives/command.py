"""Directives for building command blocks."""

from docutils import nodes
from docutils.parsers.rst import directives
from sphinx.util.docutils import SphinxDirective


class CommandBlockDirective(SphinxDirective):
    """Generate a container node with a command, its prompt and optional output."""

    has_content = True
    required_arguments = 1  # The command-block ID used in references

    option_spec = dict(
        prompt=directives.unchanged,
        separator=directives.unchanged,
    )

    def run(self):
        separator = self.options.get(
            "separator", self.config.command_block_default_separator
        )
        command, output = [], None
        for line in self.content.data:
            if output is None:
                if line == separator:
                    output = []
                else:
                    command.append(line)
            else:
                if line == separator:
                    raise self.error(
                        "Found multiple separator lines - this is not supported, please"
                        " use multiple `command-block` directives instead"
                    )
                output.append(line)

        prompt = self.options.get("prompt", self.config.command_block_default_prompt)

        # block_node = command_block()
        block_node = nodes.container(
            classes=["command-block"], ids=[f"command-block-{self.arguments[0]}"]
        )
        # block_node += command_prompt(prompt)
        prompt_node = nodes.literal_block(
            language="console", classes=["command-block__prompt"]
        )
        prompt_node += nodes.Text(prompt)
        block_node += prompt_node
        # block_node += command_input("\n".join(command))
        input_node = nodes.container(classes=["command-block__input"])
        input_text_node = nodes.literal_block(
            language="shell", classes=["command-block__input-text"]
        )
        input_text_node += nodes.Text("\n".join(command))
        input_node += input_text_node
        block_node += input_node
        if output:
            output_node = nodes.literal_block(
                language="none", classes=["command-block__output"]
            )
            output_node += nodes.Text("\n".join(output))
            block_node += output_node

        return [block_node]


def setup(app):
    app.add_config_value(
        "command_block_default_prompt",
        default="[user@host ~]$",
        rebuild="html",
        types=[str],
    )
    app.add_config_value(
        "command_block_default_separator",
        default="---",
        rebuild="html",
        types=[str],
    )
    app.add_directive("command-block", CommandBlockDirective)
