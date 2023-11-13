import classNames from 'classnames';
import React from 'react';
import { Form } from 'react-bootstrap';
import { TreeNode } from 'versatile-tree';
import { TreeController } from '../hooks/useTreeController';

export const DIVIDER_TITLE = '---';

const editDebounceDelayMillis = 200;

export interface BasicTreeNodeTitleComponentProps {
  node: TreeNode;
  treeController: TreeController;
  editable?: boolean;
  hovering?: boolean;
}

export const BasicTreeNodeTitleComponent = ({
  node,
  treeController,
  editable = false,
  hovering,
}: BasicTreeNodeTitleComponentProps) => {
  const titleFieldRef = React.useRef<HTMLInputElement | null>(null);
  const [enteredTitle, setEnteredTitle] = React.useState<string>(
    node.getData()[treeController.options.titlePropertyName] ?? '',
  );
  const [titleChanged, setTitleChanged] = React.useState(false);
  const handleTitleChanged = (title: string) => {
    setEnteredTitle(title);
    setTitleChanged(true);
  };

  const handleTextFocus = () => {
    treeController.focus.setFocusedNode(node);
  };

  React.useEffect(() => {
    if (
      node.getData()[treeController.options.idPropertyName] ===
      treeController.focus.focusedNode?.getData()[treeController.options.idPropertyName]
    ) {
      titleFieldRef.current?.focus();
    }
  }, [node, treeController.expansions, treeController.focus.focusedNode, treeController.options.idPropertyName]);

  // When editing title, update node after debounce delay
  React.useEffect(() => {
    let timeout: any = undefined;
    if (titleChanged) {
      timeout = setTimeout(() => {
        treeController.mutations.updateNode(node, { [treeController.options.titlePropertyName]: enteredTitle });
        setTitleChanged(false);
      }, editDebounceDelayMillis);
    }
    return () => clearTimeout(timeout);
  }, [enteredTitle, treeController.mutations, titleChanged, node, treeController.options.titlePropertyName]);

  let titleComponent = <div>{enteredTitle}</div>;
  if (editable) {
    titleComponent = (
      <Form.Control
        ref={titleFieldRef}
        type="text"
        value={enteredTitle}
        onChange={(e) => handleTitleChanged(e.target.value)}
        onFocus={handleTextFocus}
        className={classNames(hovering && 'bg-light')}
      />
    );
  } else {
    titleComponent =
      enteredTitle === DIVIDER_TITLE ? (
        <hr className="w-100 my-2 py-0" />
      ) : (
        <div className="p-1 w-100" style={{ fontSize: '105%' }}>
          {enteredTitle}
        </div>
      );
  }

  return titleComponent;
};
