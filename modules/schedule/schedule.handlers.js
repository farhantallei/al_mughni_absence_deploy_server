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
exports.DeleteScheduleHandler = exports.UpdateScheduleHandler = exports.AddScheduleHandler = exports.GetScheduleHandler = void 0;
const models_1 = require("../../models");
const formatDate_1 = require("../../utils/formatDate");
const GetScheduleHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { pengajarId, programId, date } = request.query;
    try {
        const schedule = yield models_1.Schedule.findOne({ pengajarId, programId, date });
        if (!schedule)
            return reply.notFound('Schedule is not found.');
        return reply.send({
            id: schedule._id.toString(),
            pengajarId: schedule.pengajarId.toString(),
            programId: schedule.programId.toString(),
            date: (0, formatDate_1.formatDate)(new Date(date)),
            available: schedule.available,
            reason: schedule.reason || null,
        });
    }
    catch (error) {
        return reply.internalServerError(`Error: ${error}`);
    }
});
exports.GetScheduleHandler = GetScheduleHandler;
const AddScheduleHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { pengajarId, programId, date, available, reason } = request.body;
    try {
        const schedule = yield models_1.Schedule.findOne({ pengajarId, programId, date });
        if (schedule)
            return reply.badRequest('Cannot modify existing absent.');
        if (available === false && reason === null)
            return reply.badRequest('Fill the reason.');
        const newSchedule = yield models_1.Schedule.create({
            pengajarId,
            programId,
            date: new Date(date),
            available,
            reason,
        });
        return reply.code(201).send({
            id: newSchedule._id,
            pengajarId: newSchedule.pengajarId,
            programId: newSchedule.programId,
            date: (0, formatDate_1.formatDate)(newSchedule.date),
            available: newSchedule.available,
            reason: newSchedule.reason || null,
        });
    }
    catch (error) {
        return reply.internalServerError(`Error: ${error}`);
    }
});
exports.AddScheduleHandler = AddScheduleHandler;
const UpdateScheduleHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { pengajarId, programId, date, available, reason } = request.body;
    try {
        const schedule = yield models_1.Schedule.findOne({ pengajarId, programId, date });
        if (!schedule)
            return reply.notFound('Schedule is not found.');
        if (!available && reason === null)
            return reply.badRequest('Fill the reason.');
        const newSchedule = {
            pengajarId,
            programId,
            date: new Date(date),
            available,
            reason: available ? null : reason,
        };
        yield models_1.Absent.deleteMany({ pengajarId, programId, date });
        yield models_1.Schedule.findOneAndUpdate({ pengajarId, programId, date }, newSchedule, { new: true });
        return reply.send({
            id: schedule._id,
            pengajarId,
            programId,
            date: (0, formatDate_1.formatDate)(newSchedule.date),
            available,
            reason: newSchedule.reason || null,
        });
    }
    catch (error) {
        return reply.internalServerError(`Error: ${error}`);
    }
});
exports.UpdateScheduleHandler = UpdateScheduleHandler;
const DeleteScheduleHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { pengajarId, programId, date } = request.body;
    try {
        const schedule = yield models_1.Schedule.findOneAndDelete({
            pengajarId,
            programId,
            date,
        });
        if (!schedule)
            return reply.notFound('Schedule is not found.');
        return reply.send({
            id: schedule._id.toString(),
            pengajarId: schedule.pengajarId.toString(),
            programId: schedule.programId.toString(),
            date: (0, formatDate_1.formatDate)(new Date(date)),
            available: schedule.available,
            reason: schedule.reason || null,
        });
    }
    catch (error) {
        return reply.internalServerError(`Error: ${error}`);
    }
});
exports.DeleteScheduleHandler = DeleteScheduleHandler;
