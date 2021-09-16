"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//Whitespace Check/Trim
exports.default = (req, _, next) => {
    const exceptions = ['password'];
    Object.keys(req.body).forEach((key) => {
        if (!exceptions.includes(key) && typeof req.body[key] === 'string') {
            req.body[key] = req.body[key].trim();
        }
    });
    //to the next function
    next();
};
//# sourceMappingURL=trim.js.map