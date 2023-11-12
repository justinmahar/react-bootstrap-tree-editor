import { Tree, TreeNode } from 'versatile-tree';
import { TreeControllerOptions } from './TreeControllerOptions';
export declare const useTreeFilter: (tree: Tree, treeOptions: TreeControllerOptions) => {
    setFilter: (filter: TreeNodeFilter | undefined) => void;
    hasFilter: boolean;
    filteredNodes: TreeNode[];
    isFilteredNode: (nodeOrId?: TreeNode | string) => true;
    isFilterAncestor: (nodeOrId?: TreeNode | string) => true;
};
export type TreeNodeFilter = (node?: TreeNode) => boolean;
