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
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Sig_1 = require("../Sig");
const User_1 = require("../User");
let Event = class Event extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Event.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn({
        readonly: true
    }),
    __metadata("design:type", Date)
], Event.prototype, "dateCreated", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Event.prototype, "dateHosted", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Event.prototype, "dateExpire", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.createdEvents, {
        lazy: true,
        nullable: false
    }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", Object)
], Event.prototype, "creator", void 0);
__decorate([
    type_graphql_1.Field(() => Sig_1.Sig),
    typeorm_1.ManyToOne(() => Sig_1.Sig, (sig) => sig.hostedEvents, {
        lazy: true,
        nullable: false
    }),
    typeorm_1.JoinTable(),
    __metadata("design:type", Object)
], Event.prototype, "hostSig", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Event.prototype, "eventTitle", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Event.prototype, "location", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({
        nullable: true
    }),
    __metadata("design:type", String)
], Event.prototype, "flierLink", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({
        nullable: true
    }),
    __metadata("design:type", String)
], Event.prototype, "eventLink", void 0);
Event = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Event);
exports.Event = Event;
