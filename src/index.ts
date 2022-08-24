function isPromiseLike<T>(x: T | Promise<T>): boolean {
  if (x === null || typeof x !== 'object') {
    return false;
  }

  return 'then' in x
    && typeof x.then === 'function'
    && 'catch' in x
    && typeof x.catch === 'function';
}

export default function doublet<TCallback extends Callback>(
  cb: TCallback,
  ...args: Array<Parameters<TCallback>>
): MaybeAsyncResult<ReturnType<TCallback>> {
  try {
    const result = cb(...args);

    if (isPromiseLike(result)) {
      return result
        .then((rx: ReturnType<TCallback>) => [null, rx])
        .catch((error: ReturnType<TCallback>) => [error, null]) as MaybeAsyncResult<ReturnType<TCallback>>;
    }

    return [null, result] as MaybeAsyncResult<ReturnType<TCallback>>;
  } catch (error) {
    return [error, null] as MaybeAsyncResult<ReturnType<TCallback>>;
  }
}
