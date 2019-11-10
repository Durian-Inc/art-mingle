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
const stream_1 = require("stream");
let EventCreateInput = class EventCreateInput {
};
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], EventCreateInput.prototype, "eventTitle", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Date)
], EventCreateInput.prototype, "dateHosted", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", Date)
], EventCreateInput.prototype, "dateExpire", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], EventCreateInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], EventCreateInput.prototype, "location", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], EventCreateInput.prototype, "flierLink", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], EventCreateInput.prototype, "eventLink", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], EventCreateInput.prototype, "hostSig", void 0);
EventCreateInput = __decorate([
    type_graphql_1.InputType()
], EventCreateInput);
exports.EventCreateInput = EventCreateInput;
let EventUpdateInput = class EventUpdateInput {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], EventUpdateInput.prototype, "eventTitle", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], EventUpdateInput.prototype, "dateHosted", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Date)
], EventUpdateInput.prototype, "dateExpire", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], EventUpdateInput.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], EventUpdateInput.prototype, "location", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], EventUpdateInput.prototype, "flierLink", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], EventUpdateInput.prototype, "eventLink", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], EventUpdateInput.prototype, "hostSig", void 0);
EventUpdateInput = __decorate([
    type_graphql_1.InputType()
], EventUpdateInput);
exports.EventUpdateInput = EventUpdateInput;
let EventDeletePayload = class EventDeletePayload {
};
__decorate([
    type_graphql_1.Field({ nullable: true }),
    __metadata("design:type", Number)
], EventDeletePayload.prototype, "id", void 0);
EventDeletePayload = __decorate([
    type_graphql_1.ObjectType()
], EventDeletePayload);
exports.EventDeletePayload = EventDeletePayload;
class File {
}
__decorate([
    type_graphql_1.Field(() => stream_1.Readable),
    __metadata("design:type", Function)
], File.prototype, "createReadStream", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], File.prototype, "filename", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], File.prototype, "mimetype", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], File.prototype, "encoding", void 0);
exports.File = File;
