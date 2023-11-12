import React from 'react';
import { Tree, TreeNode } from 'versatile-tree';
import { defaultTreeControllerOptions } from './TreeControllerOptions';

export const defaultTreeData = {
  [defaultTreeControllerOptions.titlePropertyName]: 'root',
  children: [],
};

export const useTreeState = (initial: Record<string, any>): [Tree, (tree: TreeNode | Tree) => void] => {
  const [treeDataStored, setTreeData] = React.useState(initial);
  const treeData = React.useMemo(() => (!treeDataStored ? defaultTreeData : treeDataStored), [treeDataStored]);
  const tree = React.useMemo(() => new Tree(treeData), [treeData]);
  const setTree = React.useCallback(
    (newTree: Tree | TreeNode) => {
      setTreeData(newTree.toObject());
    },
    [setTreeData],
  );

  return React.useMemo(() => [tree, setTree], [setTree, tree]);
};

export type TreeState = ReturnType<typeof useTreeState>;
