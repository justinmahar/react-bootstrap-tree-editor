import React from 'react';
import { isMacOs } from 'react-device-detect';
import { Subs } from 'react-sub-unsub';
import { TreeController } from './useTreeController';
import { KeyCode } from '../utils/utils';

export const useTreeShortcuts = (
  treeController: TreeController,
  domObj: Window | Node,
  treeShortcuts: TreeShortcuts = defaultTreeShortcuts,
): TreeShortcuts => {
  const shortcuts = React.useMemo(() => treeShortcuts, []); // Do not add treeShortcuts as dep as it highly likely changes on every render
  React.useEffect(() => {
    const keyDownListener = (e: KeyboardEvent) => {
      // For debugging:
      // console.log('Code:', e.code, 'Key:', e.key);

      // Focus up
      if (shortcuts.focusUpShortcutCheck(e)) {
        e.preventDefault();
        e.stopPropagation();
        treeController.focus.focusUp();
      }
      // Focus down
      else if (shortcuts.focusDownShortcutCheck(e)) {
        e.preventDefault();
        e.stopPropagation();
        treeController.focus.focusDown();
      }
      // Move up
      else if (shortcuts.moveNodeUpCheck(e)) {
        e.preventDefault();
        e.stopPropagation();
        treeController.mutations.moveNodeUp(treeController.focus.focusedNode);
      }
      // Move down
      else if (shortcuts.moveNodeDownCheck(e)) {
        e.preventDefault();
        e.stopPropagation();
        treeController.mutations.moveNodeDown(treeController.focus.focusedNode);
      }
      // Move out
      else if (shortcuts.moveNodeLeftCheck(e)) {
        e.preventDefault();
        e.stopPropagation();
        treeController.mutations.moveNodeLeft(treeController.focus.focusedNode);
      }
      // Move in
      else if (shortcuts.moveNodeRightCheck(e)) {
        e.preventDefault();
        e.stopPropagation();
        treeController.mutations.moveNodeRight(treeController.focus.focusedNode);
      }
      // Expand
      else if (shortcuts.toggleExpandNodeCheck(e)) {
        e.preventDefault();
        e.stopPropagation();
        treeController.expansions.toggleExpandNode(treeController.focus.focusedNode);
      }
      // Expand all
      else if (shortcuts.expandAllCheck(e)) {
        e.preventDefault();
        e.stopPropagation();
        treeController.expansions.expandAll();
      }
      // Collapse all
      else if (shortcuts.collapseAllCheck(e)) {
        e.preventDefault();
        e.stopPropagation();
        treeController.expansions.collapseAll();
      }
      // New item below
      else if (shortcuts.newItemBelowCheck(e)) {
        e.preventDefault();
        e.stopPropagation();
        const focusedNode = treeController.focus.focusedNode;
        if (focusedNode) {
          const newNodeData = treeController.options.createNewData();
          const newNode = treeController.mutations.addSiblingNodeData(focusedNode, newNodeData);
          treeController.focus.setFocusedNode(newNode);
        }
      }
      // New item inside
      else if (shortcuts.newItemInsideCheck(e)) {
        e.preventDefault();
        e.stopPropagation();
        const focusedNode = treeController.focus.focusedNode;
        if (focusedNode) {
          const newNodeData = treeController.options.createNewData();
          const newNode = treeController.mutations.addChildNodeData(focusedNode, newNodeData);
          treeController.focus.setFocusedNode(newNode);
        }
      }
      // Delete only if title is empty
      else if (shortcuts.deleteItemIfEmptyCheck(e)) {
        const focusedNode = treeController.focus.focusedNode;
        const nodeName = focusedNode?.getData()[treeController.options.titlePropertyName];
        if (focusedNode) {
          if (typeof nodeName === 'string' && nodeName.length === 0) {
            const nextFocusNode = focusedNode.getLeftSibling()
              ? focusedNode.getLeftSibling()
              : focusedNode.getRightSibling()
              ? focusedNode.getRightSibling()
              : focusedNode.getParent() && !focusedNode.getParent()?.isRoot()
              ? focusedNode.getParent()
              : undefined;
            treeController.mutations.deleteNode(focusedNode);
            treeController.focus.setFocusedNode(nextFocusNode);
            e.preventDefault();
            e.stopPropagation();
          }
        }
      }
      // Delete
      else if (shortcuts.deleteItemCheck(e)) {
        const focusedNode = treeController.focus.focusedNode;
        if (focusedNode) {
          e.preventDefault();
          e.stopPropagation();
          const nextFocusNode = !focusedNode
            ? undefined
            : focusedNode.getLeftSibling()
            ? focusedNode.getLeftSibling()
            : focusedNode.getRightSibling()
            ? focusedNode.getRightSibling()
            : focusedNode.getParent() && !focusedNode.getParent()?.isRoot()
            ? focusedNode.getParent()
            : undefined;
          treeController.mutations.deleteNode(treeController.focus.focusedNode);
          treeController.focus.setFocusedNode(nextFocusNode);
        }
      }
      // Recover last deleted item
      else if (shortcuts.recoverDeletionCheck(e)) {
        e.preventDefault();
        e.stopPropagation();
        const recoveredNode = treeController.mutations.recoverDeletion();
        treeController.focus.setFocusedNode(recoveredNode);
      }
    };

    const subs = new Subs();
    subs.subscribeDOMEvent(domObj, 'keydown', keyDownListener);
    return subs.createCleanup();
  }, [
    treeController.expansions,
    treeController.focus,
    treeController.mutations,
    treeController.options,
    shortcuts,
    domObj,
  ]);

  return shortcuts;
};

export interface TreeShortcuts {
  focusUpShortcutDisplay: string;
  focusUpShortcutCheck: (e: KeyboardEvent) => boolean;
  focusDownShortcutDisplay: string;
  focusDownShortcutCheck: (e: KeyboardEvent) => boolean;
  moveNodeUpDisplay: string;
  moveNodeUpCheck: (e: KeyboardEvent) => boolean;
  moveNodeDownDisplay: string;
  moveNodeDownCheck: (e: KeyboardEvent) => boolean;
  moveNodeLeftDisplay: string;
  moveNodeLeftCheck: (e: KeyboardEvent) => boolean;
  moveNodeRightDisplay: string;
  moveNodeRightCheck: (e: KeyboardEvent) => boolean;
  toggleExpandNodeDisplay: string;
  toggleExpandNodeCheck: (e: KeyboardEvent) => boolean;
  expandAllDisplay: string;
  expandAllCheck: (e: KeyboardEvent) => boolean;
  collapseAllDisplay: string;
  collapseAllCheck: (e: KeyboardEvent) => boolean;
  newItemBelowDisplay: string;
  newItemBelowCheck: (e: KeyboardEvent) => boolean;
  newItemInsideDisplay: string;
  newItemInsideCheck: (e: KeyboardEvent) => boolean;
  deleteItemIfEmptyDisplay: string;
  deleteItemIfEmptyCheck: (e: KeyboardEvent) => boolean;
  deleteItemDisplay: string;
  deleteItemCheck: (e: KeyboardEvent) => boolean;
  recoverDeletionDisplay: string;
  recoverDeletionCheck: (e: KeyboardEvent) => boolean;
}

export const defaultTreeShortcuts: TreeShortcuts = {
  focusUpShortcutDisplay: 'Up',
  focusUpShortcutCheck: (e: KeyboardEvent) =>
    e.code === KeyCode.CODE_UP && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey,
  focusDownShortcutDisplay: 'Down',
  focusDownShortcutCheck: (e: KeyboardEvent) =>
    e.code === KeyCode.CODE_DOWN && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey,
  moveNodeUpDisplay: 'Ctrl+Shift+Up',
  moveNodeUpCheck: (e: KeyboardEvent) =>
    e.code === KeyCode.CODE_UP && e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey,
  moveNodeDownDisplay: 'Ctrl+Shift+Down',
  moveNodeDownCheck: (e: KeyboardEvent) =>
    e.code === KeyCode.CODE_DOWN && e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey,
  moveNodeLeftDisplay: 'Ctrl+Shift+Left',
  moveNodeLeftCheck: (e: KeyboardEvent) =>
    e.code === KeyCode.CODE_LEFT && e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey,
  moveNodeRightDisplay: 'Ctrl+Shift+Right',
  moveNodeRightCheck: (e: KeyboardEvent) =>
    e.code === KeyCode.CODE_RIGHT && e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey,
  toggleExpandNodeDisplay: 'Ctrl+Shift+X',
  toggleExpandNodeCheck: (e: KeyboardEvent) =>
    e.code === KeyCode.CODE_X && e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey,
  expandAllDisplay: 'Ctrl+Shift+⌘+X',
  expandAllCheck: (e: KeyboardEvent) => e.code === KeyCode.CODE_X && e.shiftKey && e.ctrlKey && !e.altKey && e.metaKey,
  collapseAllDisplay: 'Ctrl+Shift+⌘+C',
  collapseAllCheck: (e: KeyboardEvent) =>
    e.code === KeyCode.CODE_C && e.shiftKey && e.ctrlKey && !e.altKey && e.metaKey,
  newItemBelowDisplay: 'Enter',
  newItemBelowCheck: (e: KeyboardEvent) =>
    e.code === KeyCode.CODE_ENTER && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey,
  newItemInsideDisplay: 'Shift+Enter',
  newItemInsideCheck: (e: KeyboardEvent) =>
    e.code === KeyCode.CODE_ENTER && e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey,
  deleteItemIfEmptyDisplay: '⌫',
  deleteItemIfEmptyCheck: (e: KeyboardEvent) =>
    e.code === KeyCode.CODE_BACK_SPACE && !e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey,
  deleteItemDisplay: isMacOs ? '⌘+⌫' : 'Ctrl+Delete',
  deleteItemCheck: (e: KeyboardEvent) =>
    isMacOs
      ? e.code === KeyCode.CODE_BACK_SPACE && !e.shiftKey && !e.ctrlKey && !e.altKey && e.metaKey
      : e.code === KeyCode.CODE_DELETE && !e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey,
  recoverDeletionDisplay: isMacOs ? '⌘+⌥+⌫' : 'Ctrl+Shift+Z',
  recoverDeletionCheck: (e: KeyboardEvent) =>
    isMacOs
      ? e.code === KeyCode.CODE_BACK_SPACE && !e.shiftKey && !e.ctrlKey && e.altKey && e.metaKey
      : e.code === KeyCode.CODE_Z && e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey,
};
