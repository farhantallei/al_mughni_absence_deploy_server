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
exports.DeleteScheduleHandler = exports.UpdateScheduleHandler = exports.AddScheduleHandler = exports.GetAttendanceHandler = exports.GetScheduleHandler = void 0;
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
const GetAttendanceHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { pengajarId, programId } = request.params;
    const { month, year } = request.query;
    try {
        const schedules = yield models_1.Schedule.find({
            pengajarId,
            programId,
            date: {
                $gte: new Date(year, month, 1),
                $lte: new Date(year, month, new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate()),
            },
        });
        const paraPelajar = yield models_1.PelajarOnPengajar.find({
            programId,
            pengajarId,
        }).then((res) => res.map(({ pelajarId }) => pelajarId));
        return yield schedules.reduce((schAcc, { date, available, reason }) => __awaiter(void 0, void 0, void 0, function* () {
            const attendances = yield paraPelajar.reduce((attAcc, id) => __awaiter(void 0, void 0, void 0, function* () {
                const pelajar = yield models_1.Pelajar.findById(id);
                if (pelajar == null)
                    return attAcc;
                const absent = yield models_1.Absent.findOne({
                    pelajarId: id,
                    programId,
                    date,
                });
                if (!available || absent == null) {
                    (yield attAcc).push({
                        id: pelajar._id.toString(),
                        username: pelajar.username,
                        name: pelajar.name,
                        attendance: false,
                    });
                }
                else if (!absent.present) {
                    (yield attAcc).push({
                        id: pelajar._id.toString(),
                        username: pelajar.username,
                        name: pelajar.name,
                        attendance: absent.reason,
                    });
                }
                else {
                    (yield attAcc).push({
                        id: pelajar._id.toString(),
                        username: pelajar.username,
                        name: pelajar.name,
                        attendance: true,
                    });
                }
                return attAcc;
            }), Promise.resolve([]));
            (yield schAcc).push({
                date: new Date(date).getDate(),
                available: !available ? reason : available,
                attendances,
            });
            return schAcc;
        }), Promise.resolve([]));
    }
    catch (error) {
        return reply.internalServerError(`Error: ${error}`);
    }
});
exports.GetAttendanceHandler = GetAttendanceHandler;
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
            reason: reason === null || reason === void 0 ? void 0 : reason.trim(),
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
            reason: available ? null : reason === null || reason === void 0 ? void 0 : reason.trim(),
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
        yield models_1.Absent.deleteMany({ programId, date });
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
