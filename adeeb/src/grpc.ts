import path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
// Interfaces
import { ProtoGrpcType } from './pb/services';

const PORT = 8080;
const PROTO_FILE = '../../proto/services.proto';

const packageDefinition = protoLoader.loadSync(
  path.resolve(__dirname, PROTO_FILE),
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  },
);
const gRPCObj = grpc.loadPackageDefinition(
  packageDefinition,
) as unknown as ProtoGrpcType;

/**
 * gRPC client, used to access gRPC server and make an RPC request.
 *
 * @remarks
 * For now, it's mainly used to access Users' service in Partner component
 * You can find examples in Partner's controller
 *
 */
export const grpcClient = new gRPCObj.services.Services(
  `users-service:${PORT}`,
  grpc.credentials.createInsecure(),
);

const date = new Date();

/**
 * Used for {@link grpcClient.waitForReady}
 */
export const deadLine = date.setSeconds(date.getSeconds() + 10);
