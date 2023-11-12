import * as React from 'react';
import { Badge, Col, Container, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Subs } from 'react-sub-unsub';
import { TreeNode } from 'versatile-tree';
import { BasicTreeNodeComponent } from './BasicTreeNodeComponent';
import { TreeControllerOptions, defaultTreeControllerOptions } from '../hooks/TreeControllerOptions';
import { defaultTreeData, useTreeState } from '../hooks/useTreeState';
import { TreeController, useTreeController } from '../hooks/useTreeController';
import { useTreeShortcuts } from '../hooks/useTreeShortcuts';
import { KeyCode } from '../utils/utils';

export const TreeEditorDemo = (props: any) => {
  const [treeEditingEnabled, setTreeEditingEnabled] = React.useState(true);
  const treeOptions: TreeControllerOptions = defaultTreeControllerOptions;
  const [tree, setTree] = useTreeState(defaultTreeData);
  const treeController: TreeController = useTreeController(tree, setTree, treeOptions);

  const [enteredSearch, setEnteredSearch] = React.useState('');
  const trimmedEnteredSearch = enteredSearch.trim();

  const shortcuts = useTreeShortcuts(treeController, document);

  const handleSearchFocus = () => {
    treeController.focus.setFocusedNode(undefined);
  };

  React.useEffect(() => {
    const keyDownListener = (e: KeyboardEvent) => {
      // For debugging:
      // console.log('Code:', e.code, 'Key:', e.key);

      // Ctrl+Shift+E = Toggle edit/view mode
      if (e.code === KeyCode.CODE_E && e.shiftKey && e.ctrlKey && !e.altKey && !e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        setTreeEditingEnabled(!treeEditingEnabled);
      }
    };
    const subs = new Subs();
    subs.subscribeDOMEvent(document, 'keydown', keyDownListener);
    return subs.createCleanup();
  });

  // Ensure there's always at least one item to edit
  React.useEffect(() => {
    if (!treeController.tree.hasChildren()) {
      const newNodeData = treeController.options.createNewData();
      const node = treeController.mutations.addChildNodeData(treeController.tree, newNodeData);
      treeController.focus.setFocusedNode(node);
    }
  }, [treeController.focus, treeController.mutations, treeController.tree, treeController.options]);

  React.useEffect(() => {
    const subs = new Subs();
    if (trimmedEnteredSearch) {
      const newFilter = (node?: TreeNode) =>
        !!node &&
        node.getData()[treeOptions.titlePropertyName] &&
        node.getData()[treeOptions.titlePropertyName].toLowerCase().includes(enteredSearch.toLowerCase());
      treeController.filters.setFilter(newFilter);
    } else {
      treeController.filters.setFilter(undefined);
    }
    return subs.createCleanup();
  }, [treeOptions.titlePropertyName, trimmedEnteredSearch]); // Don't include treeController.filters

  return (
    <Container className="my-4">
      <Row>
        <Col sm={{ offset: 2, span: 8 }}>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between align-items-center gap-2">
                <h4 className="mb-0">Tree Editor</h4>
                <div className="d-flex align-items-center gap-1">
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 0, hide: 0 }}
                    overlay={
                      <Tooltip id="tooltip-editing">
                        Switch to {!treeEditingEnabled ? 'Edit' : 'View'} mode. (Ctrl+Shift+E)
                      </Tooltip>
                    }
                  >
                    <Form.Check
                      type="switch"
                      label={
                        <Badge bg={treeEditingEnabled ? 'primary' : 'dark'}>
                          {treeEditingEnabled ? 'Edit' : 'View'}
                        </Badge>
                      }
                      className="user-select-none"
                      id="toggle-switch-editing"
                      checked={!!treeEditingEnabled}
                      onChange={(e) => setTreeEditingEnabled(e.target.checked)}
                    />
                  </OverlayTrigger>
                </div>
              </div>
              <Form.Group controlId="search-group">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  value={enteredSearch}
                  onChange={(e) => setEnteredSearch(e.target.value)}
                  onFocus={handleSearchFocus}
                />
              </Form.Group>
              {enteredSearch && (
                <div>
                  Showing <Badge bg="dark">{treeController.filters.filteredNodes.length}</Badge> result
                  {treeController.filters.filteredNodes.length !== 1 && 's'}
                </div>
              )}
              <BasicTreeNodeComponent
                node={treeController.tree}
                treeController={treeController}
                editable={!!treeEditingEnabled}
                shortcuts={shortcuts}
                showBullets={!treeEditingEnabled}
              />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
