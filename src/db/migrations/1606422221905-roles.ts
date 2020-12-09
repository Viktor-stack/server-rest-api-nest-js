import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export class roles1606422221905 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO role (_id, roleName) values( '${uuidv4()}', 'Super Admin')`);
    await queryRunner.query(`INSERT INTO role (_id, roleName) values( '${uuidv4()}', 'Admin')`);
    await queryRunner.query(`INSERT INTO role (_id, roleName) values( '${uuidv4()}', 'User')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }

}
