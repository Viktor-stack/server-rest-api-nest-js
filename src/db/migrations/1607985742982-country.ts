import {MigrationInterface, QueryRunner} from "typeorm";
import { v4 as uuidv4 } from 'uuid';

export class country1607985742982 implements MigrationInterface {
    name = 'country1607985742982'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO country (_id, countryName) values( '${uuidv4()}', 'Ukraine')`);
        await queryRunner.query(`INSERT INTO country (_id, countryName) values( '${uuidv4()}', 'Russian')`);
        await queryRunner.query(`INSERT INTO country (_id, countryName) values( '${uuidv4()}', 'USA')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `token` `token` varchar(255) NULL");
    }

}
