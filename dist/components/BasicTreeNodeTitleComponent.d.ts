import React from 'react';
import { TreeNode } from 'versatile-tree';
import { TreeController } from '../hooks/useTreeController';
export interface BasicTreeNodeTitleComponentProps {
    node: TreeNode;
    treeController: TreeController;
    editable?: boolean;
    hovering?: boolean;
}
export declare const BasicTreeNodeTitleComponent: ({ node, treeController, editable, hovering, }: BasicTreeNodeTitleComponentProps) => React.JSX.Element;
