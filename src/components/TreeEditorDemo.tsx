import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { Alert, Badge, Col, Container, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { FaEllipsisV, FaQuestionCircle } from 'react-icons/fa';
import { Subs } from 'react-sub-unsub';
import { TreeNode } from 'versatile-tree';
import { TreeControllerOptions, defaultTreeControllerOptions } from '../hooks/TreeControllerOptions';
import { TreeController, useTreeController } from '../hooks/useTreeController';
import { useTreeShortcuts } from '../hooks/useTreeShortcuts';
import { useTreeState } from '../hooks/useTreeState';
import { KeyCode } from '../utils/utils';
import { BasicTreeNodeComponent } from './BasicTreeNodeComponent';

export const TreeEditorDemo = () => {
  const [showAlert, setShowAlert] = React.useState(true);
  const [treeEditingEnabled, setTreeEditingEnabled] = React.useState(true);
  const treeOptions: TreeControllerOptions = defaultTreeControllerOptions;
  const [tree, setTree] = useTreeState(demoTreeData);
  const treeController: TreeController = useTreeController(tree, setTree, treeOptions);

  console.log(tree.toJSON());

  const [enteredSearch, setEnteredSearch] = React.useState('');
  const trimmedEnteredSearch = enteredSearch.trim();

  const shortcuts = useTreeShortcuts(treeController, document);

  const handleSearchFocus = () => {
    treeController.focus.setFocusedNode(undefined);
  };

  // Keyboard shortcut handling (for Demo only -- see useTreeShortcuts for more)
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

  // Expand all on first render
  React.useEffect(() => {
    treeController.expansions.expandAll();
  }, []); // Leave deps empty (run only once)

  // Handle setting the search filter
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
            {showAlert && (
              <Alert variant="primary" dismissible onClose={() => setShowAlert(false)}>
                <p>
                  This is a demo of{' '}
                  <a href="https://github.com/justinmahar/react-bootstrap-tree-editor">react-bootstrap-tree-editor</a>,
                  built on <a href="https://react-bootstrap.netlify.app/">react-bootstrap</a> and powered by{' '}
                  <a href="https://github.com/justinmahar/versatile-tree">versatile-tree</a>.
                </p>
                <p>
                  You will likely want to customize this further, but this demo serves as a good starting point should
                  you be interested in using this project.
                </p>
                <p>
                  A few handy things you can try out:
                  <ul>
                    <li>
                      <span className="fw-bold">Edit/View Modes</span> - Switch from Edit to View mode using the toggle
                      switch.
                    </li>
                    <li>
                      <span className="fw-bold">Keyboard Editing</span> - Use Enter to insert items below, Shift+Enter
                      to insert inside. Customizable shortcuts are available for moving items.
                    </li>
                    <li>
                      <span className="fw-bold">Actions Dropdown</span> - Click the ellipsis <FaEllipsisV /> to view
                      actions and their associated shortcuts.
                    </li>
                    <li>
                      <span className="fw-bold">Deletion &amp; Recovery</span> - Delete items from the tree and recover
                      them if deleted on accident.
                    </li>
                    <li>
                      <span className="fw-bold">Dividers</span> - Use triple-dash (<code>---</code>) to create a
                      horizontal divider when in View Mode.
                    </li>
                    <li>
                      <span className="fw-bold">Searching</span> - Full tree searching, including auto node expansion on
                      matches. Try searching for "dragon".
                    </li>
                  </ul>
                </p>
                <p>
                  You can{' '}
                  <a href="https://github.com/justinmahar/react-bootstrap-tree-editor/blob/master/src/components/TreeEditorDemo.tsx">
                    view the source here
                  </a>
                  .
                </p>
                <p className="mb-0">
                  If this project helps you, please{' '}
                  <a href="https://github.com/justinmahar/react-bootstrap-tree-editor">star it on GitHub</a> and
                  consider{' '}
                  <a href="https://github.com/justinmahar/react-bootstrap-tree-editor#donate">buying me a coffee</a> if
                  you're feeling appreciative! ☕️
                </p>
              </Alert>
            )}
            <div className="d-flex justify-content-between align-items-center gap-2">
              <h4 className="mb-0">
                Tree Editor
                {!showAlert && (
                  <FaQuestionCircle
                    className="ms-2 text-primary"
                    style={{ fontSize: '50%', cursor: 'pointer' }}
                    onClick={() => setShowAlert(true)}
                  />
                )}
              </h4>
              <div className="d-flex align-items-center gap-1">
                <OverlayTrigger
                  placement="left"
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
                      <Badge bg={treeEditingEnabled ? 'primary' : 'dark'}>{treeEditingEnabled ? 'Edit' : 'View'}</Badge>
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
              showPointer={false}
            />
            <p className="mt-5 text-center text-muted">
              Found it helpful?{' '}
              <a href="https://github.com/justinmahar/react-bootstrap-tree-editor">Star it on GitHub</a> ⭐️ or{' '}
              <a href="https://github.com/justinmahar/react-bootstrap-tree-editor#donate">buy me a coffee</a> ☕️ if
              you're feeling appreciative!
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export const demoTreeData = {
  title: 'root',
  children: [
    {
      id: '0c48797c-619c-4b97-bb02-73e486dfeb26',
      title: '📋 Tasks',
      children: [
        { id: '2eaa1992-b2c7-4d4e-b088-1d539dd54be3', title: '🧺 Do laundry', children: [] },
        { id: 'c90c5af0-46a4-41c8-916d-983b53c44fcd', title: '🥘 Meal prep', children: [] },
        { id: 'cb82ba25-4283-481c-b7bc-6dd08759b41a', title: '🐉 Slay dragon', children: [] },
      ],
    },
    {
      id: '3a1986b0-7c83-42f4-b5a0-28c86520530e',
      title: '🚗 Errands',
      children: [
        {
          id: '687b042e-58cc-4f8f-9abe-9588ee73a4b3',
          title: 'Groceries',
          children: [
            { id: 'e7a422f6-d6f0-4c71-8545-9b2c71c50491', title: '🥩 Meat', children: [] },
            { id: '726e09a7-a385-41ae-80a7-fae8a74747c5', title: '🥦 Veggies', children: [] },
            { id: 'cfd7fac3-5a25-473f-ba1f-ebc17809c32e', title: '🍖 Dragon bait', children: [] },
          ],
        },
        {
          id: '00a4314c-c140-450a-9a3a-3fdfea87a289',
          title: 'Hardware',
          children: [{ id: '39249c4a-4132-4915-8dc9-0422d10b6c73', title: '🗡️ Sword', children: [] }],
        },
      ],
    },
    {
      id: '47077606-c469-40d9-8c6f-6fa1bff1f76f',
      title: '🧠 Reminders',
      children: [
        { id: '5bb660e4-e092-4e06-807e-9540d9d37247', title: '📞 Call family', children: [] },
        { id: '2223020c-5041-4a5c-80c3-fabfc4ff13e5', title: '🙏 Be grateful', children: [] },
        { id: '802795e1-4223-4922-96a5-714bc84f4465', title: '---', children: [] },
        { id: '79080099-692b-420c-90f6-014ca333e98a', title: '💤 Get to bed early', children: [] },
        { id: '06de1566-ba9b-48e0-9645-af8b9ab379ea', title: '💪 Training', children: [] },
      ],
    },
  ],
};
