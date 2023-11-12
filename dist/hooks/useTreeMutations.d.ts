import { Tree, TreeNode } from 'versatile-tree';
import { TreeControllerOptions } from './TreeControllerOptions';
export interface DeletionInfo {
    parentId: string | undefined;
    data: Record<string, any>;
    index: number;
}
export declare const useTreeMutations: (tree: Tree, setTree: (newTree: Tree | TreeNode) => void, treeOptions: TreeControllerOptions) => {
    deleteNode: (nodeOrId?: TreeNode | string) => void;
    deletions: DeletionInfo[];
    recoverDeletion: () => TreeNode | undefined;
    updateNode: (nodeOrId: TreeNode | string, dataPartial: Record<string, any>) => void;
    addSiblingNodeData: (nodeOrId: TreeNode | string, data: Record<string, any>) => TreeNode | undefined;
    addChildNodeData: (nodeOrId: TreeNode | string, data: Record<string, any>) => TreeNode | undefined;
    moveNodeLeft: (nodeOrId?: TreeNode | string) => void;
    moveNodeDown: (nodeOrId?: TreeNode | string) => void;
    moveNodeUp: (nodeOrId?: TreeNode | string) => void;
    moveNodeRight: (nodeOrId?: TreeNode | string) => void;
};
export type TreeActions = ReturnType<typeof useTreeMutations>;
