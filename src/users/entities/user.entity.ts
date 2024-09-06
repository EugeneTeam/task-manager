import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { LENGTH_CONSTRAINT } from '../../common/constraints/length.constraints';
import { UserStatusesEnum } from '../enums/user-statuses.enum';
import { BaseEntity } from '../../common/entities/base.entity';
import { IUser } from '../interfaces/user.interface';
import { TABLE_NAMES } from '../../common/constants/table-names.constants';

@Entity(TABLE_NAMES.USERS)
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: LENGTH_CONSTRAINT.FIRST_NAME,
    nullable: false,
  })
  first_name: string;

  @Column({
    type: 'varchar',
    length: LENGTH_CONSTRAINT.LAST_NAME,
    nullable: false,
  })
  last_name: string;

  @Column({
    type: 'varchar',
    length: LENGTH_CONSTRAINT.EMAIL,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'int2',
    default: UserStatusesEnum.inactive,
    nullable: false,
  })
  status: UserStatusesEnum;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  password_hash: string;
}
