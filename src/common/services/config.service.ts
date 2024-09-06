import { config } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

config({
  path: `./env/.env.${process.env.NODE_ENV || 'development'}`,
});

export class ConfigService {
  public getBasicAuthOptions() {
    return {
      challenge: true,
      users: {
        [this._checkKeyAndGetValue('SWAGGER_USER')]:
          this._checkKeyAndGetValue('SWAGGER_PASSWORD'),
      },
    };
  }

  public getTypeORMOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this._checkKeyAndGetValue('DB_HOST'),
      port: parseInt(this._checkKeyAndGetValue('DB_PORT'), 10),
      username: this._checkKeyAndGetValue('DB_USERNAME'),
      password: this._checkKeyAndGetValue('DB_PASSWORD'),
      database: this._checkKeyAndGetValue('DB_NAME'),
    };
  }

  public getAppPort(): number {
    const port = this._checkKeyAndGetValue('APP_PORT');

    return parseInt(port, 10);
  }

  private _checkKeyAndGetValue(key: string, skipError = false): string {
    const value = process.env[key];

    if (!value && !skipError) {
      throw new Error(`Unknown env variable ${key}`);
    }

    return value;
  }
}

const configService = new ConfigService();

export { configService };
