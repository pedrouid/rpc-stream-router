import { JsonRpcRequest } from '../../src';

export function formatTestMessage(payload: JsonRpcRequest) {
  return `Successfully received payload with method ${payload.method}`;
}
