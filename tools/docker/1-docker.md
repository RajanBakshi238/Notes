# Docker:

    Docker is a platform or ecosystem around creating and running containers.

```mermaid
    flowchart LR
            A[Image
               : <small>Single file with all the deps
               and config required to run
               a program</small>
                ] --> B
                A --> C
                A --> D
            B[Container]
            C[Container]
            D[Container
                : <small>Instance of an image
                Runs a program.</small>
            ]
```

when we run the comand i.e docker run,  the  docker cli reaches the docker hub and it downloads a single file called <strong>Image.</strong>

<strong>Container</strong> is a program with its own set of hardware resources 
527