Extension Test Topic
====================

The purpose of this topic is to demonstrate the behavior of
two new extensions to be added to our sphinx environment:

- `Lightbox Image <https://pythonhosted.org/sphinxcontrib-images/>`_

- `Sphinx Design <https://sphinx-design.readthedocs.io/en/rtd-theme/>`_

Lightbox Image with Sphinxcontrib-images
----------------------------------------

.. image:: ../_images/todd.gif
    :width: 300px
    :align: center

    

.. example:: Syntax
    :collapsible:

    .. code-block:: rst

        .. thumbnail:: ../_images/todd.gif
        :width: 200px


Tabs with sphinx-design
-----------------------

.. md-tab-set::

    .. md-tab-item:: Label1



        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut a porttitor nunc, sed posuere sem.
        Maecenas risus tellus, pellentesque sed vulputate sagittis, consectetur eget lectus. Vivamus lacus neque,
        dapibus eget malesuada nec, rhoncus vel nunc. Proin magna est, cursus non nunc vitae,
        suscipit lobortis purus. 

    .. md-tab-item:: Label2


        Donec in nisi leo. Vestibulum massa diam, tristique ut erat in,
        laoreet vehicula odio. Sed ac neque ut leo scelerisque malesuada. Praesent fermentum porttitor
        quam eu venenatis. Pellentesque maximus mattis nunc, ut lacinia nisi feugiat in. Aliquam a condimentum augue.
        Nullam eget eros vitae purus dapibus laoreet. Suspendisse potenti. Nunc vel luctus massa, quis scelerisque erat.

.. md-tab-set::

    .. md-tab-item:: Label1


        Praesent ornare pellentesque pharetra. Curabitur varius placerat ligula, in tempus nibh iaculis et.
        Sed sapien massa, consequat maximus convallis id, venenatis in arcu. Etiam pellentesque est ac massa
        convallis, efficitur ullamcorper nisi dictum. Donec vel blandit elit, vitae sodales ipsum.
        Proin sed mollis urna, a rhoncus nibh. Curabitur ultricies, sapien ultrices auctor commodo,
        eros eros feugiat nulla, vitae vestibulum est magna sed magna.

    .. md-tab-item:: Label2


        Ut at nibh enim. Aenean pharetra
        nulla vel enim vehicula dapibus. Sed interdum dolor eget augue imperdiet, non consequat lectus volutpat.
        Vivamus nec ex neque. Pellentesque eget ullamcorper turpis. Maecenas pulvinar varius mauris quis euismod.
        Vivamus ac lacus cursus, fermentum nunc et, molestie turpis. Aliquam erat volutpat.

.. example:: Syntax
    :collapsible:

    .. code-block:: rst

        .. md-tab-set::

            .. md-tab-item:: Label1
                :sync: key1

                Content 1

            .. md-tab-item:: Label2
                :sync: key2

                Content 2

        .. md-tab-set::

            .. md-tab-item:: Label1
                :sync: key1

                Content 1

            .. md-tab-item:: Label2
                :sync: key2

                Content 2

