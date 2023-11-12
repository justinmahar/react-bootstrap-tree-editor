import { Tree, TreeNode } from 'versatile-tree';
export declare const UNDEFINED_ID = "UNDEFINED_ID";
export declare const useTreeState: (initial: Record<string, any>) => [Tree, (tree: TreeNode | Tree) => void];
export type TreeState = ReturnType<typeof useTreeState>;
