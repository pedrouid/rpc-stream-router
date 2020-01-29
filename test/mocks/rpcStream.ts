import { EventEmitter } from 'events';
import { IRpcStream, JsonRpcRequest } from '../../src';
import { formatTestMessage } from '../helpers';

export class MockRpcStream extends EventEmitter implements IRpcStream {
  write(payload: JsonRpcRequest): void {
    const response = {
      id: payload.id,
      result: {
        message: formatTestMessage(payload),
      },
    };
    setTimeout(() => {
      this.emit('data', response);
    }, 1000);
  }
}
