import React from 'react';
import { Tree, TreeNode } from 'versatile-tree';
import { TreeControllerOptions } from './TreeControllerOptions';
import { UNDEFINED_ID } from './useTreeController';

export interface DeletionInfo {
  parentId: string | undefined;
  data: Record<string, any>;
  index: number;
}

export const useTreeMutations = (
  tree: Tree,
  setTree: (newTree: Tree | TreeNode) => void,
  treeOptions: TreeControllerOptions,
) => {
  const [deletions, setDeletions] = React.useState<DeletionInfo[]>([]);

  const deleteNode = React.useCallback(
    (nodeOrId?: TreeNode | string) => {
      const node = typeof nodeOrId === 'string' ? tree.findById(nodeOrId, treeOptions.idPropertyName) : nodeOrId;
      if (node) {
        const root = node.getRoot();
        const parent = node.getParent();
        const index = node.getIndex();
        node.removeParent();
        // Store the deleted node in case we want to recover it
        const clonedNode = node.clone();
        setDeletions([
          ...deletions,
          {
            parentId: parent?.getData()[treeOptions.idPropertyName] ?? UNDEFINED_ID,
            data: clonedNode.toObject(),
            index,
          },
        ]);
        setTree(root);
      }
    },
    [deletions, setTree, tree, treeOptions.idPropertyName],
  );

  const recoverDeletion = React.useCallback((): TreeNode | undefined => {
    let recoveredNode: TreeNode | undefined = undefined;
    if (deletions.length > 0) {
      const deletionInfo = deletions[deletions.length - 1];
      const deletionNode = new TreeNode(deletionInfo.data);
      const parentNode = tree.findById(deletionInfo.parentId, treeOptions.idPropertyName) ?? tree;
      parentNode.addChildNode(deletionNode, deletionInfo.index);
      recoveredNode = deletionNode;
      const newDeletions = deletions.slice(0, deletions.length - 1);
      setDeletions(newDeletions);
      setTree(tree);
    }
    return recoveredNode;
  }, [deletions, setTree, tree, treeOptions.idPropertyName]);

  const updateNode = React.useCallback(
    (nodeOrId: TreeNode | string, dataPartial: Record<string, any>) => {
      const node = typeof nodeOrId === 'string' ? tree.findById(nodeOrId, treeOptions.idPropertyName) : nodeOrId;
      if (node) {
        node.setData({ ...node.getData(), ...dataPartial });
        const root = node.getRoot();
        setTree(root);
      }
    },
    [setTree, tree, treeOptions.idPropertyName],
  );

  const addSiblingNodeData = React.useCallback(
    (nodeOrId: TreeNode | string, data: Record<string, any>) => {
      let newNode: TreeNode | undefined = undefined;
      const node = typeof nodeOrId === 'string' ? tree.findById(nodeOrId, treeOptions.idPropertyName) : nodeOrId;
      if (node && !node.isRoot()) {
        newNode = new TreeNode(data, node.getOptions());
        node.addSiblingNode(newNode, node.getIndex() + 1);
        const root = node.getRoot();
        setTree(root);
      }
      return newNode;
    },
    [setTree, tree, treeOptions.idPropertyName],
  );

  const addChildNodeData = React.useCallback(
    (nodeOrId: TreeNode | string, data: Record<string, any>) => {
      let newNode: TreeNode | undefined = undefined;
      const node = typeof nodeOrId === 'string' ? tree.findById(nodeOrId, treeOptions.idPropertyName) : nodeOrId;
      if (node) {
        newNode = new TreeNode(data, node.getOptions());
        node.addChildNode(newNode, 0);
        const root = node.getRoot();
        setTree(root);
      }
      return newNode;
    },
    [setTree, tree, treeOptions.idPropertyName],
  );

  const moveNodeLeft = React.useCallback(
    (nodeOrId?: TreeNode | string) => {
      const node = typeof nodeOrId === 'string' ? tree.findById(nodeOrId, treeOptions.idPropertyName) : nodeOrId;
      if (node) {
        const root = node.getRoot();
        const parent = node.getParent();
        if (!parent?.isRoot()) {
          node.removeParent();
          parent?.addSiblingNode(node, parent.getIndex() + 1);
          setTree(root);
        }
      }
    },
    [setTree, tree, treeOptions.idPropertyName],
  );

  const moveNodeDown = React.useCallback(
    (nodeOrId?: TreeNode | string) => {
      const node = typeof nodeOrId === 'string' ? tree.findById(nodeOrId, treeOptions.idPropertyName) : nodeOrId;
      if (node) {
        const root = node.getRoot();
        const rightSibling = node.getRightSibling();
        const parent = node.getParent();
        if (rightSibling) {
          node.removeParent();
          rightSibling.addSiblingNode(node, rightSibling.getIndex() + 1);
          setTree(root);
        } else if (parent && !parent.isRoot()) {
          node.removeParent();
          parent.addSiblingNode(node, parent.getIndex() + 1);
          setTree(root);
        }
      }
    },
    [setTree, tree, treeOptions.idPropertyName],
  );

  const moveNodeUp = React.useCallback(
    (nodeOrId?: TreeNode | string) => {
      const node = typeof nodeOrId === 'string' ? tree.findById(nodeOrId, treeOptions.idPropertyName) : nodeOrId;
      if (node) {
        const root = node.getRoot();
        const leftSibling = node.getLeftSibling();
        const parent = node.getParent();
        if (leftSibling) {
          node.removeParent();
          leftSibling.addSiblingNode(node, leftSibling.getIndex());
          setTree(root);
        } else if (parent && !parent.isRoot()) {
          node.removeParent();
          parent.addSiblingNode(node, parent.getIndex());
          setTree(root);
        }
      }
    },
    [setTree, tree, treeOptions.idPropertyName],
  );

  const moveNodeRight = React.useCallback(
    (nodeOrId?: TreeNode | string) => {
      const node = typeof nodeOrId === 'string' ? tree.findById(nodeOrId, treeOptions.idPropertyName) : nodeOrId;
      if (node) {
        const root = node.getRoot();
        const leftSibling = node.getLeftSibling();
        if (leftSibling) {
          node.removeParent();
          leftSibling.addChildNode(node);
          setTree(root);
        }
      }
    },
    [setTree, tree, treeOptions.idPropertyName],
  );

  return React.useMemo(
    () => ({
      deleteNode,
      deletions,
      recoverDeletion,
      updateNode,
      addSiblingNodeData,
      addChildNodeData,
      moveNodeLeft,
      moveNodeDown,
      moveNodeUp,
      moveNodeRight,
    }),
    [
      addChildNodeData,
      addSiblingNodeData,
      deleteNode,
      deletions,
      moveNodeDown,
      moveNodeLeft,
      moveNodeRight,
      moveNodeUp,
      recoverDeletion,
      updateNode,
    ],
  );
};

export type TreeActions = ReturnType<typeof useTreeMutations>;
