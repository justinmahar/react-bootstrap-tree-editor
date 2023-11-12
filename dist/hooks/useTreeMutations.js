"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTreeMutations = void 0;
const react_1 = __importDefault(require("react"));
const versatile_tree_1 = require("versatile-tree");
const useTreeController_1 = require("./useTreeController");
const useTreeMutations = (tree, setTree, treeOptions) => {
    const [deletions, setDeletions] = react_1.default.useState([]);
    const deleteNode = react_1.default.useCallback((nodeOrId) => {
        var _a;
        const node = typeof nodeOrId === 'string' ? tree.findById(nodeOrId, treeOptions.idPropertyName) : nodeOrId;
        if (node) {
            const root = node.getRoot();
            const parent = node.getParent();
            const index = node.getIndex();
            node.removeParent();
            // Store the deleted node in case we want to recover it
            const clonedNode = node.clone();
            setDeletions([
                ...deletions,
                {
                    parentId: (_a = parent === null || parent === void 0 ? void 0 : parent.getData()[treeOptions.idPropertyName]) !== null && _a !== void 0 ? _a : useTreeController_1.UNDEFINED_ID,
                    data: clonedNode.toObject(),
                    index,
                },
            ]);
            setTree(root);
        }
    }, [deletions, setTree, tree, treeOptions.idPropertyName]);
    const recoverDeletion = react_1.default.useCallback(() => {
        var _a;
        let recoveredNode = undefined;
        if (deletions.length > 0) {
            const deletionInfo = deletions[deletions.length - 1];
            const deletionNode = new versatile_tree_1.TreeNode(deletionInfo.data);
            const parentNode = (_a = tree.findById(deletionInfo.parentId, treeOptions.idPropertyName)) !== null && _a !== void 0 ? _a : tree;
            parentNode.addChildNode(deletionNode, deletionInfo.index);
            recoveredNode = deletionNode;
            const newDeletions = deletions.slice(0, deletions.length - 1);
            setDeletions(newDeletions);
            setTree(tree);
        }
        return recoveredNode;
    }, [deletions, setTree, tree, treeOptions.idPropertyName]);
    const updateNode = react_1.default.useCallback((nodeOrId, dataPartial) => {
        const node = typeof nodeOrId === 'string' ? tree.findById(nodeOrId, treeOptions.idPropertyName) : nodeOrId;
        if (node) {
            node.setData(Object.assign(Object.assign({}, node.getData()), dataPartial));
            const root = node.getRoot();
            setTree(root);
        }
    }, [setTree, tree, treeOptions.idPropertyName]);
    const addSiblingNodeData = react_1.default.useCallback((nodeOrId, data) => {
        let newNode = undefined;
        const node = typeof nodeOrId === 'string' ? tree.findById(nodeOrId, treeOptions.idPropertyName) : nodeOrId;
        if (node && !node.isRoot()) {
            newNode = new versatile_tree_1.TreeNode(data, node.getOptions());
            node.addSiblingNode(newNode, node.getIndex() + 1);
            const root = node.getRoot();
            setTree(root);
        }
        return newNode;
    }, [setTree, tree, treeOptions.idPropertyName]);
    const addChildNodeData = react_1.default.useCallback((nodeOrId, data) => {
        let newNode = undefined;
        const node = typeof nodeOrId === 'string' ? tree.findById(nodeOrId, treeOptions.idPropertyName) : nodeOrId;
        if (node) {
            newNode = new versatile_tree_1.TreeNode(data, node.getOptions());
            node.addChildNode(newNode, 0);
            const root = node.getRoot();
            setTree(root);
        }
        return newNode;
    }, [setTree, tree, treeOptions.idPropertyName]);
    const moveNodeLeft = react_1.default.useCallback((nodeOrId) => {
        const node = typeof nodeOrId === 'string' ? tree.findById(nodeOrId, treeOptions.idPropertyName) : nodeOrId;
        if (node) {
            const root = node.getRoot();
            const parent = node.getParent();
            if (!(parent === null || parent === void 0 ? void 0 : parent.isRoot())) {
                node.removeParent();
                parent === null || parent === void 0 ? void 0 : parent.addSiblingNode(node, parent.getIndex() + 1);
                setTree(root);
            }
        }
    }, [setTree, tree, treeOptions.idPropertyName]);
    const moveNodeDown = react_1.default.useCallback((nodeOrId) => {
        const node = typeof nodeOrId === 'string' ? tree.findById(nodeOrId, treeOptions.idPropertyName) : nodeOrId;
        if (node) {
            const root = node.getRoot();
            const rightSibling = node.getRightSibling();
            const parent = node.getParent();
            if (rightSibling) {
                node.removeParent();
                rightSibling.addSiblingNode(node, rightSibling.getIndex() + 1);
                setTree(root);
            }
            else if (parent && !parent.isRoot()) {
                node.removeParent();
                parent.addSiblingNode(node, parent.getIndex() + 1);
                setTree(root);
            }
        }
    }, [setTree, tree, treeOptions.idPropertyName]);
    const moveNodeUp = react_1.default.useCallback((nodeOrId) => {
        const node = typeof nodeOrId === 'string' ? tree.findById(nodeOrId, treeOptions.idPropertyName) : nodeOrId;
        if (node) {
            const root = node.getRoot();
            const leftSibling = node.getLeftSibling();
            const parent = node.getParent();
            if (leftSibling) {
                node.removeParent();
                leftSibling.addSiblingNode(node, leftSibling.getIndex());
                setTree(root);
            }
            else if (parent && !parent.isRoot()) {
                node.removeParent();
                parent.addSiblingNode(node, parent.getIndex());
                setTree(root);
            }
        }
    }, [setTree, tree, treeOptions.idPropertyName]);
    const moveNodeRight = react_1.default.useCallback((nodeOrId) => {
        const node = typeof nodeOrId === 'string' ? tree.findById(nodeOrId, treeOptions.idPropertyName) : nodeOrId;
        if (node) {
            const root = node.getRoot();
            const leftSibling = node.getLeftSibling();
            if (leftSibling) {
                node.removeParent();
                leftSibling.addChildNode(node);
                setTree(root);
            }
        }
    }, [setTree, tree, treeOptions.idPropertyName]);
    return react_1.default.useMemo(() => ({
        deleteNode,
        deletions,
        recoverDeletion,
        updateNode,
        addSiblingNodeData,
        addChildNodeData,
        moveNodeLeft,
        moveNodeDown,
        moveNodeUp,
        moveNodeRight,
    }), [
        addChildNodeData,
        addSiblingNodeData,
        deleteNode,
        deletions,
        moveNodeDown,
        moveNodeLeft,
        moveNodeRight,
        moveNodeUp,
        recoverDeletion,
        updateNode,
    ]);
};
exports.useTreeMutations = useTreeMutations;
