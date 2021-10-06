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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.inviteUserToProject = exports.getProjects = exports.createProject = exports.getProject = void 0;
const User_1 = __importDefault(require("../../entities/User"));
const class_validator_1 = require("class-validator");
const Project_1 = __importDefault(require("../../entities/Project"));
const Link_1 = __importDefault(require("../../entities/Link"));
const ProjectUser_1 = __importDefault(require("../../entities/ProjectUser"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const Friends_1 = __importDefault(require("../../entities/Friends"));
const typeorm_1 = require("typeorm");
mail_1.default.setApiKey((_a = process.env.SEND_GRID_API) !== null && _a !== void 0 ? _a : '');
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
            owner: true,
            email: user.email,
            user_id: user.user_id,
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
    try {
        const user = res.locals.user;
        let projects;
        const projectsUser = yield ProjectUser_1.default.find({
            select: ['project_id'],
            where: { user_id: user.user_id },
            order: { createdAt: 'DESC' },
        });
        if (projectsUser) {
            projects = yield Project_1.default.find({
                where: projectsUser,
                order: { createdAt: 'DESC' },
                relations: ['links', 'project_users'],
            });
        }
        else {
            return res.status(404).json({ project: 'Projects not found' });
        }
        return res.status(200).json(projects);
    }
    catch (err) {
        console.log(err);
        return res.status(404).json({ project: 'Projects not found' });
    }
});
exports.getProjects = getProjects;
const inviteUserToProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = res.locals.user;
    try {
        const { email, project_id, project_name } = req.body;
        let emailToSend;
        let completionMessage = {
            message: '',
        };
        const emailUserExists = yield User_1.default.findOne({ email });
        if (emailUserExists) {
            emailToSend = {
                replyTo: `urboardinfo@gmail.com`,
                from: `urboardinfo@gmail.com`,
                to: `${email}`,
                subject: `urboard invite from ${user.firstName} ${user.lastName}`,
                html: `<h3>You've been invited to a new urboard</h3>
              <p>Hi,</p>
              <p>${user.firstName} ${user.lastName} has invited you to ${project_name} collabarate here: 
              <a href='https://urboard.co'>https://urboard.co</a>.</p>
              <p>Thanks,</p>
              <p>urboard team.</p>`,
            };
            const userFriends = yield Friends_1.default.findOne({
                where: { user_1_id: user.user_id, user_2_email: email },
            });
            const invitedUserDetails = yield User_1.default.findOne({
                select: ['user_id', 'firstName', 'lastName', 'user_id'],
                where: { email: email },
            });
            if (!invitedUserDetails) {
                return res.status(404).json({ user: 'User not found' });
            }
            //If they aren't friends create and entry
            if (!userFriends) {
                const friendsData = [
                    {
                        user_1_name: `${user.firstName} ${user.lastName}`,
                        user_1_id: user.user_id,
                        user_1_email: user.email,
                        user_2_name: `${invitedUserDetails === null || invitedUserDetails === void 0 ? void 0 : invitedUserDetails.firstName} ${invitedUserDetails === null || invitedUserDetails === void 0 ? void 0 : invitedUserDetails.lastName}`,
                        user_2_id: invitedUserDetails.user_id,
                        user_2_email: email,
                        project_id: project_id,
                        accepted: true,
                    },
                    {
                        user_1_name: `${invitedUserDetails === null || invitedUserDetails === void 0 ? void 0 : invitedUserDetails.firstName} ${invitedUserDetails === null || invitedUserDetails === void 0 ? void 0 : invitedUserDetails.lastName}`,
                        user_1_id: invitedUserDetails.user_id,
                        user_1_email: email,
                        user_2_name: `${user.firstName} ${user.lastName}`,
                        user_2_id: user.user_id,
                        user_2_email: user.email,
                        project_id: project_id,
                        accepted: true,
                    },
                ];
                const bulkInsert = yield typeorm_1.getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(Friends_1.default)
                    .values(friendsData)
                    .execute();
                console.log('bulkInsert', bulkInsert);
                debugger;
            }
        }
        else {
            emailToSend = {
                replyTo: `urboardinfo@gmail.com`,
                from: `urboardinfo@gmail.com`,
                to: `${email}`,
                subject: `urboard invite from ${user.firstName} ${user.lastName}`,
                html: `<h3>Join urboard today</h3>
              <p>Hi,</p>
              <p>${user.firstName} ${user.lastName} has invited you to ${project_name} to collabarate please register here: 
              <a href=https://urboard.co/register?user=${email}>https://urboard.co/register</a>.</p>
              <p>Thanks,</p>
              <p>urboard team.</p>`,
            };
        }
        //send email
        // const emailRes = await sgMail
        //   .send(emailToSend)
        //   .then((response) => console.log('response', response))
        //   .catch((error) => {
        //     return error;
        //   });
        const projectUsers = yield new ProjectUser_1.default({
            status: false,
            project_id: project_id,
            owner: false,
            email: email,
        });
        yield projectUsers.save();
        completionMessage.message = 'Success';
        return res.status(200).json(completionMessage);
    }
    catch (err) {
        console.log(err);
        return res.status(404).json({ project: 'Project not found' });
    }
});
exports.inviteUserToProject = inviteUserToProject;
//# sourceMappingURL=controller.js.map