type Result<R> = [Error, null] | [null, R];

type Callback<Arg, R> = (...args: Array<Arg>) => R;

type MaybeAsyncResult<R> = R extends Promise<infer U> ? Promise<Result<U>> : Result<R>

