export default function doublet<Arg, R>(cb: Callback<Arg, R>, ...args: Array<Arg>): MaybeAsyncResult<R> {
  try {
    const result = cb(...args);

    if (result instanceof Promise) {
      return result
        .then((rx) => [null, rx])
        .catch((error) => [error, null]) as MaybeAsyncResult<R>;
    }

    return [null, result] as MaybeAsyncResult<R>;
  } catch (error) {
    return [error, null] as MaybeAsyncResult<R>;
  }
}
