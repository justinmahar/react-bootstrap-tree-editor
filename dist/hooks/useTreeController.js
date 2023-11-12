"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTreeController = exports.UNDEFINED_ID = void 0;
const react_1 = __importDefault(require("react"));
const useTreeExpansions_1 = require("./useTreeExpansions");
const useTreeFocus_1 = require("./useTreeFocus");
const useTreeMutations_1 = require("./useTreeMutations");
const useTreeFilter_1 = require("./useTreeFilter");
exports.UNDEFINED_ID = 'UNDEFINED_ID';
const useTreeController = (tree, setTree, opts) => {
    const options = react_1.default.useMemo(() => ({
        idPropertyName: opts.idPropertyName,
        titlePropertyName: opts.titlePropertyName,
        createNewData: opts.createNewData,
    }), [opts.idPropertyName, opts.titlePropertyName]);
    const expansions = (0, useTreeExpansions_1.useTreeExpansions)(tree, options);
    const mutations = (0, useTreeMutations_1.useTreeMutations)(tree, setTree, options);
    const focus = (0, useTreeFocus_1.useTreeFocus)(tree, expansions, options);
    const filters = (0, useTreeFilter_1.useTreeFilter)(tree, options);
    return react_1.default.useMemo(() => ({
        tree,
        setTree,
        options,
        expansions,
        mutations,
        focus,
        filters,
    }), [tree, setTree, options, expansions, mutations, focus, filters]);
};
exports.useTreeController = useTreeController;
