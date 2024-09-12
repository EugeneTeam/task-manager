import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import * as process from 'node:process';

@Injectable()
export class DbUtils {
  constructor(@InjectDataSource() private readonly _dataSource: DataSource) {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('NOT AVAILABLE NODE_ENV');
    }
  }

  public async clear(): Promise<void> {
    const queryRunner = this._dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const tables = await queryRunner.query(
        `SELECT tablename FROM pg_tables WHERE schemaname='public'`,
      );
      for (const table of tables) {
        await queryRunner.query(
          `TRUNCATE TABLE "${table.tablename}" RESTART IDENTITY CASCADE`,
        );
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async clearTables(tables: string[]): Promise<void> {
    const queryRunner = this._dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const table of tables) {
        await queryRunner.query(
          `TRUNCATE TABLE "${table}" RESTART IDENTITY CASCADE`,
        );
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
