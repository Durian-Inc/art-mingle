"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const Resource_1 = require("../Resource");
const entity_1 = require("./entity");
const input_1 = require("./input");
const resource = entity_1.Sig;
let SigResolver = class SigResolver extends Resource_1.ResourceResolver(resource, input_1.SigCreateInput, input_1.SigUpdateInput, input_1.SigDeletePayload, typeorm_1.getRepository(resource)) {
};
SigResolver = __decorate([
    type_graphql_1.Resolver(() => entity_1.Sig)
], SigResolver);
exports.SigResolver = SigResolver;
