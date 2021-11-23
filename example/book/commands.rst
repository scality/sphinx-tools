Defining Command Blocks
=======================

Basic Example
-------------
Here is how to define a command:

.. literalinclude:: example_commands/basic.rst
   :language: rst

And this is how it would render:

.. container:: toggle

   .. container:: collapsible

      Show/hide Code

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

.. container:: toggle

   .. container:: collapsible

      Show/hide code

   .. include:: example_commands/custom-separator.rst

Flat Content to Copy
--------------------

Sometimes, we want to simply provide content for a user to copy, which is not
some command. For this, we add a ``copy-block`` directive, used as follows:

.. literalinclude:: example_commands/copy-block.rst
   :language: rst

.. include:: example_commands/copy-block.rst
