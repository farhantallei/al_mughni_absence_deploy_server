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
const models_1 = require("../../models");
const formatDate_1 = require("../../utils/formatDate");
const GetProgramListHandler = (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const { pelajarId } = request.params;
    try {
        const programs = yield models_1.Program.find();
        let result = [];
        for (let i = 0; i < programs.length; i++) {
            let presentStatus = 'alpha';
            let programStatus = 'available';
            const absent = yield models_1.Absent.findOne({
                pelajarId,
                programId: programs[i]._id,
                date: new Date((0, formatDate_1.formatDate)(new Date())),
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
                    pengajarName: '',
                    name: programs[i].name,
                    individual: true,
                    pengajar: false,
                    presentStatus,
                    programStatus,
                    reason: (absent === null || absent === void 0 ? void 0 : absent.reason) || null,
                });
                continue;
            }
            const schedulesProgram = yield models_1.Schedule.find({
                programId: programs[i]._id,
                date: new Date((0, formatDate_1.formatDate)(new Date())),
            });
            const isPengajar = yield models_1.Pengajar.findOne({
                pelajarId,
                programId: programs[i]._id,
            });
            if (isPengajar) {
                const schedules = schedulesProgram.filter(({ pengajarId }) => pengajarId.toString() === pelajarId);
                const programStatus = schedules.length > 0
                    ? schedules[0].available
                        ? 'available'
                        : 'alibi'
                    : 'unavailable';
                const pengajar = yield models_1.Pelajar.findById(pelajarId);
                if (!pengajar)
                    return reply.badRequest('Pengajar is not found.');
                result.push({
                    id: programs[i]._id,
                    pengajarId: pelajarId,
                    pengajarName: pengajar.name,
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
            const registeredPelajar = yield models_1.PelajarOnPengajar.findOne({
                pelajarId,
                programId: programs[i]._id,
            });
            console.log({ registeredPelajar });
            if (registeredPelajar) {
                console.log({ schedulesProgram });
                const schedules = schedulesProgram.filter(({ pengajarId }) => {
                    console.log({ pengajarId_schedule: pengajarId });
                    console.log({ pengajarId_pelajar: registeredPelajar.pengajarId });
                    return (pengajarId.toString() === registeredPelajar.pengajarId.toString());
                });
                console.log({ schedules });
                const programStatus = schedules.length > 0
                    ? schedules[0].available
                        ? 'available'
                        : 'alibi'
                    : 'unavailable';
                const pengajar = yield models_1.Pelajar.findById(registeredPelajar.pengajarId);
                if (!pengajar)
                    return reply.badRequest('Pengajar is not found.');
                result.push({
                    id: programs[i]._id.toString(),
                    pengajarId: registeredPelajar.pengajarId.toString(),
                    pengajarName: pengajar.name,
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
                pengajarName: '',
                name: programs[i].name,
                individual: false,
                pengajar: false,
                presentStatus,
                programStatus: 'unavailable',
                reason: (absent === null || absent === void 0 ? void 0 : absent.reason) || null,
            });
        }
        console.log(result);
        return result;
    }
    catch (error) {
        return reply.internalServerError(`Error: ${error}`);
    }
});
exports.GetProgramListHandler = GetProgramListHandler;
