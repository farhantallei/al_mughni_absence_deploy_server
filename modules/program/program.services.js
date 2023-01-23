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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPelajarByProgramId = exports.getSchedulesByProgramId = exports.getAbsentByProgramId = exports.getProgram = exports.checkPengajarByPelajarId = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const utils_1 = require("../../utils");
const formatDate_1 = require("../../utils/formatDate");
function checkPengajarByPelajarId(reply, { pelajarId, programId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.pengajar.count({ where: { pelajarId, programId } }), reply).then((val) => !!val);
    });
}
exports.checkPengajarByPelajarId = checkPengajarByPelajarId;
function getProgram(reply, { pelajarId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.program.findMany({
            select: {
                id: true,
                name: true,
                individual: true,
                pengajar: { select: { programId: true }, where: { pelajarId } },
            },
            orderBy: { id: 'asc' },
        }), reply);
    });
}
exports.getProgram = getProgram;
function getAbsentByProgramId(reply, { pelajarId, programId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.absent.findUnique({
            where: {
                pelajarId_programId_date: {
                    pelajarId,
                    programId,
                    date: new Date((0, formatDate_1.formatDate)(new Date())),
                },
            },
            select: { present: true, reason: true },
        }), reply);
    });
}
exports.getAbsentByProgramId = getAbsentByProgramId;
function getSchedulesByProgramId(reply, { programId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.schedule.findMany({
            where: { programId, date: new Date((0, formatDate_1.formatDate)(new Date())) },
            select: { pengajarId: true, available: true, reason: true },
        }), reply);
    });
}
exports.getSchedulesByProgramId = getSchedulesByProgramId;
function getPelajarByProgramId(reply, pelajarId_programId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.pelajarOnPengajar.findUnique({ where: { pelajarId_programId } }), reply);
    });
}
exports.getPelajarByProgramId = getPelajarByProgramId;
