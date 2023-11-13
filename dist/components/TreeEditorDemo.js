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
exports.demoTreeData = exports.TreeEditorDemo = void 0;
require("bootstrap/dist/css/bootstrap.css");
const React = __importStar(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const fa_1 = require("react-icons/fa");
const react_sub_unsub_1 = require("react-sub-unsub");
const TreeControllerOptions_1 = require("../hooks/TreeControllerOptions");
const useTreeController_1 = require("../hooks/useTreeController");
const useTreeShortcuts_1 = require("../hooks/useTreeShortcuts");
const useTreeState_1 = require("../hooks/useTreeState");
const utils_1 = require("../utils/utils");
const BasicTreeNodeComponent_1 = require("./BasicTreeNodeComponent");
const TreeEditorDemo = () => {
    const [showAlert, setShowAlert] = React.useState(true);
    const [treeEditingEnabled, setTreeEditingEnabled] = React.useState(true);
    const treeOptions = TreeControllerOptions_1.defaultTreeControllerOptions;
    const [tree, setTree] = (0, useTreeState_1.useTreeState)(exports.demoTreeData);
    const treeController = (0, useTreeController_1.useTreeController)(tree, setTree, treeOptions);
    console.log(tree.toJSON());
    const [enteredSearch, setEnteredSearch] = React.useState('');
    const trimmedEnteredSearch = enteredSearch.trim();
    const shortcuts = (0, useTreeShortcuts_1.useTreeShortcuts)(treeController, document);
    const handleSearchFocus = () => {
        treeController.focus.setFocusedNode(undefined);
    };
    // Keyboard shortcut handling (for Demo only -- see useTreeShortcuts for more)
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
    // Expand all on first render
    React.useEffect(() => {
        treeController.expansions.expandAll();
    }, []); // Leave deps empty (run only once)
    // Handle setting the search filter
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
                    showAlert && (React.createElement(react_bootstrap_1.Alert, { variant: "primary", dismissible: true, onClose: () => setShowAlert(false) },
                        React.createElement("p", null,
                            "This is a demo of",
                            ' ',
                            React.createElement("a", { href: "https://github.com/justinmahar/react-bootstrap-tree-editor" }, "react-bootstrap-tree-editor"),
                            ", built on ",
                            React.createElement("a", { href: "https://react-bootstrap.netlify.app/" }, "react-bootstrap"),
                            " and powered by",
                            ' ',
                            React.createElement("a", { href: "https://github.com/justinmahar/versatile-tree" }, "versatile-tree"),
                            "."),
                        React.createElement("p", null, "You will likely want to customize this further, but this demo serves as a good starting point should you be interested in using this project."),
                        React.createElement("p", null,
                            "A few handy things you can try out:",
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    React.createElement("span", { className: "fw-bold" }, "Edit/View Modes"),
                                    " - Switch from Edit to View mode using the toggle switch."),
                                React.createElement("li", null,
                                    React.createElement("span", { className: "fw-bold" }, "Keyboard Editing"),
                                    " - Use Enter to insert items below, Shift+Enter to insert inside. Customizable shortcuts are available for moving items."),
                                React.createElement("li", null,
                                    React.createElement("span", { className: "fw-bold" }, "Actions Dropdown"),
                                    " - Click the ellipsis ",
                                    React.createElement(fa_1.FaEllipsisV, null),
                                    " to view actions and their associated shortcuts."),
                                React.createElement("li", null,
                                    React.createElement("span", { className: "fw-bold" }, "Deletion & Recovery"),
                                    " - Delete items from the tree and recover them if deleted on accident."),
                                React.createElement("li", null,
                                    React.createElement("span", { className: "fw-bold" }, "Dividers"),
                                    " - Use triple-dash (",
                                    React.createElement("code", null, "---"),
                                    ") to create a horizontal divider when in View Mode."),
                                React.createElement("li", null,
                                    React.createElement("span", { className: "fw-bold" }, "Searching"),
                                    " - Full tree searching, including auto node expansion on matches. Try searching for \"dragon\"."))),
                        React.createElement("p", null,
                            "You can",
                            ' ',
                            React.createElement("a", { href: "https://github.com/justinmahar/react-bootstrap-tree-editor/blob/master/src/components/TreeEditorDemo.tsx" }, "view the source here"),
                            "."),
                        React.createElement("p", { className: "mb-0" },
                            "If this project helps you, please",
                            ' ',
                            React.createElement("a", { href: "https://github.com/justinmahar/react-bootstrap-tree-editor" }, "star it on GitHub"),
                            " and consider",
                            ' ',
                            React.createElement("a", { href: "https://github.com/justinmahar/react-bootstrap-tree-editor#donate" }, "buying me a coffee"),
                            " if you're feeling appreciative! \u2615\uFE0F"))),
                    React.createElement("div", { className: "d-flex justify-content-between align-items-center gap-2" },
                        React.createElement("h4", { className: "mb-0" },
                            "Tree Editor",
                            !showAlert && (React.createElement(fa_1.FaQuestionCircle, { className: "ms-2 text-primary", style: { fontSize: '50%', cursor: 'pointer' }, onClick: () => setShowAlert(true) }))),
                        React.createElement("div", { className: "d-flex align-items-center gap-1" },
                            React.createElement(react_bootstrap_1.OverlayTrigger, { placement: "left", delay: { show: 0, hide: 0 }, overlay: React.createElement(react_bootstrap_1.Tooltip, { id: "tooltip-editing" },
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
                    React.createElement(BasicTreeNodeComponent_1.BasicTreeNodeComponent, { node: treeController.tree, treeController: treeController, editable: !!treeEditingEnabled, shortcuts: shortcuts, showBullets: !treeEditingEnabled, showPointer: false }),
                    React.createElement("p", { className: "mt-5 text-center text-muted" },
                        "Found it helpful?",
                        ' ',
                        React.createElement("a", { href: "https://github.com/justinmahar/react-bootstrap-tree-editor" }, "Star it on GitHub"),
                        " \u2B50\uFE0F or",
                        ' ',
                        React.createElement("a", { href: "https://github.com/justinmahar/react-bootstrap-tree-editor#donate" }, "buy me a coffee"),
                        " \u2615\uFE0F if you're feeling appreciative!"))))));
};
exports.TreeEditorDemo = TreeEditorDemo;
exports.demoTreeData = {
    title: 'root',
    children: [
        {
            id: '0c48797c-619c-4b97-bb02-73e486dfeb26',
            title: '📋 Tasks',
            children: [
                { id: '2eaa1992-b2c7-4d4e-b088-1d539dd54be3', title: '🧺 Do laundry', children: [] },
                { id: 'c90c5af0-46a4-41c8-916d-983b53c44fcd', title: '🥘 Meal prep', children: [] },
                { id: 'cb82ba25-4283-481c-b7bc-6dd08759b41a', title: '🐉 Slay dragon', children: [] },
            ],
        },
        {
            id: '3a1986b0-7c83-42f4-b5a0-28c86520530e',
            title: '🚗 Errands',
            children: [
                {
                    id: '687b042e-58cc-4f8f-9abe-9588ee73a4b3',
                    title: 'Groceries',
                    children: [
                        { id: 'e7a422f6-d6f0-4c71-8545-9b2c71c50491', title: '🥩 Meat', children: [] },
                        { id: '726e09a7-a385-41ae-80a7-fae8a74747c5', title: '🥦 Veggies', children: [] },
                        { id: 'cfd7fac3-5a25-473f-ba1f-ebc17809c32e', title: '🍖 Dragon bait', children: [] },
                    ],
                },
                {
                    id: '00a4314c-c140-450a-9a3a-3fdfea87a289',
                    title: 'Hardware',
                    children: [{ id: '39249c4a-4132-4915-8dc9-0422d10b6c73', title: '🗡️ Sword', children: [] }],
                },
            ],
        },
        {
            id: '47077606-c469-40d9-8c6f-6fa1bff1f76f',
            title: '🧠 Reminders',
            children: [
                { id: '5bb660e4-e092-4e06-807e-9540d9d37247', title: '📞 Call family', children: [] },
                { id: '2223020c-5041-4a5c-80c3-fabfc4ff13e5', title: '🙏 Be grateful', children: [] },
                { id: '802795e1-4223-4922-96a5-714bc84f4465', title: '---', children: [] },
                { id: '79080099-692b-420c-90f6-014ca333e98a', title: '💤 Get to bed early', children: [] },
                { id: '06de1566-ba9b-48e0-9645-af8b9ab379ea', title: '💪 Training', children: [] },
            ],
        },
    ],
};
