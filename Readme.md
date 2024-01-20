# Adeeb


## How to start the Application

**First:** generate Protobuf for each node

To generate Adeeb pb:

```ssh
$ cd adeeb

$ npm run pb:generate
```

to generate users-service pb, run from root dir:

```ssh
$ rm -rf users-service/pb && protoc --go_out=. --go-grpc_out=. proto/services.proto
```

if you have a problem with GO_PATH, try:

```ssh
$ export GO_PATH=~/go

$ export PATH=$PATH:/$GO_PATH/bin
```

**Secondly:** Generate JWT keys:

```ssh
$ openssl genrsa -out jwtRSA256-private.pem 2048

$ openssl rsa -in jwtRSA256-private.pem -pubout -outform PEM -out jwtRSA256-public.pem
```

**Finally:** run docker-compose

```ssh
$ docker-compose build

$ docker-compose up
```