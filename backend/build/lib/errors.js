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
const apollo_server_1 = require("apollo-server");
var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes["INTERNAL_SERVER_ERROR"] = "INTERNAL_SERVER_ERROR";
    ErrorCodes["RESOURCE_NOT_FOUND"] = "RESOURCE_NOT_FOUND";
    ErrorCodes["UNAUTHENTICATED"] = "UNATHENTICATED";
    ErrorCodes["BAD_USER_INPUT"] = "BAD_USER_INPUT";
})(ErrorCodes || (ErrorCodes = {}));
type_graphql_1.registerEnumType(ErrorCodes, {
    description: "The potential errors codes that will be sent to a user.",
    name: "ErrorCodes"
});
let Extension = class Extension {
};
__decorate([
    type_graphql_1.Field(() => ErrorCodes),
    __metadata("design:type", String)
], Extension.prototype, "code", void 0);
Extension = __decorate([
    type_graphql_1.ObjectType()
], Extension);
exports.Extension = Extension;
class NotFoundError extends apollo_server_1.ApolloError {
    constructor(id) {
        super(`Could not find resource with ID ${id}.`, ErrorCodes.RESOURCE_NOT_FOUND);
    }
}
exports.NotFoundError = NotFoundError;
class BadUserInputError extends apollo_server_1.ApolloError {
    constructor(message) {
        super(message, ErrorCodes.BAD_USER_INPUT);
    }
}
exports.BadUserInputError = BadUserInputError;
