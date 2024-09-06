import { DataSource, DataSourceOptions } from 'typeorm';
import { configService } from './src/common/services/config.service';

const config = configService.getTypeORMOptions();

export const connectionSource = new DataSource(config as DataSourceOptions);
