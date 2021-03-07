# gRPC Data Stream To Client

This is a **PoC** for testing grpc's usability with **VueJs** (with TypeScript) client and **.Net 5** server


## Prerequisites

- [.Net 5 SDK](https://dotnet.microsoft.com/download/dotnet/5.0)
- [Visual Studio 2019](https://visualstudio.microsoft.com/tr/vs/community/)
- NodeJs or NPM (Can install with Visual Studio)
- [VueJS](https://vuejs.org/v2/guide/installation.html)
- [protoc](https://github.com/protocolbuffers/protobuf/releases) (For compiling proto files) 
- [grpc-web](https://github.com/grpc/grpc-web) (For compilig proto files to js & d.ts files)
- [Docker](https://www.docker.com/products/docker-desktop) (Used for runnig service & proxy)

## Getting Started

Please read related documents about [gRPC](https://grpc.io/docs/what-is-grpc/introduction/) for further information.  

For a typical .net developer, we can say proto files are basically as interfaces. But .net is not natively support proto files, so this is why proto files need to be compiled to C# code. Visual Studio 19 handles this internally with using [grpc tools](https://www.nuget.org/packages/Grpc.Tools/), for working with grpc and .net please read the [microsoft docs](https://docs.microsoft.com/en-us/aspnet/core/tutorials/grpc/grpc-start?view=aspnetcore-5.0&tabs=visual-studio).

For using grpc with web frameworks we need to use [grpc-web](https://github.com/grpc/grpc-web) cause we genrally use js or typescript files at frontend code and protoc can not support them offically.  

In this PoC, both client and server is in the same solution and we can use server's protp files directly. But if you want to change this please read [grpc-web](https://github.com/grpc/grpc-web)'s documentation for protoc commands for web.   

How it works?
```mermaid
graph LR
A[Vue Client] -- HTTP 1 --> B((Envoy Proxy));
B -- HTTP 2 --> D{.Net Server};
D -- HTTP 2 --> B;
B -- HTTP 1 --> A;
```

## Quick Start

.Net Server is ready to run.
From the solution's root directory run those docker commands:  
```sh
$ docker-compose build
$ docker-compose up
```
To shutdown: `docker-compose down`.