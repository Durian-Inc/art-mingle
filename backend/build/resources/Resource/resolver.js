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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const typedi_1 = require("typedi");
function ResourceResolver(ResourceCls, CreateCls, UpdateCls, DeleteCls, repository) {
    const resourceName = ResourceCls.name.toLocaleLowerCase();
    const firstLetter = resourceName[0];
    const resourceCamelCase = firstLetter.toUpperCase() + resourceName.slice(1);
    let ResourceResolverClass = class ResourceResolverClass {
        async create(input) {
            const resource = repository.create({ ...input });
            return resource.save();
        }
        async update(id, input) {
            const resource = await repository.findOneOrFail(id);
            const updatedResource = repository.merge(resource, { ...input });
            return updatedResource.save();
        }
        async remove(id) {
            await repository.delete(id);
            return { id };
        }
        async getOne(id) {
            return repository.findOneOrFail({ id });
        }
        async getAll() {
            return repository.find();
        }
    };
    __decorate([
        type_graphql_1.Mutation(() => ResourceCls, {
            name: `create${resourceCamelCase}`
        }),
        __param(0, type_graphql_1.Arg(`data`, () => CreateCls)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", Promise)
    ], ResourceResolverClass.prototype, "create", null);
    __decorate([
        type_graphql_1.Mutation(() => ResourceCls, {
            name: `update${resourceCamelCase}`
        }),
        __param(0, type_graphql_1.Arg("id", () => String)),
        __param(1, type_graphql_1.Arg(`data`, () => UpdateCls)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", Promise)
    ], ResourceResolverClass.prototype, "update", null);
    __decorate([
        type_graphql_1.Mutation(() => DeleteCls, {
            name: `delete${resourceCamelCase}`
        }),
        __param(0, type_graphql_1.Arg("id", () => String)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], ResourceResolverClass.prototype, "remove", null);
    __decorate([
        type_graphql_1.Query(() => ResourceCls, { name: `${resourceName}` }),
        __param(0, type_graphql_1.Arg("id", () => String)),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", Promise)
    ], ResourceResolverClass.prototype, "getOne", null);
    __decorate([
        type_graphql_1.Query(() => [ResourceCls], { name: `${resourceName}s` }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], ResourceResolverClass.prototype, "getAll", null);
    ResourceResolverClass = __decorate([
        type_graphql_1.Resolver(() => ResourceCls, { isAbstract: true }),
        typedi_1.Service()
    ], ResourceResolverClass);
    return ResourceResolverClass;
}
exports.ResourceResolver = ResourceResolver;
