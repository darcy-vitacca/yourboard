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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Entity_1 = __importDefault(require("./Entity"));
const User_1 = __importDefault(require("./User"));
const Project_1 = __importDefault(require("./Project"));
const Subfolder_1 = __importDefault(require("./Subfolder"));
let Link = class Link extends Entity_1.default {
    constructor(link) {
        super();
        Object.assign(this, link);
    }
};
__decorate([
    typeorm_1.Index(),
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Link.prototype, "link_id", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], Link.prototype, "url_name", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Link.prototype, "url", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], Link.prototype, "url_image", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Link.prototype, "user_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.default),
    typeorm_1.JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' }),
    __metadata("design:type", User_1.default)
], Link.prototype, "user", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Link.prototype, "project_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Project_1.default),
    typeorm_1.JoinColumn({ name: 'project_id', referencedColumnName: 'project_id' }),
    __metadata("design:type", Project_1.default)
], Link.prototype, "project", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], Link.prototype, "subfolder_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Subfolder_1.default, (subfolder) => subfolder.links),
    typeorm_1.JoinColumn({ name: 'subfolder_id', referencedColumnName: 'subfolder_id' }),
    __metadata("design:type", Subfolder_1.default)
], Link.prototype, "subfolder", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", Number)
], Link.prototype, "clicked", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Link.prototype, "position", void 0);
Link = __decorate([
    typeorm_1.Entity('links'),
    __metadata("design:paramtypes", [Object])
], Link);
exports.default = Link;
//# sourceMappingURL=Link.js.map