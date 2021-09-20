"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjects = exports.createProject = exports.getProject = void 0;
const class_validator_1 = require("class-validator");
const Project_1 = __importDefault(require("../../entities/Project"));
const Link_1 = __importDefault(require("../../entities/Link"));
const ProjectUser_1 = __importDefault(require("../../entities/ProjectUser"));
const getProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const name = req.params.name;
    const user = res.locals.user;
    try {
        const project = yield Project_1.default.findOneOrFail({ url_name: name });
        const links = yield Link_1.default.find({
            where: { project_id: project.project_id },
            order: { position: 'ASC' },
            // relations: ['links', 'subfolders'],
        });
        project.links = links;
        //get project via name and uuid
        //get links
        return res.status(200).json(project);
    }
    catch (err) {
        console.log(err);
        return res.status(404).json({ project: 'Project not found' });
    }
});
exports.getProject = getProject;
const createProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, project_name, url_name } = req.body;
    const user = res.locals.user;
    try {
        let errors = {};
        if (class_validator_1.isEmpty(description))
            errors.description = 'Description must not be empty';
        if (class_validator_1.isEmpty(project_name))
            errors.project_name = 'Project name must not be empty';
        if (class_validator_1.isEmpty(url_name))
            errors.url_name = 'URL name must not be empty';
        if (Object.keys(errors).length > 0)
            return res.status(400).json(errors);
        const projectCheck = yield Project_1.default.findOne({ url_name });
        if (projectCheck)
            errors.url_name =
                'URL name already exists please choose a different one.';
        if (Object.keys(errors).length > 0)
            return res.status(400).json(errors);
        const project = yield new Project_1.default({
            description,
            project_name,
            url_name,
            user,
        });
        yield project.save();
        const projectUsers = yield new ProjectUser_1.default({
            full_name: `${user.firstName} ${user.lastName}`,
            status: true,
            project_id: project === null || project === void 0 ? void 0 : project.project_id,
        });
        yield projectUsers.save();
        return res.json(project);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});
exports.createProject = createProject;
const getProjects = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    try {
        const projects = yield Project_1.default.find({
            where: { user_id: user.user_id },
            order: { createdAt: 'DESC' },
            relations: ['links'],
        });
        return res.status(200).json(projects);
    }
    catch (err) {
        console.log(err);
        return res.status(404).json({ project: 'Project not found' });
    }
});
exports.getProjects = getProjects;
//# sourceMappingURL=controller.js.map