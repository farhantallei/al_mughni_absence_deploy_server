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
exports.scheduleRoutes = void 0;
const schedule_handlers_1 = require("./schedule.handlers");
const schedule_schemas_1 = require("./schedule.schemas");
const scheduleRoutes = (route) => __awaiter(void 0, void 0, void 0, function* () {
    route.get('/', {
        schema: schedule_schemas_1.GetScheduleSchema,
        handler: schedule_handlers_1.GetScheduleHandler,
    });
    route.post('/', {
        schema: schedule_schemas_1.AddScheduleSchema,
        handler: schedule_handlers_1.AddScheduleHandler,
    });
    route.patch('/', {
        schema: schedule_schemas_1.UpdateScheduleSchema,
        handler: schedule_handlers_1.UpdateScheduleHandler,
    });
});
exports.scheduleRoutes = scheduleRoutes;
