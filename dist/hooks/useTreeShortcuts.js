"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTreeShortcuts = exports.useTreeShortcuts = void 0;
const react_1 = __importDefault(require("react"));
const react_device_detect_1 = require("react-device-detect");
const react_sub_unsub_1 = require("react-sub-unsub");
const utils_1 = require("../utils/utils");
const useTreeShortcuts = (treeController, domObj, treeShortcuts = exports.defaultTreeShortcuts) => {
    const shortcuts = react_1.default.useMemo(() => treeShortcuts, []); // Do not add treeShortcuts as dep as it highly likely changes on every render
    react_1.default.useEffect(() => {
        const keyDownListener = (e) => {
            // For debugging:
            // console.log('Code:', e.code, 'Key:', e.key);
            var _a, _b;
            // Focus up
            if (shortcuts.focusUpShortcutCheck(e)) {
                e.preventDefault();
                e.stopPropagation();
                treeController.focus.focusUp();
            }
            // Focus down
            else if (shortcuts.focusDownShortcutCheck(e)) {
                e.preventDefault();
                e.stopPropagation();
                treeController.focus.focusDown();
            }
            // Move up
            else if (shortcuts.moveNodeUpCheck(e)) {
                e.preventDefault();
                e.stopPropagation();
                treeController.mutations.moveNodeUp(treeController.focus.focusedNode);
            }
            // Move down
            else if (shortcuts.moveNodeDownCheck(e)) {
                e.preventDefault();
                e.stopPropagation();
                treeController.mutations.moveNodeDown(treeController.focus.focusedNode);
            }
            // Move out
            else if (shortcuts.moveNodeLeftCheck(e)) {
                e.preventDefault();
                e.stopPropagation();
                treeController.mutations.moveNodeLeft(treeController.focus.focusedNode);
            }
            // Move in
            else if (shortcuts.moveNodeRightCheck(e)) {
                e.preventDefault();
                e.stopPropagation();
                treeController.mutations.moveNodeRight(treeController.focus.focusedNode);
            }
            // Expand
            else if (shortcuts.toggleExpandNodeCheck(e)) {
                e.preventDefault();
                e.stopPropagation();
                treeController.expansions.toggleExpandNode(treeController.focus.focusedNode);
            }
            // Expand all
            else if (shortcuts.expandAllCheck(e)) {
                e.preventDefault();
                e.stopPropagation();
                treeController.expansions.expandAll();
            }
            // Collapse all
            else if (shortcuts.collapseAllCheck(e)) {
                e.preventDefault();
                e.stopPropagation();
                treeController.expansions.collapseAll();
            }
            // New item below
            else if (shortcuts.newItemBelowCheck(e)) {
                e.preventDefault();
                e.stopPropagation();
                const focusedNode = treeController.focus.focusedNode;
                if (focusedNode) {
                    const newNodeData = treeController.options.createNewData();
                    const newNode = treeController.mutations.addSiblingNodeData(focusedNode, newNodeData);
                    treeController.focus.setFocusedNode(newNode);
                }
            }
            // New item inside
            else if (shortcuts.newItemInsideCheck(e)) {
                e.preventDefault();
                e.stopPropagation();
                const focusedNode = treeController.focus.focusedNode;
                if (focusedNode) {
                    const newNodeData = treeController.options.createNewData();
                    const newNode = treeController.mutations.addChildNodeData(focusedNode, newNodeData);
                    treeController.focus.setFocusedNode(newNode);
                }
            }
            // Delete only if title is empty
            else if (shortcuts.deleteItemIfEmptyCheck(e)) {
                const focusedNode = treeController.focus.focusedNode;
                const nodeName = focusedNode === null || focusedNode === void 0 ? void 0 : focusedNode.getData()[treeController.options.titlePropertyName];
                if (focusedNode) {
                    if (typeof nodeName === 'string' && nodeName.length === 0) {
                        const nextFocusNode = focusedNode.getLeftSibling()
                            ? focusedNode.getLeftSibling()
                            : focusedNode.getRightSibling()
                                ? focusedNode.getRightSibling()
                                : focusedNode.getParent() && !((_a = focusedNode.getParent()) === null || _a === void 0 ? void 0 : _a.isRoot())
                                    ? focusedNode.getParent()
                                    : undefined;
                        treeController.mutations.deleteNode(focusedNode);
                        treeController.focus.setFocusedNode(nextFocusNode);
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }
            }
            // Delete
            else if (shortcuts.deleteItemCheck(e)) {
                const focusedNode = treeController.focus.focusedNode;
                if (focusedNode) {
                    e.preventDefault();
                    e.stopPropagation();
                    const nextFocusNode = !focusedNode
                        ? undefined
                        : focusedNode.getLeftSibling()
                            ? focusedNode.getLeftSibling()
                            : focusedNode.getRightSibling()
                                ? focusedNode.getRightSibling()
                                : focusedNode.getParent() && !((_b = focusedNode.getParent()) === null || _b === void 0 ? void 0 : _b.isRoot())
                                    ? focusedNode.getParent()
                                    : undefined;
                    treeController.mutations.deleteNode(treeController.focus.focusedNode);
                    treeController.focus.setFocusedNode(nextFocusNode);
                }
            }
            // Recover last deleted item
            else if (shortcuts.recoverDeletionCheck(e)) {
                e.preventDefault();
                e.stopPropagation();
                const recoveredNode = treeController.mutations.recoverDeletion();
                treeController.focus.setFocusedNode(recoveredNode);
            }
        };
        const subs = new react_sub_unsub_1.Subs();
        subs.subscribeDOMEvent(domObj, 'keydown', keyDownListener);
        return subs.createCleanup();
    }, [
        treeController.expansions,
        treeController.focus,
        treeController.mutations,
        treeController.options,
        shortcuts,
        domObj,
    ]);
    return shortcuts;
};
exports.useTreeShortcuts = useTreeShortcuts;
exports.defaultTreeShortcuts = {
    focusUpShortcutDisplay: 'Up',
    focusUpShortcutCheck: (e) => e.code === utils_1.KeyCode.CODE_UP && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey,
    focusDownShortcutDisplay: 'Down',
    focusDownShortcutCheck: (e) => e.code === utils_1.KeyCode.CODE_DOWN && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey,
    moveNodeUpDisplay: 'Ctrl+Shift+Up',
    moveNodeUpCheck: (e) => e.code === utils_1.KeyCode.CODE_UP && e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey,
    moveNodeDownDisplay: 'Ctrl+Shift+Down',
    moveNodeDownCheck: (e) => e.code === utils_1.KeyCode.CODE_DOWN && e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey,
    moveNodeLeftDisplay: 'Ctrl+Shift+Left',
    moveNodeLeftCheck: (e) => e.code === utils_1.KeyCode.CODE_LEFT && e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey,
    moveNodeRightDisplay: 'Ctrl+Shift+Right',
    moveNodeRightCheck: (e) => e.code === utils_1.KeyCode.CODE_RIGHT && e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey,
    toggleExpandNodeDisplay: 'Ctrl+Shift+X',
    toggleExpandNodeCheck: (e) => e.code === utils_1.KeyCode.CODE_X && e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey,
    expandAllDisplay: 'Ctrl+Shift+⌘+X',
    expandAllCheck: (e) => e.code === utils_1.KeyCode.CODE_X && e.shiftKey && e.ctrlKey && !e.altKey && e.metaKey,
    collapseAllDisplay: 'Ctrl+Shift+⌘+C',
    collapseAllCheck: (e) => e.code === utils_1.KeyCode.CODE_C && e.shiftKey && e.ctrlKey && !e.altKey && e.metaKey,
    newItemBelowDisplay: 'Enter',
    newItemBelowCheck: (e) => e.code === utils_1.KeyCode.CODE_ENTER && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey,
    newItemInsideDisplay: 'Shift+Enter',
    newItemInsideCheck: (e) => e.code === utils_1.KeyCode.CODE_ENTER && e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey,
    deleteItemIfEmptyDisplay: '⌫',
    deleteItemIfEmptyCheck: (e) => e.code === utils_1.KeyCode.CODE_BACK_SPACE && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey,
    deleteItemDisplay: react_device_detect_1.isMacOs ? '⌘+⌫' : 'Ctrl+Delete',
    deleteItemCheck: (e) => react_device_detect_1.isMacOs
        ? e.code === utils_1.KeyCode.CODE_BACK_SPACE && !e.shiftKey && !e.ctrlKey && !e.altKey && e.metaKey
        : e.code === utils_1.KeyCode.CODE_DELETE && !e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey,
    recoverDeletionDisplay: react_device_detect_1.isMacOs ? '⌘+⌥+⌫' : 'Ctrl+Shift+Z',
    recoverDeletionCheck: (e) => react_device_detect_1.isMacOs
        ? e.code === utils_1.KeyCode.CODE_BACK_SPACE && !e.shiftKey && !e.ctrlKey && e.altKey && e.metaKey
        : e.code === utils_1.KeyCode.CODE_Z && e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey,
};
