import React from 'react';
import { TreeNode } from 'versatile-tree';
import { TreeControllerOptions } from './TreeControllerOptions';
import { useRefState } from './useRefState';

export const useTreeExpansions = (tree: TreeNode, treeOptions: TreeControllerOptions) => {
  const [expansionsMap, setExpansionsMap] = useRefState<Record<string, boolean>>({});
  const isExpandedId = React.useCallback(
    (id?: string) => {
      if (typeof id !== 'undefined') {
        return !!expansionsMap[id];
      }
      return false;
    },
    [expansionsMap],
  );
  const isExpandedNode = React.useCallback(
    (node?: TreeNode) => {
      const id = node?.getData()[treeOptions.idPropertyName];
      return !!node && typeof id !== 'undefined' && !!expansionsMap[id];
    },
    [expansionsMap, treeOptions.idPropertyName],
  );
  const setExpandedId = React.useCallback(
    (id: string | undefined, expanded: boolean) => {
      if (typeof id !== 'undefined') {
        let changed = false;
        const newExpansionsMap = { ...expansionsMap };
        if (expanded && !newExpansionsMap[id]) {
          newExpansionsMap[id] = true;
          changed = true;
        } else if (!expanded && !!newExpansionsMap[id]) {
          delete newExpansionsMap[id];
          changed = true;
        }
        if (changed) {
          setExpansionsMap(newExpansionsMap);
        }
      }
    },
    [expansionsMap, setExpansionsMap],
  );

  const setExpandedNode = React.useCallback(
    (node: TreeNode | undefined, expanded: boolean) => {
      setExpandedId(node?.getData()[treeOptions.idPropertyName], expanded);
    },
    [setExpandedId, treeOptions.idPropertyName],
  );

  const toggleExpandNode = React.useCallback(
    (node?: TreeNode, expand?: boolean) => {
      if (node) {
        const expanded = isExpandedNode(node);
        const newState = typeof expand !== 'undefined' ? expand : !expanded;
        if (expanded !== newState) {
          setExpandedNode(node, newState);
        }
      }
    },
    [isExpandedNode, setExpandedNode],
  );

  const expandAll = React.useCallback(() => {
    const newExpansionsMap = { ...expansionsMap };
    tree.walk((node) => {
      if (node.hasChildren()) {
        newExpansionsMap[node.getData()[treeOptions.idPropertyName]] = true;
      }
    });
    setExpansionsMap(newExpansionsMap);
  }, [expansionsMap, setExpansionsMap, tree, treeOptions.idPropertyName]);

  const collapseAll = React.useCallback(() => {
    setExpansionsMap({});
  }, [setExpansionsMap]);

  const expansions = React.useMemo(
    () => ({
      expansionsMap: expansionsMap,
      setExpansionsMap,
      isExpandedId,
      isExpandedNode,
      setExpandedId,
      setExpandedNode,
      toggleExpandNode,
      expandAll,
      collapseAll,
    }),
    [
      collapseAll,
      expandAll,
      expansionsMap,
      isExpandedId,
      isExpandedNode,
      setExpandedId,
      setExpandedNode,
      setExpansionsMap,
      toggleExpandNode,
    ],
  );
  return expansions;
};

export type TreeExpansions = ReturnType<typeof useTreeExpansions>;
