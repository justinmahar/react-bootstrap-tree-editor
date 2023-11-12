import React from 'react';
import { Tree, TreeNode } from 'versatile-tree';
import { TreeControllerOptions } from './TreeControllerOptions';
export declare const UNDEFINED_ID = "UNDEFINED_ID";
export declare const useTreeController: (tree: Tree, setTree: (newTree: Tree | TreeNode) => void, opts: TreeControllerOptions) => {
    tree: Tree;
    setTree: (newTree: Tree | TreeNode) => void;
    options: TreeControllerOptions;
    expansions: {
        expansionsMap: Record<string, boolean>;
        setExpansionsMap: (value: Record<string, boolean>) => void;
        isExpandedId: (id?: string | undefined) => boolean;
        isExpandedNode: (node?: TreeNode | undefined) => boolean;
        setExpandedId: (id: string | undefined, expanded: boolean) => void;
        setExpandedNode: (node: TreeNode | undefined, expanded: boolean) => void;
        toggleExpandNode: (node?: TreeNode | undefined, expand?: boolean | undefined) => void;
        expandAll: () => void;
        collapseAll: () => void;
    };
    mutations: {
        deleteNode: (nodeOrId?: string | TreeNode | undefined) => void;
        deletions: import("./useTreeMutations").DeletionInfo[];
        recoverDeletion: () => TreeNode | undefined;
        updateNode: (nodeOrId: string | TreeNode, dataPartial: Record<string, any>) => void;
        addSiblingNodeData: (nodeOrId: string | TreeNode, data: Record<string, any>) => TreeNode | undefined;
        addChildNodeData: (nodeOrId: string | TreeNode, data: Record<string, any>) => TreeNode | undefined;
        moveNodeLeft: (nodeOrId?: string | TreeNode | undefined) => void;
        moveNodeDown: (nodeOrId?: string | TreeNode | undefined) => void;
        moveNodeUp: (nodeOrId?: string | TreeNode | undefined) => void;
        moveNodeRight: (nodeOrId?: string | TreeNode | undefined) => void;
    };
    focus: {
        focusedId: string;
        setFocusedId: React.Dispatch<React.SetStateAction<string>>;
        isFocusedId: (id?: string | undefined) => boolean;
        focusedNode: TreeNode | undefined;
        isFocusedNode: (treeNode?: TreeNode | undefined) => boolean | undefined;
        setFocusedNode: (treeNode?: TreeNode | undefined) => void;
        focusUp: () => void;
        focusDown: () => void;
        focusRight: () => void;
        focusLeft: () => void;
    };
    filters: {
        setFilter: (filter: import("./useTreeFilter").TreeNodeFilter | undefined) => void;
        hasFilter: boolean;
        filteredNodes: TreeNode[];
        isFilteredNode: (nodeOrId?: string | TreeNode | undefined) => true;
        isFilterAncestor: (nodeOrId?: string | TreeNode | undefined) => true;
    };
};
export type TreeController = ReturnType<typeof useTreeController>;
