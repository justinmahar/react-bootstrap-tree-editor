"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicTreeNodeDropdown = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const fa_1 = require("react-icons/fa");
const styled_components_1 = __importDefault(require("styled-components"));
const useTreeController_1 = require("../hooks/useTreeController");
const BasicTreeNodeDropdown = (_a) => {
    var _b, _c;
    var { node, treeController, shortcuts } = _a, props = __rest(_a, ["node", "treeController", "shortcuts"]);
    const [showDeletionPrompt, setShowDeletionPrompt] = react_1.default.useState(false);
    const isExpanded = treeController.expansions.isExpandedNode(node);
    const handlePromptDeleteEntry = () => {
        if (!node.getData()[treeController.options.titlePropertyName]) {
            handleConfirmDeleteEntry();
        }
        else {
            setShowDeletionPrompt(true);
            treeController.focus.setFocusedNode(node);
        }
    };
    const handleConfirmDeleteEntry = () => {
        treeController.mutations.deleteNode(node);
        setShowDeletionPrompt(false);
    };
    const handleCancelDeleteEntry = () => {
        setShowDeletionPrompt(false);
        treeController.focus.setFocusedNode(node);
    };
    //
    const handleMoveLeft = react_1.default.useCallback(() => {
        treeController.mutations.moveNodeLeft(node);
    }, [treeController.mutations, node]);
    const handleMoveDown = react_1.default.useCallback(() => {
        treeController.mutations.moveNodeDown(node);
    }, [treeController.mutations, node]);
    const handleMoveUp = react_1.default.useCallback(() => {
        treeController.mutations.moveNodeUp(node);
    }, [treeController.mutations, node]);
    const handleMoveRight = react_1.default.useCallback(() => {
        treeController.mutations.moveNodeRight(node);
    }, [treeController.mutations, node]);
    const handleNewItemBelow = () => {
        const newNodeData = treeController.options.createNewData();
        const newNode = treeController.mutations.addSiblingNodeData(node, newNodeData);
        treeController.focus.setFocusedNode(newNode);
    };
    const handleNewItemInside = () => {
        const newNodeData = treeController.options.createNewData();
        const newNode = treeController.mutations.addChildNodeData(node, newNodeData);
        treeController.focus.setFocusedNode(newNode);
    };
    const handleEllipsisMouseDown = () => {
        setShowDeletionPrompt(false);
    };
    const handleToggleExpand = () => {
        treeController.expansions.toggleExpandNode(node);
    };
    const handleExpandAll = () => {
        treeController.expansions.expandAll();
    };
    const handleCollapseAll = () => {
        treeController.expansions.collapseAll();
    };
    const dropdownItemClassName = 'd-flex justify-content-between align-items-center gap-4 small w-100';
    const dropdownItemLabelClassName = 'd-flex align-items-center gap-2';
    const dropdownItemShortcutClassName = 'd-flex align-items-center small text-muted';
    return (react_1.default.createElement("div", Object.assign({}, props, { className: (0, classnames_1.default)(props.className), style: Object.assign({}, props.style) }),
        react_1.default.createElement(NoCaretAfterToggle, null,
            react_1.default.createElement(react_bootstrap_1.Dropdown, null,
                react_1.default.createElement(react_bootstrap_1.Dropdown.Toggle, { variant: "success", id: `dropdown-menu-${(_b = node.getData()[treeController.options.idPropertyName]) !== null && _b !== void 0 ? _b : useTreeController_1.UNDEFINED_ID}`, as: "div", className: "cursor-pointer", onMouseDown: () => handleEllipsisMouseDown(), onTouchStartCapture: () => handleEllipsisMouseDown() },
                    react_1.default.createElement(fa_1.FaEllipsisV, null)),
                react_1.default.createElement(react_bootstrap_1.Dropdown.Menu, null,
                    react_1.default.createElement(react_bootstrap_1.Dropdown.Item, { className: dropdownItemClassName, onClick: () => handleNewItemBelow(), disabled: false },
                        react_1.default.createElement("div", { className: dropdownItemLabelClassName },
                            react_1.default.createElement(fa_1.FaPlus, null),
                            " New item below"),
                        react_1.default.createElement("div", { className: dropdownItemShortcutClassName }, shortcuts === null || shortcuts === void 0 ? void 0 : shortcuts.newItemBelowDisplay)),
                    react_1.default.createElement(react_bootstrap_1.Dropdown.Item, { className: dropdownItemClassName, onClick: () => handleNewItemInside(), disabled: false },
                        react_1.default.createElement("div", { className: dropdownItemLabelClassName },
                            react_1.default.createElement(fa_1.FaRegPlusSquare, null),
                            " New item inside"),
                        react_1.default.createElement("div", { className: dropdownItemShortcutClassName }, shortcuts === null || shortcuts === void 0 ? void 0 : shortcuts.newItemInsideDisplay)),
                    react_1.default.createElement(react_bootstrap_1.Dropdown.Divider, null),
                    react_1.default.createElement(react_bootstrap_1.Dropdown.Item, { className: dropdownItemClassName, onClick: () => handleMoveUp(), disabled: !node.getLeftSibling() },
                        react_1.default.createElement("div", { className: dropdownItemLabelClassName },
                            react_1.default.createElement(fa_1.FaArrowUp, null),
                            " Move up"),
                        react_1.default.createElement("div", { className: dropdownItemShortcutClassName }, shortcuts === null || shortcuts === void 0 ? void 0 : shortcuts.moveNodeUpDisplay)),
                    react_1.default.createElement(react_bootstrap_1.Dropdown.Item, { className: dropdownItemClassName, onClick: () => handleMoveDown(), disabled: !node.getRightSibling() },
                        react_1.default.createElement("div", { className: dropdownItemLabelClassName },
                            react_1.default.createElement(fa_1.FaArrowDown, null),
                            " Move down"),
                        react_1.default.createElement("div", { className: dropdownItemShortcutClassName }, shortcuts === null || shortcuts === void 0 ? void 0 : shortcuts.moveNodeDownDisplay)),
                    react_1.default.createElement(react_bootstrap_1.Dropdown.Item, { className: dropdownItemClassName, onClick: () => handleMoveLeft(), disabled: !!((_c = node.getParent()) === null || _c === void 0 ? void 0 : _c.isRoot()) },
                        react_1.default.createElement("div", { className: dropdownItemLabelClassName },
                            react_1.default.createElement(fa_1.FaArrowLeft, null),
                            " Move out"),
                        react_1.default.createElement("div", { className: dropdownItemShortcutClassName }, shortcuts === null || shortcuts === void 0 ? void 0 : shortcuts.moveNodeLeftDisplay)),
                    react_1.default.createElement(react_bootstrap_1.Dropdown.Item, { className: dropdownItemClassName, onClick: () => handleMoveRight(), disabled: !node.getLeftSibling() },
                        react_1.default.createElement("div", { className: dropdownItemLabelClassName },
                            react_1.default.createElement(fa_1.FaArrowRight, null),
                            " Move in"),
                        react_1.default.createElement("div", { className: dropdownItemShortcutClassName }, shortcuts === null || shortcuts === void 0 ? void 0 : shortcuts.moveNodeRightDisplay)),
                    react_1.default.createElement(react_bootstrap_1.Dropdown.Divider, null),
                    react_1.default.createElement(react_bootstrap_1.Dropdown.Item, { className: dropdownItemClassName, onClick: () => handleToggleExpand(), disabled: !isExpanded && !node.hasChildren() },
                        react_1.default.createElement("div", { className: dropdownItemLabelClassName },
                            isExpanded && (react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement(fa_1.FaCompressAlt, { style: { transform: 'rotate(135deg)' } }),
                                " Collapse")),
                            !isExpanded && (react_1.default.createElement(react_1.default.Fragment, null,
                                react_1.default.createElement(fa_1.FaArrowsAltV, null),
                                " Expand"))),
                        react_1.default.createElement("div", { className: dropdownItemShortcutClassName }, shortcuts === null || shortcuts === void 0 ? void 0 : shortcuts.toggleExpandNodeDisplay)),
                    react_1.default.createElement(react_bootstrap_1.Dropdown.Item, { className: dropdownItemClassName, onClick: () => handleExpandAll() },
                        react_1.default.createElement("div", { className: dropdownItemLabelClassName },
                            react_1.default.createElement(fa_1.FaExpandArrowsAlt, null),
                            " Expand all"),
                        react_1.default.createElement("div", { className: dropdownItemShortcutClassName }, shortcuts === null || shortcuts === void 0 ? void 0 : shortcuts.expandAllDisplay)),
                    react_1.default.createElement(react_bootstrap_1.Dropdown.Item, { className: dropdownItemClassName, onClick: () => handleCollapseAll() },
                        react_1.default.createElement("div", { className: dropdownItemLabelClassName },
                            react_1.default.createElement(fa_1.FaCompressArrowsAlt, null),
                            " Collapse all"),
                        react_1.default.createElement("div", { className: dropdownItemShortcutClassName }, shortcuts === null || shortcuts === void 0 ? void 0 : shortcuts.collapseAllDisplay)),
                    react_1.default.createElement(react_bootstrap_1.Dropdown.Divider, null),
                    treeController.mutations.deletions.length > 0 && (react_1.default.createElement(react_bootstrap_1.Dropdown.Item, { className: (0, classnames_1.default)(dropdownItemClassName), onClick: () => {
                            const recoveredNode = treeController.mutations.recoverDeletion();
                            treeController.focus.setFocusedNode(recoveredNode);
                        } },
                        react_1.default.createElement("div", { className: dropdownItemLabelClassName },
                            react_1.default.createElement(fa_1.FaTrashRestoreAlt, null),
                            " Recover"),
                        react_1.default.createElement("div", { className: dropdownItemShortcutClassName }, shortcuts === null || shortcuts === void 0 ? void 0 : shortcuts.recoverDeletionDisplay))),
                    !showDeletionPrompt && (react_1.default.createElement(react_bootstrap_1.Dropdown.Item, { className: dropdownItemClassName, onClick: (e) => {
                            handlePromptDeleteEntry();
                            e.preventDefault();
                            e.stopPropagation();
                        } },
                        react_1.default.createElement("div", { className: dropdownItemLabelClassName },
                            react_1.default.createElement(fa_1.FaTrashAlt, null),
                            " Delete"),
                        react_1.default.createElement("div", { className: dropdownItemShortcutClassName }, shortcuts === null || shortcuts === void 0 ? void 0 : shortcuts.deleteItemDisplay))),
                    showDeletionPrompt && (react_1.default.createElement(react_bootstrap_1.Dropdown.Item, { className: (0, classnames_1.default)(dropdownItemClassName, 'text-danger'), onClick: () => handleConfirmDeleteEntry() },
                        react_1.default.createElement("div", { className: dropdownItemLabelClassName },
                            react_1.default.createElement(fa_1.FaCheckCircle, null),
                            " Confirm"),
                        react_1.default.createElement("div", { className: dropdownItemShortcutClassName }))),
                    showDeletionPrompt && (react_1.default.createElement(react_bootstrap_1.Dropdown.Item, { className: (0, classnames_1.default)(dropdownItemClassName, 'text-secondary'), onClick: () => handleCancelDeleteEntry() },
                        react_1.default.createElement("div", { className: dropdownItemLabelClassName },
                            react_1.default.createElement(fa_1.FaTimesCircle, null),
                            " Cancel",
                            ' '),
                        react_1.default.createElement("div", { className: dropdownItemShortcutClassName }))))))));
};
exports.BasicTreeNodeDropdown = BasicTreeNodeDropdown;
const NoCaretAfterToggle = styled_components_1.default.div `
  .dropdown-toggle::after {
    display: none;
  }
`;
