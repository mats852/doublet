type Result<R> = [Error | null, R?];

interface Callback {
  <Arg, R>(...a: Array<Arg>): R
}
