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
exports.UpdateAbsentHandler = exports.AddAbsentHandler = exports.GetAbsentHandler = void 0;
const models_1 = require("../../models");
const formatDate_1 = require("../../utils/formatDate");
const GetAbsentHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = request.query, { date } = _a, rest = __rest(_a, ["date"]);
    try {
        return yield models_1.Absent.findOne(Object.assign({ date: new Date(date) }, rest)).then((res) => {
            var _a;
            if (!res)
                return null;
            return {
                id: res._id.toString(),
                pengajarId: ((_a = res.pengajarId) === null || _a === void 0 ? void 0 : _a.toString()) || null,
                programId: res.programId.toString(),
                date: (0, formatDate_1.formatDate)(res.date),
                present: res.present,
                reason: res.reason || null,
            };
        });
    }
    catch (error) {
        return reply.internalServerError(`Error: ${error}`);
    }
});
exports.GetAbsentHandler = GetAbsentHandler;
const AddAbsentHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { pelajarId, pengajarId, programId, date, present, reason } = request.body;
    try {
        const isAbsentExists = yield models_1.Absent.findOne({
            pelajarId,
            programId,
            date: new Date(date),
        });
        if (isAbsentExists)
            return reply.badRequest('Cannot modify existing absent.');
        if (!present && reason == null)
            return reply.badRequest('Fill the reason.');
        const newAbsent = yield models_1.Absent.create({
            pelajarId,
            pengajarId,
            programId,
            date: new Date(date),
            present,
            reason,
        });
        const pengajar = yield models_1.Pengajar.findById(newAbsent.pengajarId);
        return reply.code(201).send({
            id: newAbsent._id.toString(),
            pengajarId: (pengajar === null || pengajar === void 0 ? void 0 : pengajar._id.toString()) || null,
            programId: newAbsent.programId.toString(),
            date: (0, formatDate_1.formatDate)(newAbsent.date),
            present: newAbsent.present,
            reason: newAbsent.reason || null,
        });
    }
    catch (error) {
        return reply.internalServerError(`Error: ${error}`);
    }
});
exports.AddAbsentHandler = AddAbsentHandler;
const UpdateAbsentHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { pelajarId, pengajarId, programId, date, present, reason } = request.body;
    try {
        const absent = yield models_1.Absent.findOne({
            pelajarId,
            programId,
            date: new Date(date),
        });
        if (!absent)
            return reply.notFound('Absent is not found.');
        if (!present && reason == null)
            return reply.badRequest('Fill the reason.');
        const newAbsent = {
            pelajarId,
            pengajarId,
            programId,
            date: new Date(date),
            present,
            reason: present ? null : reason,
        };
        yield models_1.Absent.findOneAndUpdate({
            pelajarId,
            programId,
            date: new Date(date),
        }, newAbsent, { new: true });
        return reply.send({
            id: absent._id.toString(),
            pengajarId: ((_b = absent.pengajarId) === null || _b === void 0 ? void 0 : _b.toString()) || null,
            programId,
            date: (0, formatDate_1.formatDate)(newAbsent.date),
            present,
            reason: newAbsent.reason || null,
        });
    }
    catch (error) {
        return reply.internalServerError(`Error: ${error}`);
    }
});
exports.UpdateAbsentHandler = UpdateAbsentHandler;
