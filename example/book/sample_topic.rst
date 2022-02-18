Sample Topic 
============

Tabs
----

Tabs with sphinx-tabs
*********************

.. tabs::

    .. group-tab:: Tab 1

        Tab 1 content

    .. group-tab:: Tab 2

        Tab 2 content


.. tabs::

    .. group-tab:: Tab 1

        Tab 1 content

    .. group-tab:: Tab 2

        Tab 2 content


Tabs with sphinx-panels
***********************

.. tabbed:: Tab 1

    Tab 1 content

.. tabbed:: Tab 2

    Tab 2 content

.. tabbed:: Tab 1
    :new-group:

    Tab 1 content

.. tabbed:: Tab 2

    Tab 2 content

.. 
    Conflict between the sphinx-tabs extension and the LightBox image extension,
    can't have both on the same page otherwise the image will open as a whole page
    instead of appearing as an overlay.
