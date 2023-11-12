import React from 'react';
import { Tree, TreeNode } from 'versatile-tree';
import { UNDEFINED_ID } from './useTreeController';
import { TreeExpansions } from './useTreeExpansions';
import { TreeControllerOptions } from './TreeControllerOptions';

export const useTreeFocus = (tree: Tree, expansions: TreeExpansions, treeOptions: TreeControllerOptions) => {
  const [focusedId, setFocusedId] = React.useState(UNDEFINED_ID);
  const focusedNode = React.useMemo(
    () => tree.findById(focusedId, treeOptions.idPropertyName),
    [tree, focusedId, treeOptions.idPropertyName],
  );
  const isFocusedId = React.useCallback((id?: string) => typeof id !== 'undefined' && focusedId === id, [focusedId]);
  const isFocusedNode = React.useCallback(
    (treeNode?: TreeNode) =>
      focusedNode &&
      treeNode &&
      typeof focusedNode.getData()[treeOptions.idPropertyName] !== undefined &&
      typeof treeNode.getData()[treeOptions.idPropertyName] !== undefined &&
      focusedNode.getData()[treeOptions.idPropertyName] === treeNode.getData()[treeOptions.idPropertyName],
    [focusedNode, treeOptions.idPropertyName],
  );
  const setFocusedNode = React.useCallback(
    (treeNode?: TreeNode) => {
      const id = treeNode?.getData()[treeOptions.idPropertyName];
      if (treeNode && typeof id !== 'undefined') {
        setFocusedId(id);
      } else {
        setFocusedId(UNDEFINED_ID);
      }
    },
    [treeOptions.idPropertyName],
  );

  const focusUp = React.useCallback(() => {
    const treeChildren = tree.getChildren();
    let upFocusId = UNDEFINED_ID;
    if (focusedNode) {
      const leftSibling = focusedNode.getLeftSibling();
      // If there's an immediate left sibling...
      if (leftSibling) {
        // Focus the youngest last expanded child of the sibling (or the sibling itself)
        let youngestChild = leftSibling;
        while (expansions.isExpandedNode(youngestChild) && youngestChild.hasChildren()) {
          youngestChild = youngestChild.getChildren()[youngestChild.getChildren().length - 1];
        }
        upFocusId = youngestChild.getData()[treeOptions.idPropertyName] ?? UNDEFINED_ID;
      }
      // Otherwise, if there's a parent, focus that
      else if (focusedNode.getParent()) {
        upFocusId = focusedNode.getParent()?.getData()[treeOptions.idPropertyName] ?? UNDEFINED_ID;
      }
    } else if (treeChildren.length > 0) {
      upFocusId = treeChildren[0].getData()[treeOptions.idPropertyName];
    }
    if (upFocusId !== UNDEFINED_ID) {
      setFocusedId(upFocusId);
    }
  }, [expansions, focusedNode, tree, treeOptions.idPropertyName]);

  const focusDown = React.useCallback(() => {
    const treeChildren = tree.getChildren();
    let downFocusId = UNDEFINED_ID;
    if (focusedNode) {
      // If expanded and has children, focus first child
      if (expansions.isExpandedNode(focusedNode) && focusedNode.hasChildren()) {
        downFocusId = focusedNode.getChildren()[0].getData()[treeOptions.idPropertyName] ?? UNDEFINED_ID;
      }
      // If there's an immediate right sibling, focus that
      else if (focusedNode.getRightSibling()) {
        downFocusId = focusedNode.getRightSibling()?.getData()[treeOptions.idPropertyName] ?? UNDEFINED_ID;
      }
      // Otherwise, find the immediate right sibling to the closest ancestor and focus that
      else {
        let parent = focusedNode.getParent();
        while (parent) {
          const parentRightSibling = parent.getRightSibling();
          if (parentRightSibling) {
            downFocusId = parentRightSibling.getData()[treeOptions.idPropertyName] ?? UNDEFINED_ID;
            break;
          } else {
            parent = parent.getParent();
          }
        }
      }
    } else if (treeChildren.length > 0) {
      downFocusId = treeChildren[0].getData()[treeOptions.idPropertyName];
    }
    if (downFocusId !== UNDEFINED_ID) {
      setFocusedId(downFocusId);
    }
  }, [expansions, focusedNode, tree, treeOptions.idPropertyName]);

  const focusRight = React.useCallback(() => {
    const treeChildren = tree.getChildren();
    let rightFocusId = UNDEFINED_ID;
    if (focusedNode) {
      if (focusedNode.hasChildren()) {
        rightFocusId = focusedNode.getChildren()[0].getData()[treeOptions.idPropertyName] ?? UNDEFINED_ID;
      }
    } else if (treeChildren.length > 0) {
      rightFocusId = treeChildren[0].getData()[treeOptions.idPropertyName];
    }
    if (rightFocusId !== UNDEFINED_ID) {
      setFocusedId(rightFocusId);
    }
  }, [focusedNode, tree, treeOptions.idPropertyName]);

  const focusLeft = React.useCallback(() => {
    const treeChildren = tree.getChildren();
    let leftFocusId = UNDEFINED_ID;
    if (focusedNode) {
      if (focusedNode.hasParent()) {
        leftFocusId = focusedNode.getParent()?.getData()[treeOptions.idPropertyName] ?? UNDEFINED_ID;
      }
    } else if (treeChildren.length > 0) {
      leftFocusId = treeChildren[0].getData()[treeOptions.idPropertyName];
    }
    if (leftFocusId !== UNDEFINED_ID) {
      setFocusedId(leftFocusId);
    }
  }, [focusedNode, tree, treeOptions.idPropertyName]);

  return React.useMemo(
    () => ({
      focusedId,
      setFocusedId,
      isFocusedId,
      focusedNode,
      isFocusedNode,
      setFocusedNode,
      focusUp,
      focusDown,
      focusRight,
      focusLeft,
    }),
    [focusDown, focusLeft, focusRight, focusUp, focusedId, focusedNode, isFocusedId, isFocusedNode, setFocusedNode],
  );
};

export type TreeFocus = ReturnType<typeof useTreeFocus>;
