const getMessage = (error: any, type: any, message: string): string => {
  if (!(error instanceof type)) {
    return `Expected to throw ${type.name}.\n${error.name} received.`;
  }

  if (error.message !== message) {
    return `Expected Error message to be ${message}.\n${error.message} received.`;
  }

  return "";
};

export function toThrowErrorTypeWithMessage(callbackOrPromiseReturn, type: any, message: string) {
  // @ts-expect-error
  const isFromReject = this && this.promise === "rejects";

  let error;
  if (isFromReject) {
    error = callbackOrPromiseReturn;
  } else {
    try {
      callbackOrPromiseReturn();
    } catch (e) {
      error = e;
    }
  }

  if (!error) {
    return { pass: false, message: () => "Expected error not throwed" };
  }

  const pass = error instanceof type && error.message === message;
  return { pass, message: () => getMessage(error, type, message) };
}

expect.extend({ toThrowErrorTypeWithMessage });
