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

when we run the comand i.e docker run, the docker cli reaches the docker hub and it downloads a single file called <strong>Image.</strong>

<strong>Container</strong> is a program with its own set of hardware resources

## Docker Client

> **_Command_** :docker run hello-world
>
> Basically this command runned through docker cli will look into docker-server for images if not found then go into docker hub if found there then it will cache(for future use i.e no need to download it.) it and run the instance of that image i.e cotainer

![alt text](./assets/docker_cli_run.png)

## Container in detail :

> ### 1. Overview of Operating system
>
> - **_Kernel_** : This kernel is a running software process that governs access between all the programs that are running on your computer and all physical hardware that is connected to your computer as well.
>   ![alt text](./assets/overview_of_operating_system.png)

> ### 2. Hypothetical situation example
>
> ![alt text](./assets/hypothetical_eg.png)
>
> **_Namespacing_**: The entire process of segmenting hardware resource based on the process asking it is known as namespacing.
>
> with namespacing we are allowed to isolate resources per a process or a group of proceeses.
>
> similarly closed to namespace we have one thing also called Controlled groups (croups).
>
> **_Control Groups_**: Control groups is used to limit the amount of resource a particular group could used.

> ### 3. So now container is:
>
> ![alt text](./assets/container.png)
> The entire vertical block marked is referred to container. So container is not a physical contract, that exist inside our computer. Instead container is really a process , that have grouping specifically assigned to it.

> ### 4. What is the relation between a container i.e singular process and grouping of resources into image. i.e how single file (image creates the container.)
>
> ![alt text](./assets/relation_between_container_&_image.png)
> Anytime we are talking about image we are talking about file system snapshot which is essentially kind of like copy paste of very specific set of directories or files. Image also has a startup command.
>
> when we turn the image into container, firstly **_kernel_** is going to isolate little section of the hard drive and make it available to this shown container. so now we have chrome and python installed in the conatianer. Then when **_startup command_** is executed which we will invoke the process i.e chrome in our process then that process is isolated for this set of resources inside the container.

> **_Note_**: : Kernel is not available in window or macos so while installation docker in window or mac os linux virtual machine is also downloaded and run while using docker. see the example below:
> ![alt text](./assets/docker_internals.png)

# Running a docker:

 ![alt text](./assets/docker_run_cmd.png)

> ### Overriding default commands
> 
>![alt text](./assets/overriding_default_cmd.png)
>
>eg:
> ***1. docker run busybox echo hi there***
>   - This command will override the default behaviour and will print **hi there**
>
>***2. docker run busybox ls***
>   - This command will show the list of files in cmd

### Listing all running containers:

***1. docker ps*** : This command will list all the running container.

    To see the list of container running u must have some conatiner running below is the example of command which will make container running for long bit of time.
    - docker run busybox ping google.com
    This will ping to google and get the result and will be kept running for long period of timming.

***2. docker ps --all***: This command will return the list of all the container ever runned.


### Container Lifecycle
 > ***docker run*** is the addition of two command i.e ***docker create*** and ***docker start***

![alt text](./assets/docker_run_internal.png)

![alt text](./assets/docker_internal_explain.png)

***docker create hello-world*** : This will create a container and will return the container id.

***docker start -a <continaer_id>*** will run the container ***-a*** helps or makes docker watch for output from the container and print it out the terminal. By default ***docker start*** will only print the container id and output will be printed.

### Restarting a stopped container :
To run a container which is already exited , firstly run ***docker ps --all*** , which will return the details of all containers.

Then run ***dockeer start -a <container_id>*** to run the container.

**NOTE** : we can't overide the default commant of already exited container.
![alt text](./assets/docker_restart.png)

### To remove stopped containers:
***docker system prune***: this will remove all the stopped container and also the download images and will free up the space.

### Retrieving Output Logs: 
***docker logs <container_id>***: this command will return the logs of the already exited container. Note: This command will not rerunning or restarting the container.

### Stopping Containers :
For this We have two commands
- ***docker stop <container_id>***
- ***docker kill <container_id>***

**docker stop :** This command will  stop the container after processing all the request and then it will close. **Note :** If container didn't get stopped in 10 Sec then it will automatically run ***docker kill*** command.

**docker kill :** This command will instaneously stop the container forcefully without waiting for system process and saving processes.

### Redis / (Executing commands in running containers) 
***docker run redis :*** it will start  intance of container if available if not available then it will download and run it.

![alt text](./assets/docker_container.png)

>After running redis instance run the below command to use redis :
>
> ***docker exec -it <conatiner_id> redis-cli*** 
>
>now redis terminal get started
>
>***set myvalue 5*** (for setting value in myvalue variable)          
>***get myvalue*** (for getting value from myvalue variable)
>

### The purpose of it flag
- When we are running docker in our machine every single container we are running is running inside a virtual machine running on linux. so these processes are being executed inside our linux world, even if we are o n **mac** or  **window**

![alt text](./assets/linux_docker.png)

**Explanation of above diagram:**      
- Every proces we create in linux has three channels attached to it. These channels are used to communicate information in to the process or out of the process .
    - STDIN : It is used to communicate infomation into the process.
    - STDOUT : It is used to convey the information that is comming outside the process. This is redirected over to the our running terminal that is gone end up after showing the infomation to the screen.       
    - STDERR: It conveys infomation out of the process that is like error in nature , so if redis-cli has some error that will be communicated outside the world over the standard error channel. 

***Now what's the relation b/w __it__ flag***
> The -it flag is combination of 2 different flags i.e ***-i*** and ***-t***      
> ***-i :*** command means when we execute the new commands inside the container we want to attach our terminal to the **STDIN** channel of the new running process.     
> ***-t :*** flag is that what makes the text look little bit preety,(In reality it's doing more then that) withou **-t** there is no indentation , no autocomplete it's just the raw information. 

### Getting a command prompt in a container.
To run command inside a container without everytime using ***docker exec*** again and again. we will use the command :  

> ***docker exec -it <container_id> sh***   
> After running this there is no need to run ***docker exec*** command again .

**What is sh ?**
![alt text](./assets/sh.png)

**sh** is a name of program that is being executed inside of the container.  
It is a command processor or shell , something that allow us to types command in and have them executed inside that containers.

### Starting with a shell :

***docker run -it busybox sh :*** the downside to run this command with sh is that you can't run another process .

### Creating docker images :
![alt text](./assets/creating_docker.png)
**Docker File :** is a plain text file that is going to have a couple of line of configurations inside of it . This configuation defines how our container should behave or specifically what different programs it's going to contain and what it does when it start's up as container.

**Inside Every docker file we have following things:**

![alt text](./assets/creating_dockerFile.png) 

### Building a docker file
In this we will create an image that runs **redis-server**
[This project is available in this repo in docker > projects > redis-image]

**Now run this run command ***docker build .*** from the file where it is place**

### Dockerfile teardown (i.e explaining what we have done above to make docker file)
![alt text](./assets/docker_file_create_cmd.png)

### Base image :
    To understand this firtly we'll see the lit bit of analogy i.e
    writing a docker file is just similar to being a computer with no os and being told to install chrome.

![alt text](./assets/os_relative_to_baseImage.png)

By default when we create an image we have an empty image, there is nothing there.  
So the purpose of specifying the base image is a kind of give us intial starting point or intial set of programs we can used to further customize. [THAT IS THE PURPOSE OF FIRST LINE I.E FROM alpine]
i.e we say we want to use the **Alpine** docker image as kind of intial operating system or a starting point for the image we are creating

**Why did we use alpine ?**
![alt text](./assets/answer_why_alpine.png)

In short , we just made use of alpine as a base image as kind of like an operating system, becuse it includes differrent set of programs that is very useful for what we want to accomplished i.e we are trying to install and run **redis**.

Alpine base image has a set of programs inside it that are very useful for installing and running redis.

The command use to install redis is :  ***RUN apk add --update redis***. This is not the docker command and has nothing to do with docker. **apk** is appche packag manager that comes preinstalled on the **alpine** image that we can use this package manager built into alpine to automatically, download and install the redis for us.

### The build process in Detail
> will makes notes later [557]

**Brief explaiation pic**
![alt text](./assets/docker_build_brief.png)

### Rebuilds with cache :
Docker behinds the scene uses cache mechanism while building image which will make it more performant. - [559]

### Tagging an image :
we build image from docker file using ***docker build .*** command which in returns gives **image id**. we create the container of the created image with the help of the image id we get using the command ***docker run <image_id>***  

so we can change the process of creating conatianer using image id of our custom image with the slightly different syntax called **tagging**

![alt text](./assets/docker_tagging.png)

**Below is the syntax explanation**

![alt text](./assets/tagging_explanation.png)

to run the image after tagging the command is :   
***docker run docker.io/varunbakshi238/redis:lastest***

### Manual Image Generation with docker commit (JUST FOR KNOWLEDGE / INTERESTED TO KNOW)
we know we use **Image** to build container , but previously we see that can also use container to build image, so basically we can manually make container run some commands inside of it and change file system inside it and generates some useful image and can use it some future point of time. 
```
    Series of commands to achieve this is :
    1. docker run -it alpine sh  // this will starts the command line or prompt inside the alpine image container
    2. apk add --update redis
    3. docker ps  // to get the id of running alpine container
    4. docker commit -c 'CMD ["redis-server"]' <container_id>
    5. docker run <image_id> // id we get from the result of previous command    

```
### NodeJS Web app :

Nodejs app name **simpleweb** is placed at tools > docker > projects > simpleweb

![alt text](./assets/docker-simple-web-app.png)

```
FROM node:alpine // code line from simpleweb
Here ALPINE is not the base image, basically alpine is a term in a docker world for an image which is small and compatible, so we can say alpine is version of image.
 
```

### A Few Missing Files :
![alt text](./assets/package-json-missing.png)

In above simple app as per diagram we will get error at npm  install as package.json file is not found becaue in container only **Node** image is there. That is other files are completely segmented of i.e they are complpetely available, so now we have to make available the **package.json** available in the container.

### Copy build files :
To solve above problem i.e using  package.json file inside docker file we will use **COPY** command.
![alt text](./assets/copy-command.png)

Here first path is relative to the build context which is **simpleweb** project and second path is of container.

Here it simply defines to copy the fils from relative directory path to docker file.

### Container port forwarding
After all above steps and even after running it you will get error **The site can't be reached**.

![alt text](./assets/whyPortForwarding.png)

in this all the request coming to localhost can't react to the container, but vice versa is possible i.e docker container can reach outside the world to perform the operations like above **npm install**. so to acheive the way to reach the container port from localhost we need to use the concept **Port Forwarding** ,while using **docker run command**.
 
**Port forwarding** is not a change going to make to the docker file, we donot set portforwarding inside the docker file, portforwarding stuff is strictly a run time constraints

![alt text](./assets/port-forwarding.png)

### Specifying a working directory

***docker run -it docker.io/rajanbakshi/simpleweb sh*** : This command will start the shell with the help of which we can run commands in the container.   
Inside of this with help of command ***ls*** we can print all the files and folders. In the root directory we will find the projects files are placed along the other files of containers.   
This situatiion is definately not good because we can accidentally override the files and folder with the existing one inside the container.

To resolve this issue we will change litle bit in the docker file and rather then copying everything directly into the root project directory, we will copy it into nested directory instead 
Below command is used to copy the project in nested directory.
![alt text](./assets/workdir_command.png)

After adding run this run command to build:
***docker build -t docker.io/rajanbakshi/simpleweb .***

To start the container run the command:
***docker run -p 8080:8080 docker.io/rajanbakshi/simpleweb***

To see the file structure run following command to see file structure.
```
    docker ps // to get list of all container
    docker exec -it <container_id> sh
```


### Summary of commands:
![alt text](./assets/cmds_summary.png)

569 completed