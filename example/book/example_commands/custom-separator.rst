.. command-block:: custom-separator
   :separator: ~~MY-CUSTOM-SEPARATOR~~

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