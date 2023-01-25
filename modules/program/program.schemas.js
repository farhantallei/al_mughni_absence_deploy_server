"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProgramListSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
const data_type_1 = require("../../types/data-type");
exports.GetProgramListSchema = {
    params: typebox_1.Type.Object({ pelajarId: data_type_1.DataType.id }),
    response: {
        200: typebox_1.Type.Array(typebox_1.Type.Object({
            id: data_type_1.DataType.id,
            pengajarId: typebox_1.Type.Union([data_type_1.DataType.id, typebox_1.Type.Null()]),
            pengajarName: data_type_1.DataType.string,
            name: typebox_1.Type.String(),
            individual: typebox_1.Type.Boolean(),
            pengajar: typebox_1.Type.Boolean(),
            presentStatus: typebox_1.Type.Union([
                typebox_1.Type.Literal('alpha'),
                typebox_1.Type.Literal('present'),
                typebox_1.Type.Literal('absent'),
            ]),
            programStatus: typebox_1.Type.Union([
                typebox_1.Type.Literal('available'),
                typebox_1.Type.Literal('unavailable'),
                typebox_1.Type.Literal('alibi'),
            ]),
            reason: typebox_1.Type.Union([typebox_1.Type.String(), typebox_1.Type.Null()]),
        })),
    },
};
