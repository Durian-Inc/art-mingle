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
const ProductCategory_1 = require("../ProductCategory");
const Purchase_1 = require("../Purchase");
class ColumnNumericTransformer {
    to(data) {
        return data;
    }
    from(data) {
        return parseFloat(data);
    }
}
let Product = class Product extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], Product.prototype, "tag", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "displayName", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field({ nullable: true }),
    typeorm_1.Column({ nullable: true, length: 17 }),
    __metadata("design:type", String)
], Product.prototype, "statementDescriptor", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("numeric", {
        default: 0,
        scale: 2,
        transformer: new ColumnNumericTransformer()
    }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    typeorm_1.OneToMany(() => Purchase_1.Purchase, (purchase) => purchase.product),
    __metadata("design:type", Object)
], Product.prototype, "purchases", void 0);
__decorate([
    typeorm_1.ManyToMany(() => ProductCategory_1.ProductCategory, (category) => category.products),
    typeorm_1.JoinTable(),
    __metadata("design:type", Object)
], Product.prototype, "categories", void 0);
Product = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Product);
exports.Product = Product;
