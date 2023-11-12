"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTreeState = exports.UNDEFINED_ID = void 0;
const react_1 = __importDefault(require("react"));
const versatile_tree_1 = require("versatile-tree");
const TreeControllerOptions_1 = require("./TreeControllerOptions");
exports.UNDEFINED_ID = 'UNDEFINED_ID';
const defaultTreeData = {
    [TreeControllerOptions_1.defaultTreeControllerOptions.titlePropertyName]: 'root',
    children: [],
};
const useTreeState = (initial) => {
    const [treeDataStored, setTreeData] = react_1.default.useState(initial);
    const treeData = react_1.default.useMemo(() => (!treeDataStored ? defaultTreeData : treeDataStored), [treeDataStored]);
    const tree = react_1.default.useMemo(() => new versatile_tree_1.Tree(treeData), [treeData]);
    const setTree = react_1.default.useCallback((newTree) => {
        setTreeData(newTree.toObject());
    }, [setTreeData]);
    return react_1.default.useMemo(() => [tree, setTree], [setTree, tree]);
};
exports.useTreeState = useTreeState;
