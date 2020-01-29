export type JsonRpcRequest = {
  id: number;
  jsonrpc: string;
  method: string;
  params: any;
};

export type Listener = (...args: any[]) => void;

export interface IPromisesMap {
  [id: number]: { resolve: (res: any) => void; reject: (err: any) => void };
}

export interface IRpcStream {
  on: (event: string, listener: Listener) => void;
  write: (payload: JsonRpcRequest) => void;
}

export interface IRpcStreamRouter {
  send: (payload: JsonRpcRequest) => Promise<any>;
}
