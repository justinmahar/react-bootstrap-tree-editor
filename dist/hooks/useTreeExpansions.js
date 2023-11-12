"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTreeExpansions = void 0;
const react_1 = __importDefault(require("react"));
const useRefState_1 = require("./useRefState");
const useTreeExpansions = (tree, treeOptions) => {
    const [expansionsMap, setExpansionsMap] = (0, useRefState_1.useRefState)({});
    const isExpandedId = react_1.default.useCallback((id) => {
        if (typeof id !== 'undefined') {
            return !!expansionsMap[id];
        }
        return false;
    }, [expansionsMap]);
    const isExpandedNode = react_1.default.useCallback((node) => {
        const id = node === null || node === void 0 ? void 0 : node.getData()[treeOptions.idPropertyName];
        return !!node && typeof id !== 'undefined' && !!expansionsMap[id];
    }, [expansionsMap, treeOptions.idPropertyName]);
    const setExpandedId = react_1.default.useCallback((id, expanded) => {
        if (typeof id !== 'undefined') {
            let changed = false;
            const newExpansionsMap = Object.assign({}, expansionsMap);
            if (expanded && !newExpansionsMap[id]) {
                newExpansionsMap[id] = true;
                changed = true;
            }
            else if (!expanded && !!newExpansionsMap[id]) {
                delete newExpansionsMap[id];
                changed = true;
            }
            if (changed) {
                setExpansionsMap(newExpansionsMap);
            }
        }
    }, [expansionsMap, setExpansionsMap]);
    const setExpandedNode = react_1.default.useCallback((node, expanded) => {
        setExpandedId(node === null || node === void 0 ? void 0 : node.getData()[treeOptions.idPropertyName], expanded);
    }, [setExpandedId, treeOptions.idPropertyName]);
    const toggleExpandNode = react_1.default.useCallback((node, expand) => {
        if (node) {
            const expanded = isExpandedNode(node);
            const newState = typeof expand !== 'undefined' ? expand : !expanded;
            if (expanded !== newState) {
                setExpandedNode(node, newState);
            }
        }
    }, [isExpandedNode, setExpandedNode]);
    const expandAll = react_1.default.useCallback(() => {
        const newExpansionsMap = Object.assign({}, expansionsMap);
        tree.walk((node) => {
            if (node.hasChildren()) {
                newExpansionsMap[node.getData()[treeOptions.idPropertyName]] = true;
            }
        });
        setExpansionsMap(newExpansionsMap);
    }, [expansionsMap, setExpansionsMap, tree, treeOptions.idPropertyName]);
    const collapseAll = react_1.default.useCallback(() => {
        setExpansionsMap({});
    }, [setExpansionsMap]);
    const expansions = react_1.default.useMemo(() => ({
        expansionsMap: expansionsMap,
        setExpansionsMap,
        isExpandedId,
        isExpandedNode,
        setExpandedId,
        setExpandedNode,
        toggleExpandNode,
        expandAll,
        collapseAll,
    }), [
        collapseAll,
        expandAll,
        expansionsMap,
        isExpandedId,
        isExpandedNode,
        setExpandedId,
        setExpandedNode,
        setExpansionsMap,
        toggleExpandNode,
    ]);
    return expansions;
};
exports.useTreeExpansions = useTreeExpansions;
