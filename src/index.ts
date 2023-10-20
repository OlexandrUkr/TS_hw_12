function DeprecatedMethod<T, A extends any[], R>(reason: string, methodName?: string) {
  return function (target: T, propertyKey: string, descriptor: TypedPropertyDescriptor<(...args: A) => R>) {
    if (typeof descriptor.value !== 'function') {
      throw new Error('Method-only decorator');
    }

    const originalMethod = descriptor.value;

    descriptor.value = function (...args: A): R {
      console.log(`${propertyKey} - is deprecated. Reason: ${reason}`);
      if (methodName) {
        console.log(`Please use method: ${methodName}`);
      }

      return originalMethod.apply(this, args);
    };
  };
}

function MinLength(min: number) {
  return function (target: any, key: string) {
    let value: string;

    const getter = function () {
      return value;
    };

    const setter = function (newVal: string) {
      if (newVal.length < min) {
        throw new Error(`The minimum length should be ${min}`);
      } else {
        value = newVal;
      }
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

function MaxLength(max: number) {
  return function (target: any, key: string) {
    let value: string;

    const getter = function () {
      return value;
    };

    const setter = function (newVal: string) {
      if (newVal.length > max) {
        throw new Error(`The maximum length should not be more ${max}`);
      } else {
        value = newVal;
      }
    };

    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    });
  };
}

function Email(target: any, key: string) {
  let value: string;

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const getter = function () {
    return value;
  };

  const setter = function (newVal: string) {
    if (!emailPattern.test(newVal)) {
      throw new Error(`Entered email address is not valid`);
    } else {
      value = newVal;
    }
  };

  Object.defineProperty(target, key, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}
