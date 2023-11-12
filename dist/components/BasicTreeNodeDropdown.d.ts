import React from 'react';
import { DivProps } from 'react-html-props';
import { TreeNode } from 'versatile-tree';
import { TreeController } from '../hooks/useTreeController';
import { TreeShortcuts } from '../hooks/useTreeShortcuts';
export interface BasicTreeNodeDropdownProps extends DivProps {
    node: TreeNode;
    treeController: TreeController;
    shortcuts?: TreeShortcuts;
}
export declare const BasicTreeNodeDropdown: ({ node, treeController, shortcuts, ...props }: BasicTreeNodeDropdownProps) => React.JSX.Element;
