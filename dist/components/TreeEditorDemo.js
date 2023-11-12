"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeEditorDemo = void 0;
const React = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const react_sub_unsub_1 = require("react-sub-unsub");
const BasicTreeNodeComponent_1 = require("./BasicTreeNodeComponent");
const TreeControllerOptions_1 = require("../hooks/TreeControllerOptions");
const useTreeState_1 = require("../hooks/useTreeState");
const useTreeController_1 = require("../hooks/useTreeController");
const useTreeShortcuts_1 = require("../hooks/useTreeShortcuts");
const utils_1 = require("../utils/utils");
const TreeEditorDemo = (props) => {
    const [treeEditingEnabled, setTreeEditingEnabled] = React.useState(true);
    const treeOptions = TreeControllerOptions_1.defaultTreeControllerOptions;
    const [tree, setTree] = (0, useTreeState_1.useTreeState)(useTreeState_1.defaultTreeData);
    const treeController = (0, useTreeController_1.useTreeController)(tree, setTree, treeOptions);
    const [enteredSearch, setEnteredSearch] = React.useState('');
    const trimmedEnteredSearch = enteredSearch.trim();
    const shortcuts = (0, useTreeShortcuts_1.useTreeShortcuts)(treeController, document);
    const handleSearchFocus = () => {
        treeController.focus.setFocusedNode(undefined);
    };
    React.useEffect(() => {
        const keyDownListener = (e) => {
            // For debugging:
            // console.log('Code:', e.code, 'Key:', e.key);
            // Ctrl+Shift+E = Toggle edit/view mode
            if (e.code === utils_1.KeyCode.CODE_E && e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey) {
                e.preventDefault();
                e.stopPropagation();
                setTreeEditingEnabled(!treeEditingEnabled);
            }
        };
        const subs = new react_sub_unsub_1.Subs();
        subs.subscribeDOMEvent(document, 'keydown', keyDownListener);
        return subs.createCleanup();
    });
    // Ensure there's always at least one item to edit
    React.useEffect(() => {
        if (!treeController.tree.hasChildren()) {
            const newNodeData = treeController.options.createNewData();
            const node = treeController.mutations.addChildNodeData(treeController.tree, newNodeData);
            treeController.focus.setFocusedNode(node);
        }
    }, [treeController.focus, treeController.mutations, treeController.tree, treeController.options]);
    React.useEffect(() => {
        const subs = new react_sub_unsub_1.Subs();
        if (trimmedEnteredSearch) {
            const newFilter = (node) => !!node &&
                node.getData()[treeOptions.titlePropertyName] &&
                node.getData()[treeOptions.titlePropertyName].toLowerCase().includes(enteredSearch.toLowerCase());
            treeController.filters.setFilter(newFilter);
        }
        else {
            treeController.filters.setFilter(undefined);
        }
        return subs.createCleanup();
    }, [treeOptions.titlePropertyName, trimmedEnteredSearch]); // Don't include treeController.filters
    return (React.createElement(react_bootstrap_1.Container, { className: "my-4" },
        React.createElement(react_bootstrap_1.Row, null,
            React.createElement(react_bootstrap_1.Col, { sm: { offset: 2, span: 8 } },
                React.createElement("div", { className: "d-flex flex-column gap-3" },
                    React.createElement("div", { className: "d-flex flex-column gap-3" },
                        React.createElement("div", { className: "d-flex justify-content-between align-items-center gap-2" },
                            React.createElement("h4", { className: "mb-0" }, "Tree Editor"),
                            React.createElement("div", { className: "d-flex align-items-center gap-1" },
                                React.createElement(react_bootstrap_1.OverlayTrigger, { placement: "top", delay: { show: 0, hide: 0 }, overlay: React.createElement(react_bootstrap_1.Tooltip, { id: "tooltip-editing" },
                                        "Switch to ",
                                        !treeEditingEnabled ? 'Edit' : 'View',
                                        " mode. (Ctrl+Shift+E)") },
                                    React.createElement(react_bootstrap_1.Form.Check, { type: "switch", label: React.createElement(react_bootstrap_1.Badge, { bg: treeEditingEnabled ? 'primary' : 'dark' }, treeEditingEnabled ? 'Edit' : 'View'), className: "user-select-none", id: "toggle-switch-editing", checked: !!treeEditingEnabled, onChange: (e) => setTreeEditingEnabled(e.target.checked) })))),
                        React.createElement(react_bootstrap_1.Form.Group, { controlId: "search-group" },
                            React.createElement(react_bootstrap_1.Form.Control, { type: "text", placeholder: "Search", value: enteredSearch, onChange: (e) => setEnteredSearch(e.target.value), onFocus: handleSearchFocus })),
                        enteredSearch && (React.createElement("div", null,
                            "Showing ",
                            React.createElement(react_bootstrap_1.Badge, { bg: "dark" }, treeController.filters.filteredNodes.length),
                            " result",
                            treeController.filters.filteredNodes.length !== 1 && 's')),
                        React.createElement(BasicTreeNodeComponent_1.BasicTreeNodeComponent, { node: treeController.tree, treeController: treeController, editable: !!treeEditingEnabled, shortcuts: shortcuts, showBullets: !treeEditingEnabled })))))));
};
exports.TreeEditorDemo = TreeEditorDemo;
