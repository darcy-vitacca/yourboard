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
exports.logout = exports.me = exports.login = exports.register = void 0;
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../../entities/User"));
const class_validator_1 = require("class-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_1 = __importDefault(require("cookie"));
const ProjectUser_1 = __importDefault(require("../../entities/ProjectUser"));
const mapErrors = (errors) => {
    //Returns
    return errors.reduce((prev, err) => {
        prev[err.property] = Object.entries(err.constraints)[0][1];
        return prev;
    }, {});
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, username, password, firstName, lastName } = req.body;
        let errors = {};
        if (class_validator_1.isEmpty(email))
            errors.email = 'Email must not be empty';
        if (class_validator_1.isEmpty(username))
            errors.username = 'Username must not be empty';
        if (class_validator_1.isEmpty(password))
            errors.password = 'Password must not be empty';
        if (class_validator_1.isEmpty(firstName))
            errors.firstName = 'First name must not be empty';
        if (class_validator_1.isEmpty(lastName))
            errors.lastName = 'Last must not be empty';
        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors);
        }
        const emailUserExists = yield User_1.default.findOne({ email });
        const usernameUserExists = yield User_1.default.findOne({ username });
        if (emailUserExists)
            errors.email = 'Email is already taken';
        if (usernameUserExists)
            errors.username = 'Username is already taken';
        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors);
        }
        const user = new User_1.default({ email, username, password, firstName, lastName });
        errors = yield class_validator_1.validate(user);
        if (errors.length > 0) {
            return res.status(400).json(mapErrors(errors));
        }
        yield user.save();
        console.log('user', user);
        debugger;
        yield typeorm_1.getConnection()
            .createQueryBuilder()
            .update(ProjectUser_1.default)
            .set({
            status: true,
            user_id: user.user_id,
            full_name: `${user.firstName} ${user.lastName}`,
        })
            .where('email = :email', { email: email })
            .execute();
        return res.json(user);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let errors = {};
        if (class_validator_1.isEmpty(email))
            errors.email = 'Email must not be empty';
        if (class_validator_1.isEmpty(password))
            errors.password = 'Password must not be empty';
        if (Object.keys(errors).length > 0)
            return res.status(400).json(errors);
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return res.status(404).json({ email: 'Email not found' });
        //hashes input and compares new password
        const passwordMatches = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatches)
            return res.status(401).json({ password: 'Password is incorrect' });
        const token = jsonwebtoken_1.default.sign({ email }, process.env.JWT_SECRET);
        //res.set sets the header. Http only sets it so it can't be accessed by javascript
        //means it should only pass through https is true, the path says online
        res.set('Set-Cookie', cookie_1.default.serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        }));
        return res.json(user);
    }
    catch (err) {
        console.log(err);
        return res.json({ error: 'Something went wrong' });
    }
});
exports.login = login;
const me = (_, res) => {
    return res.json(res.locals.user);
};
exports.me = me;
const logout = (_, res) => {
    res.set('Set-Cookie', cookie_1.default.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0),
        path: '/',
    }));
    return res.status(200).json({ success: true });
};
exports.logout = logout;
//# sourceMappingURL=controller.js.map