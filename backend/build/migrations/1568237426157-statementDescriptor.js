"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../lib/products");
class statementDescriptor1568237426157 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" ADD "statementDescriptor" character varying(17)`);
        await queryRunner.query(`UPDATE "product" SET "statementDescriptor"='MEMBERSHIP' WHERE tag='${products_1.YEARLY_MEMBERSHIP.tag}'`);
        await queryRunner.query(`UPDATE "product" SET "statementDescriptor"='MEMBERSHIP' WHERE tag='${products_1.SEMESTERLY_MEMBERSHIP.tag}'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "statementDescriptor"`);
    }
}
exports.statementDescriptor1568237426157 = statementDescriptor1568237426157;
