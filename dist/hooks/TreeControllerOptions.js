"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTreeControllerOptions = void 0;
const utils_1 = require("../utils/utils");
const defaultIdPropName = 'id';
const defaultTitlePropName = 'title';
exports.defaultTreeControllerOptions = {
    idPropertyName: defaultIdPropName,
    titlePropertyName: defaultTitlePropName,
    createNewData: () => ({ [defaultIdPropName]: (0, utils_1.uuid)(), [defaultTitlePropName]: '' }),
};
