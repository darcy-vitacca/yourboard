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
require("reflect-metadata");
require('dotenv').config({ path: '../.env' });
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
const morgan_1 = __importDefault(require("morgan"));
const trim_1 = __importDefault(require("./components/middleware/trim"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const PORT = process.env.PORT || 4000;
const app = express_1.default();
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.use(morgan_1.default('dev'));
app.use(trim_1.default);
//to parse the json data
app.use(express_1.default.json());
app.use(morgan_1.default('dev'));
app.use(trim_1.default);
app.use(cookie_parser_1.default());
//this allows us to write cookies ,
//origin is where cookies can be written
//options allows to send a request before
// a request
app.use(cors_1.default({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
}));
require('./routes/auth-routes')(app);
require('./routes/user-routes')(app);
require('./routes/project-routes')(app);
require('./routes/link-routes')(app);
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server running on Port ${PORT} 🚀 🚀 🚀 `);
    try {
        yield typeorm_1.createConnection();
        console.log('Database connected 🤖');
    }
    catch (err) {
        console.log(err);
    }
}));
//# sourceMappingURL=server.js.map