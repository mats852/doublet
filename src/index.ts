function isPromiseLike(x: unknown): x is Promise<unknown> {
  return x != null
    && typeof x === 'object'
    && 'then' in x
    && typeof (x as { then: unknown }).then === 'function'
    && 'catch' in x
    && typeof (x as { catch: unknown }).catch === 'function';
}

export default function doublet<TCallback extends Callback>(
  cb: TCallback,
  ...args: Parameters<TCallback>
): MaybeAsyncResult<ReturnType<TCallback>> {
  try {
    const result = cb(...(args as Array<unknown>));

    if (isPromiseLike(result)) {
      return result
        .then((rx) => [null, rx])
        .catch((error) => [error, null]) as MaybeAsyncResult<ReturnType<TCallback>>;
    }

    return [null, result] as MaybeAsyncResult<ReturnType<TCallback>>;
  } catch (error) {
    return [error, null] as MaybeAsyncResult<ReturnType<TCallback>>;
  }
}
