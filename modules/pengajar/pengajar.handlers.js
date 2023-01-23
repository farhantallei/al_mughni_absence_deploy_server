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
const pengajar_services_1 = require("./pengajar.services");
const GetPengajarHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { programId } = request.params;
    return yield (0, pengajar_services_1.getPengajarByProgramId)(reply, { programId });
});
exports.GetPengajarHandler = GetPengajarHandler;
const RegisterPelajarHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { pelajarId, pengajarId, programId } = request.body;
    const isRegistered = yield (0, pengajar_services_1.checkPengajarByPelajarId)(reply, {
        pelajarId,
        programId,
    });
    if (isRegistered)
        return reply.badRequest('Pelajar is already registered.');
    const schedule = yield (0, pengajar_services_1.getSchedule)(reply, { pengajarId, programId });
    const programStatus = schedule
        ? schedule.available
            ? 'available'
            : 'alibi'
        : 'unavailable';
    return yield (0, pengajar_services_1.setPengajar)(reply, { pelajarId, pengajarId, programId }).then((res) => (Object.assign(Object.assign({}, res), { programStatus, reason: schedule && schedule.reason != null ? schedule.reason : null })));
});
exports.RegisterPelajarHandler = RegisterPelajarHandler;
