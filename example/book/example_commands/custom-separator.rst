.. code-block::

   cat ./some-k8s-manifest.yaml
   ~~MY-CUSTOM-SEPARATOR~~
   kind: Pod
   apiVersion: v1
   # ...
   ---
   kind: ConfigMap
   apiVersion: v1
   # ...
   ---
   # ...