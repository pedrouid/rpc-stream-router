import { RpcStreamRouter, JsonRpcRequest } from '../src';
import { MockRpcStream } from './mocks';
import { formatTestMessage } from './helpers';

describe('RpcStreamRouter', () => {
  let rpcRouter: RpcStreamRouter;

  beforeEach(() => {
    const rpcStream = new MockRpcStream();
    rpcRouter = new RpcStreamRouter(rpcStream);
  });
  it('should succesfully receive JSON-RPC response', async () => {
    const payload: JsonRpcRequest = {
      id: Date.now(),
      jsonrpc: '2.0',
      method: 'test_method',
      params: [],
    };
    const result = await rpcRouter.send(payload);
    expect(result.message).toBeTruthy();
    expect(result.message).toEqual(formatTestMessage(payload));
  });
});
