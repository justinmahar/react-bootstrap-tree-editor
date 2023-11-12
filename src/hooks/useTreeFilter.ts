import React from 'react';
import { Tree, TreeNode } from 'versatile-tree';
import { TreeControllerOptions } from './TreeControllerOptions';
import { UNDEFINED_ID } from './useTreeController';
import { uuid } from '../utils/utils';

export const useTreeFilter = (tree: Tree, treeOptions: TreeControllerOptions) => {
  const [filteredNodeMap, setFilteredNodeMap] = React.useState<Record<string, TreeNode>>({});
  const [filteredAncestorNodeMap, setFilteredAncestorNodeMap] = React.useState<Record<string, TreeNode>>({});
  const [filteredNodes, setFilteredNodes] = React.useState<TreeNode[]>([]);
  const [hasFilter, setHasFilter] = React.useState(false);
  const [renderId, setRenderId] = React.useState(uuid());
  const filterRef = React.useRef<TreeNodeFilter | undefined>(undefined);

  const setFilter = React.useCallback((filter: TreeNodeFilter | undefined) => {
    const newHasFilter = typeof filter !== 'undefined';
    setHasFilter(newHasFilter);
    setRenderId(uuid());
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
  const isFilteredNode = React.useCallback(
    (nodeOrId?: TreeNode | string) => {
      const id =
        typeof nodeOrId === 'string' ? nodeOrId : nodeOrId?.getData()[treeOptions.idPropertyName] ?? UNDEFINED_ID;
      return !!filteredNodeMap[id];
    },
    [filteredNodeMap, treeOptions.idPropertyName],
  );

  /**
   * Returns true if the provided node/ID is an ancestor of a node passed through the filter.
   */
  const isFilterAncestor = React.useCallback(
    (nodeOrId?: TreeNode | string) => {
      const id =
        typeof nodeOrId === 'string' ? nodeOrId : nodeOrId?.getData()[treeOptions.idPropertyName] ?? UNDEFINED_ID;
      return !!filteredAncestorNodeMap[id];
    },
    [filteredAncestorNodeMap, treeOptions.idPropertyName],
  );

  React.useEffect(() => {
    if (hasFilter) {
      // Find all nodes matching the filter
      const newFilterPassIdMap: Record<string, TreeNode> = {};
      const filteredNodes = tree.findAll((node) => !!filterRef.current && filterRef.current(node));
      setFilteredNodes(filteredNodes);
      filteredNodes.forEach((node) => {
        newFilterPassIdMap[node.getData()[treeOptions.idPropertyName]] = node;
      });
      setFilteredNodeMap(newFilterPassIdMap);
      // Determine which nodes are ancestors of filtered nodes
      const newFilteredAncestorIdMap: Record<string, TreeNode> = {};
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

  return React.useMemo(
    () => ({
      setFilter,
      hasFilter,
      filteredNodes,
      isFilteredNode,
      isFilterAncestor,
    }),
    [filteredNodes, hasFilter, isFilterAncestor, isFilteredNode, setFilter],
  );
};

export type TreeNodeFilter = (node?: TreeNode) => boolean;
