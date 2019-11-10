"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const config_1 = require("../config");
const s3 = new aws_sdk_1.default.S3({
    endpoint: config_1.config.DO_SPACES_ENDPOINT,
    region: config_1.config.DO_SPACES_REGION,
    accessKeyId: config_1.config.DO_SPACES_ACCESS_KEY_ID,
    secretAccessKey: config_1.config.DO_SPACES_SECRET_KEY_ID
});
exports.deleteFile = async (url) => {
    const split_url = url.split(`${config_1.config.DO_SPACES_CDN_BUCKET_NAME}.${config_1.config.DO_SPACES_ENDPOINT}/`);
    const filename = split_url[1];
    await s3
        .deleteObject({ Bucket: config_1.config.DO_SPACES_CDN_BUCKET_NAME, Key: filename })
        .promise();
};
exports.uploadFile = async (stream, filename, contentType) => {
    const response = await s3
        .upload({
        Bucket: config_1.config.DO_SPACES_CDN_BUCKET_NAME,
        Key: filename,
        ACL: "public-read",
        Body: stream,
        ContentType: contentType
    })
        .promise();
    return response.Location;
};
