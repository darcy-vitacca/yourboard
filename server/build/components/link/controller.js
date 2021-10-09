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
exports.createLink = void 0;
const Link_1 = __importDefault(require("../../entities/Link"));
const Project_1 = __importDefault(require("../../entities/Project"));
const typeorm_1 = require("typeorm");
const createLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { url_name, url, url_image, position } = req.body[0];
    const name = req.params.project;
    const user = res.locals.user;
    try {
        const links = req.body;
        let errors = {};
        // if (isEmpty(url)) errors.description = 'URL must not be empty';
        // if (Object.keys(errors).length > 0) return res.status(400).json(errors);
        const project = yield Project_1.default.findOne({ url_name: name });
        const updatedLinks = yield req.body.map((item) => {
            return Object.assign(Object.assign({}, item), { user, project_id: project === null || project === void 0 ? void 0 : project.project_id });
        });
        const bulkInsert = yield typeorm_1.getConnection()
            .createQueryBuilder()
            .insert()
            .into(Link_1.default)
            .values(updatedLinks)
            .execute();
        return res.status(200).json(bulkInsert);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Something went wrong' });
    }
});
exports.createLink = createLink;
//# sourceMappingURL=controller.js.map