..
    sphinxcontrib-images 0.9.4
    Project home: https://github.com/sphinx-contrib/images

    Sphinx Panels
    Project home: https://github.com/executablebooks/sphinx-panels/blob/master/docs/index.rst

Sample Topic with One Step per Method
=====================================

Introduction
------------

- Lorem ipsum ``dolor sit amet``, consectetur adipiscing elit.
   Cras eu arcu mollis, **sodales quam pharetra**, aliquam sapien. 

- Praesent semper eros et ``eleifend ullamcorper``, consectetur adipiscing elit.
   In maximus **nec urna nec finibus**. vulputate bibendum nibh.
   Morbi sed lorem id erat iaculis fermentum ut non sem.    

Etiam id lacus felis. Sed aliquet consequat es.
Class aptent taciti sociosqu ad litora torquent per conubia nostra,
per inceptos himenaeos.

Prerequisites
-------------

Lorem ipsum dolor sit amet, `Lorem <https://www.lipsum.com/>`_ adipiscing elit.
Cras eu arcu mollis, sodales quam pharetra, aliquam sapien. 

Procedure
---------

Step 1
******
.. tabs:: 

    .. group-tab:: GUI

        Etiam id lacus felis. Sed aliquet consequat es.

            #. Mauris pulvinar **rutrum** ante, non hendrerit neque cursus eu.

            #. Etiam **varius** laoreet maximus

    .. group-tab:: CLI

        Etiam id lacus felis. Sed aliquet consequat es.

            .. command-block:: aaa

                INSTANCE=Class aptent taciti sociosqu ad litora torquent \
                    get er conubia nostra per ='{.inceptos.himenaeos}')


Step 2
******
.. tabs:: 

    .. group-tab:: GUI

        Cras eu arcu mollis, sodales quam pharetra:

            #. In hac **habitasse** platea dictumst.

            #. Phasellus imperdiet nunc ``faucibus`` justo accumsan varius.

            .. important::

                Quisque mattis faucibus **mattis**. Sed ut venenatis sem. Nullam eget
                mauris ``egestas ex euismod`` commodo. Donec **interdum** nisl ac ullamcorper placerat.
    
            Suspendisse egestas augue est, nec molestie felis tempor id.

    .. group-tab:: CLI

        Cras eu arcu mollis, sodales quam pharetra: 

            .. command-block:: bbb

                INSTANCE=Sed pharetra leo est, porta lobortis felis pharetra ut \
                    Fusce id ligula sed tellus ='{.inceptos.venenatis}')


Step 3
******

.. tabs:: 

    .. group-tab:: GUI

        Auros et tristique nulla, at auctor tortor.

            #. Class aptent taciti sociosqu ad litora **torquent** per conubia nostra.

            #. Per inceptos **himenaeos**. Morbi tristique molestie condimentum.

            #. Nam lacus ligula, ``semper`` vel ``auctor`` eget, ``tempor`` nec diam.

            #. Phasellus sed nibh **eros**.



    .. group-tab:: CLI

        Auros et tristique nulla, at auctor tortor.

            .. command-block:: ccc

                INSTANCE=Curabitur vel velit id elit auctor sagittis \
                    Ut malesuada nulla id ipsum venenatis ='{.inceptos.Curabitur}')



        .. note::
    
            Nam lacus ligula, ``semper`` vel ``auctor`` eget, ``tempor`` nec diam.
            Suspendisse egestas augue est, nec molestie felis tempor id.

        .. dropdown:: Example Output

            .. code::
                
                Curabitur viverra feugiat odio, eu
                    Duis non sem eget magna suscipit cursus
                        Nunc non erat mollis ex suscipit pulvinar
                            Donec pulvinar libero metus, ut dapibus 
                                    Phasellus eleifend eget lectus sagittis
                                        Duis turpis mi, faucibus sit amet aliquam

                    liquam mattis mollis gravida. Sed metus augue,
                        ultrices eget blandit ut, volutpat a ante. Sed
                            eo in vestibulum bibendum. Pellentesque vestibulum
                                magna, eu fringilla leo ultrices quis. Mauris massa qua
                                    pulvinar sed semper in, ultricies ut turpis. Etiam vestibulum

                        lacus quis lorem cursus, in commodo metus tempus
                            sed felis vehicula, hendrerit sapien quis, sollicitudin sem.
                                Donec a accumsan urna, et facilisis leo. Aenean odio sem,
                                    dignissim in condimentum lacinia, auctor non arcu.

                Curabitur viverra feugiat odio, eu
                    Duis non sem eget magna suscipit cursus
                        Nunc non erat mollis ex suscipit pulvinar
                            Donec pulvinar libero metus, ut dapibus 
                                    Phasellus eleifend eget lectus sagittis
                                        Duis turpis mi, faucibus sit amet aliquam

                    liquam mattis mollis gravida. Sed metus augue,
                        ultrices eget blandit ut, volutpat a ante. Sed
                            eo in vestibulum bibendum. Pellentesque vestibulum
                                magna, eu fringilla leo ultrices quis. Mauris massa qua
                                    pulvinar sed semper in, ultricies ut turpis. Etiam vestibulum

                        lacus quis lorem cursus, in commodo metus tempus
                            sed felis vehicula, hendrerit sapien quis, sollicitudin sem.
                                Donec a accumsan urna, et facilisis leo. Aenean odio sem,
                                    dignissim in condimentum lacinia, auctor non arcu.
        
.. 
    Conflict between the sphinx-tabs extension and the LightBox image extension,
    can't have both on the same page otherwise the image will open as a whole page
    instead of appearing as an overlay.
