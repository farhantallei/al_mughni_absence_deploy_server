"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PelajarOnPengajar = exports.Absent = exports.Schedule = exports.Pengajar = exports.Program = exports.Pelajar = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const pelajarSchema = new mongoose_1.Schema({
    username: { type: String, unique: true, required: true },
    name: { type: String, required: true },
}, { collection: 'Pelajar' });
exports.Pelajar = mongoose_1.default.model('Pelajar', pelajarSchema);
const programSchema = new mongoose_1.Schema({
    name: { type: String, unique: true, required: true },
    individual: { type: Boolean, default: false },
}, { collection: 'Program' });
exports.Program = mongoose_1.default.model('Program', programSchema);
const pengajarSchema = new mongoose_1.Schema({
    pelajarId: { type: mongoose_1.SchemaTypes.ObjectId, required: true, ref: 'Pelajar' },
    programId: { type: mongoose_1.SchemaTypes.ObjectId, required: true, ref: 'Program' },
}, { collection: 'Pengajar' });
pengajarSchema.index({ pelajarId: 1, programId: 1 }, { unique: true });
exports.Pengajar = mongoose_1.default.model('Pengajar', pengajarSchema);
const scheduleSchema = new mongoose_1.Schema({
    pengajarId: { type: mongoose_1.SchemaTypes.ObjectId, required: true, ref: 'Pelajar' },
    programId: { type: mongoose_1.SchemaTypes.ObjectId, required: true, ref: 'Program' },
    date: { type: mongoose_1.SchemaTypes.Date, required: true },
    available: { type: Boolean, required: true },
    reason: { type: String, default: null },
}, { collection: 'Schedule' });
scheduleSchema.index({ pengajarId: 1, programId: 1, date: 1 }, { unique: true });
exports.Schedule = mongoose_1.default.model('Schedule', scheduleSchema);
const absentSchema = new mongoose_1.Schema({
    pelajarId: { type: mongoose_1.SchemaTypes.ObjectId, required: true, ref: 'Pelajar' },
    pengajarId: { type: mongoose_1.SchemaTypes.ObjectId, ref: 'Pelajar' },
    programId: { type: mongoose_1.SchemaTypes.ObjectId, required: true, ref: 'Program' },
    date: { type: mongoose_1.SchemaTypes.Date, required: true },
    present: { type: Boolean, required: true },
    reason: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
}, { collection: 'Absent' });
absentSchema.index({ pelajarId: 1, programId: 1, date: 1 }, { unique: true });
exports.Absent = mongoose_1.default.model('Absent', absentSchema);
const pelajarOnPengajarSchema = new mongoose_1.Schema({
    pelajarId: { type: mongoose_1.SchemaTypes.ObjectId, required: true, ref: 'Pelajar' },
    pengajarId: { type: mongoose_1.SchemaTypes.ObjectId, required: true, ref: 'Pelajar' },
    programId: { type: mongoose_1.SchemaTypes.ObjectId, required: true, ref: 'Program' },
}, { collection: 'PelajarOnPengajar' });
pelajarOnPengajarSchema.index({ pelajarId: 1, programId: 1 }, { unique: true });
exports.PelajarOnPengajar = mongoose_1.default.model('PelajarOnPengajar', pelajarOnPengajarSchema);
