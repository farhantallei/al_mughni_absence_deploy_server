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
exports.pengajarRoutes = void 0;
const pengajar_handlers_1 = require("./pengajar.handlers");
const pengajar_schemas_1 = require("./pengajar.schemas");
const pengajarRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.get('/:programId', {
        schema: pengajar_schemas_1.GetPengajarSchema,
        handler: pengajar_handlers_1.GetPengajarHandler,
    });
    route.post('/', {
        schema: pengajar_schemas_1.RegisterPelajarSchema,
        handler: pengajar_handlers_1.RegisterPelajarHandler,
    });
});
exports.pengajarRoutes = pengajarRoutes;
