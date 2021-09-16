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
const Link_1 = __importDefault(require("./Link"));
const Subfolder_1 = __importDefault(require("./Subfolder"));
let Project = class Project extends Entity_1.default {
    constructor(project) {
        super();
        Object.assign(this, project);
    }
};
__decorate([
    typeorm_1.Index(),
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Project.prototype, "project_id", void 0);
__decorate([
    typeorm_1.Index(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Project.prototype, "project_name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Project.prototype, "url_name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Project.prototype, "user_id", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.default),
    typeorm_1.JoinColumn({ name: 'user_id', referencedColumnName: 'user_id' }),
    __metadata("design:type", User_1.default)
], Project.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(() => Link_1.default, (link) => link.project),
    __metadata("design:type", Array)
], Project.prototype, "links", void 0);
__decorate([
    typeorm_1.OneToMany(() => Subfolder_1.default, (subfolder) => subfolder.project),
    __metadata("design:type", Array)
], Project.prototype, "subfolders", void 0);
Project = __decorate([
    typeorm_1.Entity('projects'),
    __metadata("design:paramtypes", [Object])
], Project);
exports.default = Project;
//# sourceMappingURL=Project.js.map