type Result<R> = [Error, null] | [null, R];

type Callback<Arg, R> = (...args: Array<Arg>) => R;
