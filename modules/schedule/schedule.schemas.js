"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteScheduleSchema = exports.UpdateScheduleSchema = exports.AddScheduleSchema = exports.GetAttendanceSchema = exports.GetScheduleSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
const data_type_1 = require("../../types/data-type");
exports.GetScheduleSchema = {
    querystring: typebox_1.Type.Object({
        pengajarId: data_type_1.DataType.id,
        programId: data_type_1.DataType.id,
        date: data_type_1.DataType.date,
    }),
    response: {
        200: typebox_1.Type.Union([
            typebox_1.Type.Object({
                id: data_type_1.DataType.id,
                pengajarId: data_type_1.DataType.id,
                programId: data_type_1.DataType.id,
                date: data_type_1.DataType.date,
                available: typebox_1.Type.Boolean(),
                reason: typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()]),
            }),
            typebox_1.Type.Null(),
        ]),
    },
};
exports.GetAttendanceSchema = {
    params: typebox_1.Type.Object({
        pengajarId: data_type_1.DataType.id,
        programId: data_type_1.DataType.id,
    }),
    querystring: typebox_1.Type.Object({
        year: typebox_1.Type.Integer({ minimum: 1970, maximum: new Date().getFullYear() }),
        month: typebox_1.Type.Integer({ minimum: 0, maximum: 11 }),
    }),
    response: {
        200: typebox_1.Type.Array(typebox_1.Type.Object({
            date: typebox_1.Type.Integer({
                minimum: 1,
                maximum: new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDate(),
            }),
            available: typebox_1.Type.Union([data_type_1.DataType.string, typebox_1.Type.Boolean()]),
            attendances: typebox_1.Type.Array(typebox_1.Type.Object({
                id: data_type_1.DataType.id,
                username: data_type_1.DataType.string,
                name: data_type_1.DataType.string,
                attendance: typebox_1.Type.Union([data_type_1.DataType.string, typebox_1.Type.Boolean()]),
            })),
        })),
    },
};
exports.AddScheduleSchema = {
    body: typebox_1.Type.Object({
        pengajarId: data_type_1.DataType.id,
        programId: data_type_1.DataType.id,
        date: data_type_1.DataType.date,
        available: typebox_1.Type.Boolean(),
        reason: typebox_1.Type.Optional(data_type_1.DataType.string),
    }),
    response: {
        201: typebox_1.Type.Object({
            id: data_type_1.DataType.id,
            pengajarId: data_type_1.DataType.id,
            programId: data_type_1.DataType.id,
            date: data_type_1.DataType.date,
            available: typebox_1.Type.Boolean(),
            reason: typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()]),
        }),
    },
};
exports.UpdateScheduleSchema = {
    body: typebox_1.Type.Object({
        pengajarId: data_type_1.DataType.id,
        programId: data_type_1.DataType.id,
        date: data_type_1.DataType.date,
        available: typebox_1.Type.Boolean(),
        reason: typebox_1.Type.Optional(data_type_1.DataType.string),
    }),
    response: {
        200: typebox_1.Type.Object({
            id: data_type_1.DataType.id,
            pengajarId: data_type_1.DataType.id,
            programId: data_type_1.DataType.id,
            date: data_type_1.DataType.date,
            available: typebox_1.Type.Boolean(),
            reason: typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()]),
        }),
    },
};
exports.DeleteScheduleSchema = {
    body: typebox_1.Type.Object({
        pengajarId: data_type_1.DataType.id,
        programId: data_type_1.DataType.id,
        date: data_type_1.DataType.date,
    }),
    response: {
        200: typebox_1.Type.Object({
            id: data_type_1.DataType.id,
            pengajarId: data_type_1.DataType.id,
            programId: data_type_1.DataType.id,
            date: data_type_1.DataType.date,
            available: typebox_1.Type.Boolean(),
            reason: typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()]),
        }),
    },
};
