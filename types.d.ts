type Result<R> = [Error, null] | [null, R];

interface Callback {
  <Arg, R>(...a: Array<Arg>): R
}
