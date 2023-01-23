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
exports.GetProgramListHandler = void 0;
const program_services_1 = require("./program.services");
const GetProgramListHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { pelajarId } = request.params;
    const programs = yield (0, program_services_1.getProgram)(reply, { pelajarId });
    let result = [];
    for (let i = 0; i < programs.length; i++) {
        let presentStatus = 'alpha';
        let programStatus = 'available';
        const absent = yield (0, program_services_1.getAbsentByProgramId)(reply, {
            pelajarId,
            programId: programs[i].id,
        });
        if (absent == null)
            presentStatus = 'alpha';
        else if (absent.present)
            presentStatus = 'present';
        else
            presentStatus = 'absent';
        if (programs[i].individual) {
            result.push({
                id: programs[i].id,
                pengajarId: null,
                name: programs[i].name,
                individual: true,
                pengajar: false,
                presentStatus,
                programStatus,
                reason: (absent === null || absent === void 0 ? void 0 : absent.reason) || null,
            });
            continue;
        }
        const registeredPelajar = yield (0, program_services_1.getPelajarByProgramId)(reply, {
            pelajarId,
            programId: programs[i].id,
        });
        const schedulesProgram = yield (0, program_services_1.getSchedulesByProgramId)(reply, {
            programId: programs[i].id,
        });
        const isPengajar = yield (0, program_services_1.checkPengajarByPelajarId)(reply, {
            pelajarId,
            programId: programs[i].id,
        });
        if (isPengajar) {
            const schedules = schedulesProgram.filter(({ pengajarId }) => pengajarId === pelajarId);
            const programStatus = schedules.length > 0
                ? schedules[0].available
                    ? 'available'
                    : 'alibi'
                : 'unavailable';
            result.push({
                id: programs[i].id,
                pengajarId: pelajarId,
                name: programs[i].name,
                individual: false,
                pengajar: true,
                presentStatus,
                programStatus,
                reason: schedules.length > 0 && schedules[0].reason != null
                    ? schedules[0].reason
                    : (absent === null || absent === void 0 ? void 0 : absent.reason) || null,
            });
            continue;
        }
        if (registeredPelajar) {
            const schedules = schedulesProgram.filter(({ pengajarId }) => pengajarId === registeredPelajar.pengajarId);
            const programStatus = schedules.length > 0
                ? schedules[0].available
                    ? 'available'
                    : 'alibi'
                : 'unavailable';
            result.push({
                id: programs[i].id,
                pengajarId: registeredPelajar.pengajarId,
                name: programs[i].name,
                individual: false,
                pengajar: false,
                presentStatus,
                programStatus,
                reason: schedules.length > 0 && schedules[0].reason != null
                    ? schedules[0].reason
                    : (absent === null || absent === void 0 ? void 0 : absent.reason) || null,
            });
            continue;
        }
        result.push({
            id: programs[i].id,
            pengajarId: null,
            name: programs[i].name,
            individual: false,
            pengajar: false,
            presentStatus,
            programStatus: 'unavailable',
            reason: (absent === null || absent === void 0 ? void 0 : absent.reason) || null,
        });
    }
    return result;
});
exports.GetProgramListHandler = GetProgramListHandler;
