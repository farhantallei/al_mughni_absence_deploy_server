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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationHandler = exports.LoginHandler = exports.RegisterHandler = void 0;
const models_1 = require("../../models");
const RegisterHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, name } = request.body;
    try {
        const pelajar = yield models_1.Pelajar.findOne({ username });
        if (pelajar)
            return reply.badRequest('Username is already taken.');
        const newPelajar = yield models_1.Pelajar.create({
            username: username.trim(),
            name,
        });
        return reply.code(201).send({
            id: newPelajar._id,
            username: newPelajar.username,
            name: newPelajar.name,
        });
    }
    catch (error) {
        return reply.internalServerError(`Error: ${error}`);
    }
});
exports.RegisterHandler = RegisterHandler;
const LoginHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = request.body;
    try {
        const pelajar = yield models_1.Pelajar.findOne({ username: username.trim() });
        if (pelajar == null)
            return reply.badRequest('Username is not exists.');
        return reply.send({
            id: pelajar._id,
            username: pelajar.username,
            name: pelajar.name,
        });
    }
    catch (error) {
        return reply.internalServerError(`Error: ${error}`);
    }
});
exports.LoginHandler = LoginHandler;
const ValidationHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = request.params;
    try {
        const pelajar = yield models_1.Pelajar.findOne({ username });
        if (pelajar == null)
            return reply.unauthorized('Username is not exists.');
        return reply.send({
            id: pelajar._id,
            username: pelajar.username,
            name: pelajar.name,
        });
    }
    catch (error) {
        return reply.internalServerError(`Error: ${error}`);
    }
});
exports.ValidationHandler = ValidationHandler;
