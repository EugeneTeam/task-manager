import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';

export class MainModule {
  private app: INestApplication;
  private module: TestingModule;

  private async _createAppModule(): Promise<void> {
    this.module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    this.app = this.module.createNestApplication();
    await this.app.init();
  }

  public async getApp(): Promise<INestApplication> {
    if (this.app) return this.app;
    await this._createAppModule();

    return this.app;
  }

  public async getModule(): Promise<TestingModule> {
    if (this.module) return this.module;
    await this._createAppModule();

    return this.module;
  }

  public async close(): Promise<void> {
    if (this.app) {
      await this.app.close();
    }
  }
}

export const mainModule = new MainModule();
