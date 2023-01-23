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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateScheduleHandler = exports.AddScheduleHandler = exports.GetScheduleHandler = void 0;
const schedule_services_1 = require("./schedule.services");
const GetScheduleHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = request.query, { date } = _a, rest = __rest(_a, ["date"]);
    return yield (0, schedule_services_1.getSchedule)(reply, Object.assign({ date: new Date(date) }, rest));
});
exports.GetScheduleHandler = GetScheduleHandler;
const AddScheduleHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { pengajarId, programId, date, available, reason } = request.body;
    const isScheduleExists = yield (0, schedule_services_1.checkSchedule)(reply, {
        pengajarId: pengajarId,
        programId,
        date: new Date(date),
    });
    if (isScheduleExists)
        return reply.badRequest('Cannot modify existing absent.');
    if (available === false && reason === null)
        return reply.badRequest('Fill the reason.');
    const schedule = yield (0, schedule_services_1.addSchedule)(reply, {
        pengajarId,
        programId,
        date: new Date(date),
        available,
        reason,
    });
    return reply.code(201).send(schedule);
});
exports.AddScheduleHandler = AddScheduleHandler;
const UpdateScheduleHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { pengajarId, programId, date, available, reason } = request.body;
    const isScheduleExists = yield (0, schedule_services_1.checkSchedule)(reply, {
        pengajarId: pengajarId,
        programId,
        date: new Date(date),
    });
    if (!isScheduleExists)
        return reply.badRequest('Schedule is not found.');
    if (!available && reason === null)
        return reply.badRequest('Fill the reason.');
    return yield (0, schedule_services_1.updateSchedule)(reply, {
        pengajarId,
        programId,
        date: new Date(date),
        available,
        reason: available ? null : reason,
    });
});
exports.UpdateScheduleHandler = UpdateScheduleHandler;
