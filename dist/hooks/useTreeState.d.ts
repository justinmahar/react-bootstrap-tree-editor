import { Tree, TreeNode } from 'versatile-tree';
export declare const defaultTreeData: {
    [x: string]: string | never[];
    children: never[];
};
export declare const useTreeState: (initial: Record<string, any>) => [Tree, (tree: TreeNode | Tree) => void];
export type TreeState = ReturnType<typeof useTreeState>;
