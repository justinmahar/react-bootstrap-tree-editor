"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTreeFilter = void 0;
const react_1 = __importDefault(require("react"));
const useTreeController_1 = require("./useTreeController");
const utils_1 = require("../utils/utils");
const useTreeFilter = (tree, treeOptions) => {
    const [filteredNodeMap, setFilteredNodeMap] = react_1.default.useState({});
    const [filteredAncestorNodeMap, setFilteredAncestorNodeMap] = react_1.default.useState({});
    const [filteredNodes, setFilteredNodes] = react_1.default.useState([]);
    const [hasFilter, setHasFilter] = react_1.default.useState(false);
    const [renderId, setRenderId] = react_1.default.useState((0, utils_1.uuid)());
    const filterRef = react_1.default.useRef(undefined);
    const setFilter = react_1.default.useCallback((filter) => {
        const newHasFilter = typeof filter !== 'undefined';
        setHasFilter(newHasFilter);
        setRenderId((0, utils_1.uuid)());
        filterRef.current = filter;
        if (!newHasFilter) {
            setFilteredNodes([]);
            setFilteredNodeMap({});
            setFilteredAncestorNodeMap({});
        }
    }, []);
    /**
     * Returns true if the provided node/ID is passed through the filter.
     */
    const isFilteredNode = react_1.default.useCallback((nodeOrId) => {
        var _a;
        const id = typeof nodeOrId === 'string' ? nodeOrId : (_a = nodeOrId === null || nodeOrId === void 0 ? void 0 : nodeOrId.getData()[treeOptions.idPropertyName]) !== null && _a !== void 0 ? _a : useTreeController_1.UNDEFINED_ID;
        return !!filteredNodeMap[id];
    }, [filteredNodeMap, treeOptions.idPropertyName]);
    /**
     * Returns true if the provided node/ID is an ancestor of a node passed through the filter.
     */
    const isFilterAncestor = react_1.default.useCallback((nodeOrId) => {
        var _a;
        const id = typeof nodeOrId === 'string' ? nodeOrId : (_a = nodeOrId === null || nodeOrId === void 0 ? void 0 : nodeOrId.getData()[treeOptions.idPropertyName]) !== null && _a !== void 0 ? _a : useTreeController_1.UNDEFINED_ID;
        return !!filteredAncestorNodeMap[id];
    }, [filteredAncestorNodeMap, treeOptions.idPropertyName]);
    react_1.default.useEffect(() => {
        if (hasFilter) {
            // Find all nodes matching the filter
            const newFilterPassIdMap = {};
            const filteredNodes = tree.findAll((node) => !!filterRef.current && filterRef.current(node));
            setFilteredNodes(filteredNodes);
            filteredNodes.forEach((node) => {
                newFilterPassIdMap[node.getData()[treeOptions.idPropertyName]] = node;
            });
            setFilteredNodeMap(newFilterPassIdMap);
            // Determine which nodes are ancestors of filtered nodes
            const newFilteredAncestorIdMap = {};
            const allNodes = tree.findAll(() => true);
            allNodes.forEach((node) => {
                for (let i = 0; i < filteredNodes.length; i++) {
                    const currFilteredNode = filteredNodes[i];
                    if (node.isAncestorOf(currFilteredNode)) {
                        newFilteredAncestorIdMap[node.getData()[treeOptions.idPropertyName]] = currFilteredNode;
                        break;
                    }
                }
            });
            setFilteredAncestorNodeMap(newFilteredAncestorIdMap);
        }
    }, [renderId]);
    return react_1.default.useMemo(() => ({
        setFilter,
        hasFilter,
        filteredNodes,
        isFilteredNode,
        isFilterAncestor,
    }), [filteredNodes, hasFilter, isFilterAncestor, isFilteredNode, setFilter]);
};
exports.useTreeFilter = useTreeFilter;
