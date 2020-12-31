type Result<R> = [Error | null, R?];

interface Callback {
  <Arg, R>(...a: Array<Arg>): R
}

export default function doublet<Arg, R>(cb: Callback, ...args: Array<Arg>): Result<R> | Promise<Result<R>> {
  try {
    const result: R = cb(...args);

    if (result instanceof Promise) {
      return result
        .then((rx) => [null, rx])
        .catch((error) => [error]) as Promise<Result<R>>;
    }

    return [null, result];
  } catch (error) {
    return [error];
  }
}
