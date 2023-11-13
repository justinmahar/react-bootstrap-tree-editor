import classNames from 'classnames';
import React from 'react';
import { DivProps } from 'react-html-props';
import { FaAngleDown, FaAngleRight, FaCircle, FaHandPointRight } from 'react-icons/fa';
import { TreeNode } from 'versatile-tree';
import { TreeController, UNDEFINED_ID } from '../hooks/useTreeController';
import { TreeShortcuts } from '../hooks/useTreeShortcuts';
import { BasicTreeNodeTitleComponent } from './BasicTreeNodeTitleComponent';
import { BasicTreeNodeDropdown } from './BasicTreeNodeDropdown';
import { key } from '../utils/utils';

export interface BasicTreeNodeComponentProps extends DivProps {
  node: TreeNode;
  treeController: TreeController;
  editable?: boolean;
  showBullets?: boolean;
  showPointer?: boolean;
  shortcuts?: TreeShortcuts;
}

export const BasicTreeNodeComponent = ({
  node,
  treeController,
  editable = false,
  showBullets = false,
  showPointer = false,
  shortcuts,
  ...props
}: BasicTreeNodeComponentProps) => {
  const expanded = treeController.expansions.isExpandedNode(node);
  const [hovering, setHovering] = React.useState(false);
  const children: TreeNode[] = node.getChildren() ?? [];
  const hasChildren = node.hasChildren();
  const isFocused = treeController.focus.isFocusedNode(node);
  const isFilteredNode = treeController.filters.isFilteredNode(node);

  const handleToggleShowChildren = () => {
    if (node.hasChildren()) {
      treeController.expansions.toggleExpandNode(node);
    }
    treeController.focus.setFocusedNode(node);
  };

  const handleMouseEnter = () => {
    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  React.useEffect(() => {
    // Ensure ancestors of focused items are all expanded
    if (
      treeController.focus.focusedNode &&
      node.isAncestorOf(treeController.focus.focusedNode) &&
      !treeController.expansions.isExpandedNode(node)
    ) {
      treeController.expansions.toggleExpandNode(node, true);
    } else if (
      treeController.filters.hasFilter &&
      treeController.filters.isFilterAncestor(node) &&
      !treeController.expansions.isExpandedNode(node)
    ) {
      treeController.expansions.toggleExpandNode(node, true);
    }
  }, [node, treeController.expansions, treeController.filters, treeController.focus.focusedNode]);

  const childrenToRender = treeController.filters.hasFilter
    ? children.filter(
        (child) => treeController.filters.isFilteredNode(child) || treeController.filters.isFilterAncestor(child),
      )
    : children;
  const entryElements: JSX.Element[] = childrenToRender.map((childNode, i) => {
    const elemKey = key(
      `parent`,
      node.getData()[treeController.options.idPropertyName] ?? UNDEFINED_ID,
      'child',
      childNode.getData()[treeController.options.idPropertyName] ?? UNDEFINED_ID,
      'index',
      i,
    );
    return (
      <BasicTreeNodeComponent
        key={elemKey}
        node={childNode}
        treeController={treeController}
        editable={editable}
        shortcuts={shortcuts}
        showBullets={showBullets}
        showPointer={showPointer}
      />
    );
  });

  const iconWidth = 14;

  return (
    <div {...props} className={classNames(props.className)} style={{ ...props.style }}>
      {!node.isRoot() && (
        <div
          className={classNames(
            'd-flex align-items-center gap-1 position-relative',
            // isFilteredNode && !editable && 'text-decoration-underline',
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {showPointer && isFocused && (
            <div className="position-absolute" style={{ left: -20 }}>
              <FaHandPointRight />
            </div>
          )}
          {hasChildren && (
            <div
              className="d-flex justify-content-center align-items-center user-select-none"
              style={{ width: iconWidth, cursor: 'pointer' }}
              onClick={handleToggleShowChildren}
            >
              {expanded && hasChildren ? <FaAngleDown /> : <FaAngleRight style={{ opacity: !hasChildren ? 0 : 1 }} />}
            </div>
          )}
          {!hasChildren && (
            <div
              className="d-flex justify-content-center align-items-center user-select-none"
              style={{ width: iconWidth }}
            >
              {showBullets && <FaCircle style={{ fontSize: '30%' }} />}
            </div>
          )}
          <BasicTreeNodeTitleComponent
            node={node}
            treeController={treeController}
            editable={editable}
            hovering={hovering}
          />
          {editable && (
            <div className="d-flex align-items-center gap-1 ms-1 user-select-none">
              <BasicTreeNodeDropdown node={node} treeController={treeController} shortcuts={shortcuts} />
            </div>
          )}
        </div>
      )}
      {((expanded && hasChildren) || node.isRoot()) && (
        <div className={classNames('d-flex flex-column gap-1 mt-1', !node.isRoot() && 'ms-4')}>
          {entryElements.length > 0 && <div className="d-flex flex-column gap-1">{entryElements}</div>}
        </div>
      )}
    </div>
  );
};
