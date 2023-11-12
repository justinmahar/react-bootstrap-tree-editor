"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTreeFocus = void 0;
const react_1 = __importDefault(require("react"));
const useTreeController_1 = require("./useTreeController");
const useTreeFocus = (tree, expansions, treeOptions) => {
    const [focusedId, setFocusedId] = react_1.default.useState(useTreeController_1.UNDEFINED_ID);
    const focusedNode = react_1.default.useMemo(() => tree.findById(focusedId, treeOptions.idPropertyName), [tree, focusedId, treeOptions.idPropertyName]);
    const isFocusedId = react_1.default.useCallback((id) => typeof id !== 'undefined' && focusedId === id, [focusedId]);
    const isFocusedNode = react_1.default.useCallback((treeNode) => focusedNode &&
        treeNode &&
        typeof focusedNode.getData()[treeOptions.idPropertyName] !== undefined &&
        typeof treeNode.getData()[treeOptions.idPropertyName] !== undefined &&
        focusedNode.getData()[treeOptions.idPropertyName] === treeNode.getData()[treeOptions.idPropertyName], [focusedNode, treeOptions.idPropertyName]);
    const setFocusedNode = react_1.default.useCallback((treeNode) => {
        const id = treeNode === null || treeNode === void 0 ? void 0 : treeNode.getData()[treeOptions.idPropertyName];
        if (treeNode && typeof id !== 'undefined') {
            setFocusedId(id);
        }
        else {
            setFocusedId(useTreeController_1.UNDEFINED_ID);
        }
    }, [treeOptions.idPropertyName]);
    const focusUp = react_1.default.useCallback(() => {
        var _a, _b, _c;
        const treeChildren = tree.getChildren();
        let upFocusId = useTreeController_1.UNDEFINED_ID;
        if (focusedNode) {
            const leftSibling = focusedNode.getLeftSibling();
            // If there's an immediate left sibling...
            if (leftSibling) {
                // Focus the youngest last expanded child of the sibling (or the sibling itself)
                let youngestChild = leftSibling;
                while (expansions.isExpandedNode(youngestChild) && youngestChild.hasChildren()) {
                    youngestChild = youngestChild.getChildren()[youngestChild.getChildren().length - 1];
                }
                upFocusId = (_a = youngestChild.getData()[treeOptions.idPropertyName]) !== null && _a !== void 0 ? _a : useTreeController_1.UNDEFINED_ID;
            }
            // Otherwise, if there's a parent, focus that
            else if (focusedNode.getParent()) {
                upFocusId = (_c = (_b = focusedNode.getParent()) === null || _b === void 0 ? void 0 : _b.getData()[treeOptions.idPropertyName]) !== null && _c !== void 0 ? _c : useTreeController_1.UNDEFINED_ID;
            }
        }
        else if (treeChildren.length > 0) {
            upFocusId = treeChildren[0].getData()[treeOptions.idPropertyName];
        }
        if (upFocusId !== useTreeController_1.UNDEFINED_ID) {
            setFocusedId(upFocusId);
        }
    }, [expansions, focusedNode, tree, treeOptions.idPropertyName]);
    const focusDown = react_1.default.useCallback(() => {
        var _a, _b, _c, _d;
        const treeChildren = tree.getChildren();
        let downFocusId = useTreeController_1.UNDEFINED_ID;
        if (focusedNode) {
            // If expanded and has children, focus first child
            if (expansions.isExpandedNode(focusedNode) && focusedNode.hasChildren()) {
                downFocusId = (_a = focusedNode.getChildren()[0].getData()[treeOptions.idPropertyName]) !== null && _a !== void 0 ? _a : useTreeController_1.UNDEFINED_ID;
            }
            // If there's an immediate right sibling, focus that
            else if (focusedNode.getRightSibling()) {
                downFocusId = (_c = (_b = focusedNode.getRightSibling()) === null || _b === void 0 ? void 0 : _b.getData()[treeOptions.idPropertyName]) !== null && _c !== void 0 ? _c : useTreeController_1.UNDEFINED_ID;
            }
            // Otherwise, find the immediate right sibling to the closest ancestor and focus that
            else {
                let parent = focusedNode.getParent();
                while (parent) {
                    const parentRightSibling = parent.getRightSibling();
                    if (parentRightSibling) {
                        downFocusId = (_d = parentRightSibling.getData()[treeOptions.idPropertyName]) !== null && _d !== void 0 ? _d : useTreeController_1.UNDEFINED_ID;
                        break;
                    }
                    else {
                        parent = parent.getParent();
                    }
                }
            }
        }
        else if (treeChildren.length > 0) {
            downFocusId = treeChildren[0].getData()[treeOptions.idPropertyName];
        }
        if (downFocusId !== useTreeController_1.UNDEFINED_ID) {
            setFocusedId(downFocusId);
        }
    }, [expansions, focusedNode, tree, treeOptions.idPropertyName]);
    const focusRight = react_1.default.useCallback(() => {
        var _a;
        const treeChildren = tree.getChildren();
        let rightFocusId = useTreeController_1.UNDEFINED_ID;
        if (focusedNode) {
            if (focusedNode.hasChildren()) {
                rightFocusId = (_a = focusedNode.getChildren()[0].getData()[treeOptions.idPropertyName]) !== null && _a !== void 0 ? _a : useTreeController_1.UNDEFINED_ID;
            }
        }
        else if (treeChildren.length > 0) {
            rightFocusId = treeChildren[0].getData()[treeOptions.idPropertyName];
        }
        if (rightFocusId !== useTreeController_1.UNDEFINED_ID) {
            setFocusedId(rightFocusId);
        }
    }, [focusedNode, tree, treeOptions.idPropertyName]);
    const focusLeft = react_1.default.useCallback(() => {
        var _a, _b;
        const treeChildren = tree.getChildren();
        let leftFocusId = useTreeController_1.UNDEFINED_ID;
        if (focusedNode) {
            if (focusedNode.hasParent()) {
                leftFocusId = (_b = (_a = focusedNode.getParent()) === null || _a === void 0 ? void 0 : _a.getData()[treeOptions.idPropertyName]) !== null && _b !== void 0 ? _b : useTreeController_1.UNDEFINED_ID;
            }
        }
        else if (treeChildren.length > 0) {
            leftFocusId = treeChildren[0].getData()[treeOptions.idPropertyName];
        }
        if (leftFocusId !== useTreeController_1.UNDEFINED_ID) {
            setFocusedId(leftFocusId);
        }
    }, [focusedNode, tree, treeOptions.idPropertyName]);
    return react_1.default.useMemo(() => ({
        focusedId,
        setFocusedId,
        isFocusedId,
        focusedNode,
        isFocusedNode,
        setFocusedNode,
        focusUp,
        focusDown,
        focusRight,
        focusLeft,
    }), [focusDown, focusLeft, focusRight, focusUp, focusedId, focusedNode, isFocusedId, isFocusedNode, setFocusedNode]);
};
exports.useTreeFocus = useTreeFocus;
