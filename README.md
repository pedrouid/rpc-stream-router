# rpc-stream-router

RPC Stream Router

## Install

```sh
npm install --save rpc-stream-router

# OR

yarn add rpc-stream-router
```

## Setup

```typescript
import { RpcStreamRouter } from 'rpc-stream-router';

const rpcRouter = new RpcStreamRouter(rpcStream);

const result = await rpcRouter.send(payload);
```

## Typings

```typescript
export type JsonRpcRequest = {
  id: number;
  jsonrpc: string;
  method: string;
  params: any;
};

export interface IRpcStream {
  on: (event: string, listener: Listener) => void;
  write: (payload: JsonRpcRequest) => void;
}

export interface IRpcStreamRouter {
  send: (payload: JsonRpcRequest) => Promise<any>;
}
```
