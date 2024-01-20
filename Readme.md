# Adeeb


### Generate Protobuf for each node

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