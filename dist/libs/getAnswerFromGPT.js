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
exports.getAnswer = void 0;
const constants_1 = require("./constants");
const openapi_config_1 = require("./openapi-config");
const getAnswer = (question, model = constants_1.GPT_MODEL) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const chatCompletion = yield openapi_config_1.openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "あなたは経験豊富なエンジニアです。質問に対して技術・知識に対してアドバイスを返して下さい。返信はなるべく短くお願いします。",
            },
            { role: "user", content: question },
        ],
        model,
    });
    return (_a = chatCompletion.choices[0].message) === null || _a === void 0 ? void 0 : _a.content;
});
exports.getAnswer = getAnswer;
