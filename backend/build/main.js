"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_koa_1 = require("apollo-server-koa");
require("reflect-metadata");
const TypeGraphQL = __importStar(require("type-graphql"));
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
require("./lib/errors");
require("./lib/products");
const app_1 = require("./app");
const auth_1 = require("./lib/auth");
typeorm_1.useContainer(typedi_1.Container);
async function bootstrap() {
    try {
        const connection = await typeorm_1.createConnection();
        await connection.runMigrations();
        if (process.env.NODE_ENV !== "production") {
            await connection.synchronize();
        }
        const schema = await TypeGraphQL.buildSchema({
            authChecker: auth_1.authChecker,
            container: typedi_1.Container,
            resolvers: [`${__dirname}/**/resolver.ts`, `${__dirname}/**/resolver.js`]
        });
        const server = new apollo_server_koa_1.ApolloServer({
            context: ({ ctx }) => ctx,
            schema
        });
        server.applyMiddleware({ app: app_1.app });
        await app_1.app.listen(4000);
        console.log(`Server is running, GraphQL Playground available at:

      http://localhost/graphql || http://localhost:4000/graphql`);
    }
    catch (err) {
        console.error(err);
    }
}
bootstrap();
