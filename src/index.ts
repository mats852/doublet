export default function doublet<Arg, R>(cb: Callback<Arg, R>, ...args: Array<Arg>): Result<R> | Promise<Result<R>> {
  try {
    const result: R = cb(...args);

    if (result instanceof Promise) {
      return result
        .then((rx) => [null, rx])
        .catch((error) => [error, null]) as Promise<Result<R>>;
    }

    return [null, result];
  } catch (error) {
    return [error, null];
  }
}
