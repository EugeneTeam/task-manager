import 'reflect-metadata';
import { replaceSpecialSymbol } from '../utils/replace-special-symbol.util';

export function NormalizeInputParams<R>(fields?: (keyof R)[]) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      // todo check

      // if string
      if (args[0] && typeof args[0] === 'string') {
        args[0] = replaceSpecialSymbol(args[0]);
      }

      // if object
      if (args[0] && typeof args[0] === 'object') {
        const params = args[0];
        (fields || Object.keys(params)).forEach((field) => {
          if (params[field]) {
            params[field] = replaceSpecialSymbol(params[field]);
          }
        });
      }

      return originalMethod.apply(this, args);
    };
  };
}
