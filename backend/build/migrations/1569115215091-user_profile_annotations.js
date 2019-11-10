"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class userProfileAnnotations1569115215091 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "profilePictureUrl" character varying NOT NULL DEFAULT 'https://www.gravatar.com/avatar/?d=identicon&s=140'`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "graduationDate" TIMESTAMP`, undefined);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "graduationDate"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profilePictureUrl"`, undefined);
    }
}
exports.userProfileAnnotations1569115215091 = userProfileAnnotations1569115215091;
