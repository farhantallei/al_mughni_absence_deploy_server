"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterPelajarSchema = exports.GetPengajarSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
const data_type_1 = require("../../types/data-type");
exports.GetPengajarSchema = {
    params: typebox_1.Type.Object({
        programId: data_type_1.DataType.id,
    }),
    response: {
        200: typebox_1.Type.Array(typebox_1.Type.Object({
            id: data_type_1.DataType.id,
            username: data_type_1.DataType.string,
            name: data_type_1.DataType.string,
        })),
    },
};
exports.RegisterPelajarSchema = {
    body: typebox_1.Type.Object({
        pelajarId: data_type_1.DataType.id,
        pengajarId: data_type_1.DataType.id,
        programId: data_type_1.DataType.id,
    }),
    response: {
        201: typebox_1.Type.Object({
            pelajarId: data_type_1.DataType.id,
            pengajarId: data_type_1.DataType.id,
            programId: data_type_1.DataType.id,
            pengajarName: data_type_1.DataType.string,
            programStatus: typebox_1.Type.Union([
                typebox_1.Type.Literal('available'),
                typebox_1.Type.Literal('unavailable'),
                typebox_1.Type.Literal('alibi'),
            ]),
            reason: typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()]),
        }),
    },
};
