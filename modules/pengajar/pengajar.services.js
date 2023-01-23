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
exports.setPengajar = exports.getSchedule = exports.getProgram = exports.checkPengajarByPelajarId = exports.getPengajarByProgramId = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const utils_1 = require("../../utils");
const formatDate_1 = require("../../utils/formatDate");
function getPengajarByProgramId(reply, { programId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.pengajar
            .findMany({
            where: { programId },
            select: { pelajar: true },
        })
            .then((pengajar) => pengajar.map(({ pelajar }) => pelajar)), reply);
    });
}
exports.getPengajarByProgramId = getPengajarByProgramId;
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
function getSchedule(reply, { pengajarId, programId }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.schedule.findUnique({
            where: {
                pengajarId_programId_date: {
                    pengajarId,
                    programId,
                    date: new Date((0, formatDate_1.formatDate)(new Date())),
                },
            },
            select: { pengajarId: true, available: true, reason: true },
        }), reply);
    });
}
exports.getSchedule = getSchedule;
function setPengajar(reply, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, utils_1.commitToDB)(prisma_1.default.pelajarOnPengajar.create({ data }), reply);
    });
}
exports.setPengajar = setPengajar;
