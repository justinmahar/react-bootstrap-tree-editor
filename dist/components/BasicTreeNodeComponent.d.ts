import React from 'react';
import { DivProps } from 'react-html-props';
import { TreeNode } from 'versatile-tree';
import { TreeController } from '../hooks/useTreeController';
import { TreeShortcuts } from '../hooks/useTreeShortcuts';
export interface BasicTreeNodeComponentProps extends DivProps {
    node: TreeNode;
    treeController: TreeController;
    editable?: boolean;
    showBullets?: boolean;
    showPointer?: boolean;
    shortcuts?: TreeShortcuts;
}
export declare const BasicTreeNodeComponent: ({ node, treeController, editable, showBullets, showPointer, shortcuts, ...props }: BasicTreeNodeComponentProps) => React.JSX.Element;
