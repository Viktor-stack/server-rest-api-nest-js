import { MigrationInterface, QueryRunner } from 'typeorm';

export class roles1606422221905 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO role (roleName) values('Super Admin')`);
    await queryRunner.query(`INSERT INTO role (roleName) values('Admin')`);
    await queryRunner.query(`INSERT INTO role (roleName) values('User')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
