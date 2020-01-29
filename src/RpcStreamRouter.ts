import { EventEmitter } from 'events';
import { isJsonRpcResponseError, isJsonRpcResponseSuccess } from './utils';
import {
  JsonRpcRequest,
  IPromisesMap,
  IRpcStream,
  IRpcStreamRouter,
} from './types';

export class RpcStreamRouter extends EventEmitter implements IRpcStreamRouter {
  private rpcStream: IRpcStream;
  private promises: IPromisesMap = {};

  constructor(rpcStream: IRpcStream) {
    super();
    this.rpcStream = rpcStream;
    this.rpcStream.on('data', payload => this.onPayload(payload));
  }

  private async onPayload(payload: any) {
    const { id } = payload;
    if (typeof id !== 'undefined') {
      if (this.promises[id]) {
        if (isJsonRpcResponseError(payload)) {
          this.promises[id].reject(payload.error);
        } else if (isJsonRpcResponseSuccess(payload)) {
          this.promises[id].resolve(payload.result);
        }
        delete this.promises[id];
      }
    }
  }

  public send(payload: JsonRpcRequest): Promise<any> {
    const promise: Promise<any> = new Promise((resolve, reject) => {
      this.promises[payload.id] = { resolve, reject };
    });
    this.rpcStream.write(payload);
    return promise;
  }
}
