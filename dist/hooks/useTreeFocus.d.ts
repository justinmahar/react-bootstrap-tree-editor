import React from 'react';
import { Tree, TreeNode } from 'versatile-tree';
import { TreeExpansions } from './useTreeExpansions';
import { TreeControllerOptions } from './TreeControllerOptions';
export declare const useTreeFocus: (tree: Tree, expansions: TreeExpansions, treeOptions: TreeControllerOptions) => {
    focusedId: string;
    setFocusedId: React.Dispatch<React.SetStateAction<string>>;
    isFocusedId: (id?: string) => boolean;
    focusedNode: TreeNode | undefined;
    isFocusedNode: (treeNode?: TreeNode) => boolean | undefined;
    setFocusedNode: (treeNode?: TreeNode) => void;
    focusUp: () => void;
    focusDown: () => void;
    focusRight: () => void;
    focusLeft: () => void;
};
export type TreeFocus = ReturnType<typeof useTreeFocus>;
