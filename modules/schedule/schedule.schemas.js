"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateScheduleSchema = exports.AddScheduleSchema = exports.GetScheduleSchema = void 0;
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
