"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const User_1 = require("../User");
let Resume = class Resume extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.Index({ unique: true }),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Resume.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Resume.prototype, "url", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Resume.prototype, "added", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typeorm_1.OneToOne(() => User_1.User, (user) => user.resume, {
        lazy: true,
        onDelete: "SET NULL"
    }),
    __metadata("design:type", Object)
], Resume.prototype, "user", void 0);
Resume = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Resume);
exports.Resume = Resume;
