"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../lib/products");
const DEFAULT_SUB = "google-oauth2|115625753701019295484";
class initialData1567049233839 {
    async up(queryRunner) {
        await queryRunner.query(`INSERT INTO "user" ("sub", "firstName", "lastName", "email", "emailVerified", "isSuperAdmin")
                   VALUES ('${DEFAULT_SUB}', 'MST', 'ACM', 'acm@mst.edu', true, true)`);
        await queryRunner.query(`INSERT INTO "product" ("tag", "displayName", "description", "price")
                      VALUES ('${products_1.SEMESTERLY_MEMBERSHIP.tag}', 'ACM Semesterly Membership', 'ACM Membership purchase for a single semester (6 months).', 11),
                             ('${products_1.YEARLY_MEMBERSHIP.tag}', 'ACM Yearly Membership', 'ACM Membership purchase for a single year (12 months).', 20)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM "user" where sub='${DEFAULT_SUB}'`);
        await queryRunner.query(`DELETE FROM "product" where tag='${products_1.SEMESTERLY_MEMBERSHIP.tag}'`);
        await queryRunner.query(`DELETE FROM "product" where tag='${products_1.YEARLY_MEMBERSHIP.tag}'`);
    }
}
exports.initialData1567049233839 = initialData1567049233839;
