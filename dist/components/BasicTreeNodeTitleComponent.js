"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicTreeNodeTitleComponent = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const react_bootstrap_1 = require("react-bootstrap");
const editDebounceDelayMillis = 200;
const BasicTreeNodeTitleComponent = ({ node, treeController, editable = false, hovering, }) => {
    var _a;
    const titleFieldRef = react_1.default.useRef(null);
    const [enteredTitle, setEnteredTitle] = react_1.default.useState((_a = node.getData()[treeController.options.titlePropertyName]) !== null && _a !== void 0 ? _a : '');
    const [titleChanged, setTitleChanged] = react_1.default.useState(false);
    const handleTitleChanged = (title) => {
        setEnteredTitle(title);
        setTitleChanged(true);
    };
    const handleTextFocus = () => {
        treeController.focus.setFocusedNode(node);
    };
    react_1.default.useEffect(() => {
        var _a, _b;
        if (node.getData()[treeController.options.idPropertyName] ===
            ((_a = treeController.focus.focusedNode) === null || _a === void 0 ? void 0 : _a.getData()[treeController.options.idPropertyName])) {
            (_b = titleFieldRef.current) === null || _b === void 0 ? void 0 : _b.focus();
        }
    }, [node, treeController.expansions, treeController.focus.focusedNode, treeController.options.idPropertyName]);
    // When editing title, update node after debounce delay
    react_1.default.useEffect(() => {
        let timeout = undefined;
        if (titleChanged) {
            timeout = setTimeout(() => {
                treeController.mutations.updateNode(node, { [treeController.options.titlePropertyName]: enteredTitle });
                setTitleChanged(false);
            }, editDebounceDelayMillis);
        }
        return () => clearTimeout(timeout);
    }, [enteredTitle, treeController.mutations, titleChanged, node, treeController.options.titlePropertyName]);
    let titleComponent = react_1.default.createElement("div", null, enteredTitle);
    if (editable) {
        titleComponent = (react_1.default.createElement(react_bootstrap_1.Form.Control, { ref: titleFieldRef, type: "text", value: enteredTitle, onChange: (e) => handleTitleChanged(e.target.value), onFocus: handleTextFocus, className: (0, classnames_1.default)(hovering && 'bg-light') }));
    }
    else {
        titleComponent =
            enteredTitle === '---' ? (react_1.default.createElement("hr", { className: "w-100 my-0 py-0" })) : (react_1.default.createElement("div", { className: "p-1 w-100", style: { fontSize: '105%' } }, enteredTitle));
    }
    return titleComponent;
};
exports.BasicTreeNodeTitleComponent = BasicTreeNodeTitleComponent;
