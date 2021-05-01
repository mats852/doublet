/* eslint-disable */

type Callback = (...args: any) => any;

type Result<R> = [Error, null] | [null, R];

type MaybeAsyncResult<R> = R extends Promise<infer U> ? Promise<Result<U>> : Result<R>;

declare module 'doublet' {
  export default function doublet<TCallback extends Callback>(cb: TCallback, ...args: Parameters<TCallback>): MaybeAsyncResult<ReturnType<TCallback>>;
}
