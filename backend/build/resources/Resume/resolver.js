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
const fileType = __importStar(require("file-type"));
const graphql_upload_1 = require("graphql-upload");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const files_1 = require("../../lib/files");
const User_1 = require("../User");
const entity_1 = require("./entity");
const input_1 = require("./input");
const deleteResumeHelper = async (resume) => {
    await files_1.deleteFile(resume.url);
    await resume.remove();
};
let ResumeResolver = class ResumeResolver {
    constructor() {
        this.resumeRepo = typeorm_1.getConnection().getRepository(entity_1.Resume);
    }
    async deleteResume(context) {
        const user = context.state.user;
        if (!user) {
            throw new apollo_server_1.AuthenticationError("Please login to access this resource.");
        }
        const oldResume = await user.resume;
        if (oldResume) {
            await deleteResumeHelper(oldResume);
        }
        return user.resume;
    }
    async uploadResume(context, resume, graduationDate, firstName, lastName) {
        const user = context.state.user;
        if (!user) {
            throw new apollo_server_1.AuthenticationError("Please login to access this resource.");
        }
        const passthrough = await fileType.stream(resume.createReadStream());
        if (!passthrough.fileType || passthrough.fileType.ext !== "pdf") {
            throw new apollo_server_1.UserInputError("Error when parsing user input", {
                resume: "File uploaded was not detected as PDF. Contact acm@mst.edu if you believe this is a mistake."
            });
        }
        const oldResume = await user.resume;
        if (oldResume) {
            await deleteResumeHelper(oldResume);
        }
        const id = uuid_1.v4();
        const filename = `${id}.pdf`;
        const url = await files_1.uploadFile(resume.createReadStream(), `resumes/${filename}`, "application/pdf");
        user.graduationDate = graduationDate;
        user.firstName = firstName;
        user.lastName = lastName;
        const userResume = this.resumeRepo.create({
            id,
            url
        });
        user.resume = userResume;
        await user.save();
        return userResume.save();
    }
    async resumes() {
        return this.resumeRepo.find();
    }
};
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation(() => User_1.User),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ResumeResolver.prototype, "deleteResume", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.Mutation(() => entity_1.Resume),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("resume", () => graphql_upload_1.GraphQLUpload)),
    __param(2, type_graphql_1.Arg("graduationDate", () => Date)),
    __param(3, type_graphql_1.Arg("firstName", () => String)),
    __param(4, type_graphql_1.Arg("lastName", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, input_1.File,
        Date, String, String]),
    __metadata("design:returntype", Promise)
], ResumeResolver.prototype, "uploadResume", null);
__decorate([
    type_graphql_1.Authorized("view:resumes"),
    type_graphql_1.Query(() => [entity_1.Resume]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ResumeResolver.prototype, "resumes", null);
ResumeResolver = __decorate([
    type_graphql_1.Resolver(() => entity_1.Resume)
], ResumeResolver);
exports.ResumeResolver = ResumeResolver;
