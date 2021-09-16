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
const Project_1 = __importDefault(require("./Project"));
const Link_1 = __importDefault(require("./Link"));
let Subfolder = class Subfolder extends Entity_1.default {
    constructor(subfolder) {
        super();
        Object.assign(this, subfolder);
    }
};
__decorate([
    typeorm_1.Index(),
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Subfolder.prototype, "subfolder_id", void 0);
__decorate([
    typeorm_1.Column({
        nullable: true,
    }),
    __metadata("design:type", String)
], Subfolder.prototype, "subfolder_image", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Subfolder.prototype, "position", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Subfolder.prototype, "project_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Project_1.default, (project) => project.subfolders),
    typeorm_1.JoinColumn({ name: 'project_id', referencedColumnName: 'project_id' }),
    __metadata("design:type", Project_1.default)
], Subfolder.prototype, "project", void 0);
__decorate([
    typeorm_1.OneToMany(() => Link_1.default, (link) => link.subfolder),
    __metadata("design:type", Array)
], Subfolder.prototype, "links", void 0);
Subfolder = __decorate([
    typeorm_1.Entity('subfolders'),
    __metadata("design:paramtypes", [Object])
], Subfolder);
exports.default = Subfolder;
//# sourceMappingURL=Subfolder.js.map