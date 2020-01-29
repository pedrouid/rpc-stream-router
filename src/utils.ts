export function isJsonRpcResponseSuccess(object: any) {
  return typeof object.result !== 'undefined';
}

export function isJsonRpcResponseError(object: any) {
  return typeof object.error !== 'undefined';
}
