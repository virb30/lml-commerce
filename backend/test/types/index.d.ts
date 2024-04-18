declare namespace jest {
  interface Matchers<R> {
    toThrowErrorTypeWithMessage(
      type:
        | (new (...args: any[]) => { message: string })
        | (abstract new (...args: any[]) => { message: string })
        | ((...args: any[]) => { message: string }),
      message: string,
    ): R;
  }
}
