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
const Event_1 = require("../Event");
const User_1 = require("../User");
let Sig = class Sig extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Sig.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn({
        readonly: true
    }),
    __metadata("design:type", Date)
], Sig.prototype, "dateFounded", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Sig.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(() => [User_1.User]),
    typeorm_1.ManyToMany(() => User_1.User, (user) => user.sigs, { lazy: true }),
    __metadata("design:type", Object)
], Sig.prototype, "users", void 0);
__decorate([
    type_graphql_1.Field(() => [Event_1.Event]),
    typeorm_1.OneToMany(() => Event_1.Event, (event) => event.hostSig, {
        lazy: true
    }),
    __metadata("design:type", Object)
], Sig.prototype, "hostedEvents", void 0);
Sig = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Sig);
exports.Sig = Sig;
