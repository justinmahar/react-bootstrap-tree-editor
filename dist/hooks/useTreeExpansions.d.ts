import { TreeNode } from 'versatile-tree';
import { TreeControllerOptions } from './TreeControllerOptions';
export declare const useTreeExpansions: (tree: TreeNode, treeOptions: TreeControllerOptions) => {
    expansionsMap: Record<string, boolean>;
    setExpansionsMap: (value: Record<string, boolean>) => void;
    isExpandedId: (id?: string) => boolean;
    isExpandedNode: (node?: TreeNode) => boolean;
    setExpandedId: (id: string | undefined, expanded: boolean) => void;
    setExpandedNode: (node: TreeNode | undefined, expanded: boolean) => void;
    toggleExpandNode: (node?: TreeNode, expand?: boolean) => void;
    expandAll: () => void;
    collapseAll: () => void;
};
export type TreeExpansions = ReturnType<typeof useTreeExpansions>;
