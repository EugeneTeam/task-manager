import * as argon from 'argon2';
import { Options } from 'argon2';

export class BcryptService {
  private static readonly _DEFAULT_OPTIONS: Options = {
    type: argon.argon2i,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  };

  public static async hash(value: string): Promise<string> {
    return argon.hash(value, this._DEFAULT_OPTIONS);
  }

  public static async compare(value: string, hash: string): Promise<boolean> {
    return argon.verify(hash, value);
  }
}
