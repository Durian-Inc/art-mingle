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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const graphql_upload_1 = require("graphql-upload");
const fileType = __importStar(require("file-type"));
const files_1 = require("../../lib/files");
const Sig_1 = require("../Sig");
const entity_1 = require("./entity");
const input_1 = require("./input");
const input_2 = require("./input");
let EventResolver = class EventResolver {
    constructor() {
        this.repository = typeorm_1.getRepository(entity_1.Event);
        this.sigRepository = typeorm_1.getRepository(Sig_1.Sig);
    }
    async deleteEvent(id) {
        const event = await this.repository.findOneOrFail(id);
        if (event.flierLink) {
            files_1.deleteFile(event.flierLink);
        }
        await this.repository.delete(id);
        return { id };
    }
    async updateEvent(id, input, flier) {
        if (!input && !flier) {
            throw new apollo_server_1.UserInputError("Please include either some new information or a flier to edit with.");
        }
        const event = await this.repository.findOneOrFail(id);
        const updates = input || {};
        if (flier) {
            const passthrough = await fileType.stream(flier.createReadStream());
            if (!passthrough.fileType ||
                passthrough.fileType.ext !== "jpg" ||
                passthrough.fileType.mime !== "image/jpeg") {
                throw new apollo_server_1.UserInputError("Error when parsing user input", {
                    flier: "File uploaded was not detected as JPG. Contact acm@mst.edu if you believe this is a mistake."
                });
            }
            const origName = flier.filename.substr(0, flier.filename.lastIndexOf(".")) ||
                flier.filename;
            const encoded = encodeURIComponent(origName.replace(" ", "_"));
            const filename = `events/${encoded}_${event.id}.jpg`;
            const url = await files_1.uploadFile(flier.createReadStream(), filename, "image/jpeg");
            if (event.flierLink) {
                files_1.deleteFile(event.flierLink);
            }
            updates.flierLink = url;
        }
        if (input && input.hostSig) {
            updates.hostSig = await this.sigRepository.findOneOrFail({
                name: String(input.hostSig)
            });
        }
        const updatedResource = this.repository.merge(event, { ...updates });
        return updatedResource.save();
    }
    async createEvent(context, input, flier) {
        const creator = context.state.user;
        if (!creator) {
            throw new apollo_server_1.AuthenticationError("Please login to access this resource.");
        }
        input.hostSig = await this.sigRepository.findOneOrFail({
            name: String(input.hostSig)
        });
        const newResource = await this.repository
            .create({ ...input, creator })
            .save();
        if (flier) {
            const passthrough = await fileType.stream(flier.createReadStream());
            if (!passthrough.fileType ||
                passthrough.fileType.ext !== "jpg" ||
                passthrough.fileType.mime !== "image/jpeg") {
                throw new apollo_server_1.UserInputError("Error when parsing user input", {
                    flier: "File uploaded was not detected as JPG. Contact acm@mst.edu if you believe this is a mistake."
                });
            }
            const origName = flier.filename.substr(0, flier.filename.lastIndexOf(".")) ||
                flier.filename;
            const encoded = encodeURIComponent(origName.replace(" ", "_"));
            const filename = `events/${encoded}_${newResource.id}.jpg`;
            const url = await files_1.uploadFile(flier.createReadStream(), filename, "image/jpeg");
            newResource.flierLink = url;
        }
        return newResource.save();
    }
    async events() {
        return this.repository.find();
    }
    async currentEvents() {
        return this.repository.find({
            where: {
                dateExpire: typeorm_1.MoreThanOrEqual("NOW()")
            }
        });
    }
    async event(id) {
        return this.repository.findOneOrFail({ id });
    }
};
__decorate([
    type_graphql_1.Authorized("delete:events"),
    type_graphql_1.Mutation(() => input_2.EventDeletePayload),
    __param(0, type_graphql_1.Arg("id", () => Number)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "deleteEvent", null);
__decorate([
    type_graphql_1.Authorized("update:events"),
    type_graphql_1.Mutation(() => entity_1.Event),
    __param(0, type_graphql_1.Arg("id", () => Number)),
    __param(1, type_graphql_1.Arg("data", () => input_2.EventUpdateInput, { nullable: true })),
    __param(2, type_graphql_1.Arg("flier", () => graphql_upload_1.GraphQLUpload, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, input_1.File]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "updateEvent", null);
__decorate([
    type_graphql_1.Authorized("create:events"),
    type_graphql_1.Mutation(() => entity_1.Event),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("data", () => input_2.EventCreateInput)),
    __param(2, type_graphql_1.Arg("flier", () => graphql_upload_1.GraphQLUpload, { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, input_1.File]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "createEvent", null);
__decorate([
    type_graphql_1.Query(() => [entity_1.Event]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "events", null);
__decorate([
    type_graphql_1.Query(() => [entity_1.Event]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "currentEvents", null);
__decorate([
    type_graphql_1.Query(() => entity_1.Event),
    __param(0, type_graphql_1.Arg("id", () => Number)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "event", null);
EventResolver = __decorate([
    type_graphql_1.Resolver(() => entity_1.Event)
], EventResolver);
exports.EventResolver = EventResolver;
