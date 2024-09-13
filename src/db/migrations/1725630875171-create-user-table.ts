import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTabled1725630875171 implements MigrationInterface {
  name = 'CreateUserTabled1725630875171';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("created_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "id" SERIAL NOT NULL, "first_name" character varying(40) NOT NULL, "last_name" character varying(40) NOT NULL, "email" character varying(50) NOT NULL, "status" smallint NOT NULL DEFAULT '1', "password_hash" character varying NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
