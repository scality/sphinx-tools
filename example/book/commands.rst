Defining Command Blocks
=======================

Basic Example
-------------
Here is how to define a command:

.. literalinclude:: example_commands/basic.rst
   :language: rst

And this is how it would render:

.. include:: example_commands/basic.rst

Overflow Example
----------------

When some lines are too long, here's how they are shown (try reducing the
window width):

.. literalinclude:: example_commands/too-long.rst
   :language: rst

.. include:: example_commands/too-long.rst

Using a Custom Separator
------------------------

When the default separator ``---`` is part of either the command or its output,
a custom one can be provided:

.. literalinclude:: example_commands/custom-separator.rst
   :language: rst

.. include:: example_commands/custom-separator.rst
