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
exports.BasicTreeNodeComponent = void 0;
const classnames_1 = __importDefault(require("classnames"));
const react_1 = __importDefault(require("react"));
const fa_1 = require("react-icons/fa");
const useTreeController_1 = require("../hooks/useTreeController");
const BasicTreeNodeTitleComponent_1 = require("./BasicTreeNodeTitleComponent");
const BasicTreeNodeDropdown_1 = require("./BasicTreeNodeDropdown");
const utils_1 = require("../utils/utils");
const BasicTreeNodeComponent = (_a) => {
    var _b;
    var { node, treeController, editable = false, showBullets = false, showPointer = false, shortcuts } = _a, props = __rest(_a, ["node", "treeController", "editable", "showBullets", "showPointer", "shortcuts"]);
    const expanded = treeController.expansions.isExpandedNode(node);
    const [hovering, setHovering] = react_1.default.useState(false);
    const children = (_b = node.getChildren()) !== null && _b !== void 0 ? _b : [];
    const hasChildren = node.hasChildren();
    const isFocused = treeController.focus.isFocusedNode(node);
    const isFilteredNode = treeController.filters.isFilteredNode(node);
    const handleToggleShowChildren = () => {
        if (node.hasChildren()) {
            treeController.expansions.toggleExpandNode(node);
        }
        treeController.focus.setFocusedNode(node);
    };
    const handleMouseEnter = () => {
        setHovering(true);
    };
    const handleMouseLeave = () => {
        setHovering(false);
    };
    react_1.default.useEffect(() => {
        // Ensure ancestors of focused items are all expanded
        if (treeController.focus.focusedNode &&
            node.isAncestorOf(treeController.focus.focusedNode) &&
            !treeController.expansions.isExpandedNode(node)) {
            treeController.expansions.toggleExpandNode(node, true);
        }
        else if (treeController.filters.hasFilter &&
            treeController.filters.isFilterAncestor(node) &&
            !treeController.expansions.isExpandedNode(node)) {
            treeController.expansions.toggleExpandNode(node, true);
        }
    }, [node, treeController.expansions, treeController.filters, treeController.focus.focusedNode]);
    const childrenToRender = treeController.filters.hasFilter
        ? children.filter((child) => treeController.filters.isFilteredNode(child) || treeController.filters.isFilterAncestor(child))
        : children;
    const entryElements = childrenToRender.map((childNode, i) => {
        var _a, _b;
        const elemKey = (0, utils_1.key)(`parent`, (_a = node.getData()[treeController.options.idPropertyName]) !== null && _a !== void 0 ? _a : useTreeController_1.UNDEFINED_ID, 'child', (_b = childNode.getData()[treeController.options.idPropertyName]) !== null && _b !== void 0 ? _b : useTreeController_1.UNDEFINED_ID, 'index', i);
        return (react_1.default.createElement(exports.BasicTreeNodeComponent, { key: elemKey, node: childNode, treeController: treeController, editable: editable, shortcuts: shortcuts, showBullets: showBullets, showPointer: showPointer }));
    });
    const iconWidth = 14;
    return (react_1.default.createElement("div", Object.assign({}, props, { className: (0, classnames_1.default)(props.className), style: Object.assign({}, props.style) }),
        !node.isRoot() && (react_1.default.createElement("div", { className: (0, classnames_1.default)('d-flex align-items-center gap-1 position-relative'), onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave },
            showPointer && isFocused && (react_1.default.createElement("div", { className: "position-absolute", style: { left: -20 } },
                react_1.default.createElement(fa_1.FaHandPointRight, null))),
            hasChildren && (react_1.default.createElement("div", { className: "d-flex justify-content-center align-items-center user-select-none cursor-pointer", style: { width: iconWidth }, onClick: handleToggleShowChildren }, expanded && hasChildren ? react_1.default.createElement(fa_1.FaAngleDown, null) : react_1.default.createElement(fa_1.FaAngleRight, { style: { opacity: !hasChildren ? 0 : 1 } }))),
            !hasChildren && (react_1.default.createElement("div", { className: "d-flex justify-content-center align-items-center user-select-none", style: { width: iconWidth } }, showBullets && react_1.default.createElement(fa_1.FaCircle, { style: { fontSize: '30%' } }))),
            react_1.default.createElement(BasicTreeNodeTitleComponent_1.BasicTreeNodeTitleComponent, { node: node, treeController: treeController, editable: editable, hovering: hovering }),
            editable && (react_1.default.createElement("div", { className: "d-flex align-items-center gap-1 ms-1 user-select-none" },
                react_1.default.createElement(BasicTreeNodeDropdown_1.BasicTreeNodeDropdown, { node: node, treeController: treeController, shortcuts: shortcuts }))))),
        ((expanded && hasChildren) || node.isRoot()) && (react_1.default.createElement("div", { className: (0, classnames_1.default)('d-flex flex-column gap-1 mt-1', !node.isRoot() && 'ms-4') }, entryElements.length > 0 && react_1.default.createElement("div", { className: "d-flex flex-column gap-1" }, entryElements)))));
};
exports.BasicTreeNodeComponent = BasicTreeNodeComponent;
