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
exports.RegisterPelajarHandler = exports.GetPengajarHandler = void 0;
const models_1 = require("../../models");
const GetPengajarHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { programId } = request.params;
    try {
        const pengajar = yield models_1.Pengajar.find({ programId });
        let result = [];
        for (let i = 0; i < pengajar.length; i++) {
            const pelajar = yield models_1.Pelajar.findById(pengajar[i].pelajarId);
            if (!pelajar)
                continue;
            result.push({
                id: pelajar._id,
                username: pelajar.username,
                name: pelajar.name,
            });
        }
        return result;
    }
    catch (error) {
        return reply.internalServerError(`Error: ${error}`);
    }
});
exports.GetPengajarHandler = GetPengajarHandler;
const RegisterPelajarHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { pelajarId, pengajarId, programId } = request.body;
    try {
        const isRegistered = yield models_1.PelajarOnPengajar.findOne({
            pelajarId,
            pengajarId,
            programId,
        });
        if (isRegistered)
            return reply.badRequest('Pelajar is already registered.');
        const pengajar = yield models_1.Pelajar.findById(pengajarId);
        if (!pengajar)
            return reply.badRequest('Pengajar is not found.');
        const schedule = yield models_1.Schedule.findOne({ pengajarId, programId });
        const programStatus = schedule
            ? schedule.available
                ? 'available'
                : 'alibi'
            : 'unavailable';
        const register = yield models_1.PelajarOnPengajar.create({
            pelajarId,
            pengajarId,
            programId,
        });
        const reason = schedule && schedule.reason != null ? schedule.reason : null;
        return reply.code(201).send({
            pelajarId: register.pelajarId.toString(),
            pengajarId: register.pengajarId.toString(),
            programId: register.programId.toString(),
            pengajarName: pengajar.name,
            programStatus,
            reason,
        });
    }
    catch (error) {
        return reply.internalServerError(`Error: ${error}`);
    }
});
exports.RegisterPelajarHandler = RegisterPelajarHandler;
