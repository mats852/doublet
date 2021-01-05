type Result<R> = [Error, null] | [null, R];

type Callback = (...args: any) => any;

type MaybeAsyncResult<R> = R extends Promise<infer U> ? Promise<Result<U>> : Result<R>
