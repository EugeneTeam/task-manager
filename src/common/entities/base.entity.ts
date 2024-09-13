import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IBaseEntity } from '../interfaces/base-entity.interface';

export abstract class BaseEntity implements IBaseEntity {
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
