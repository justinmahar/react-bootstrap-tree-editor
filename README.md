<h2 align="center">
  🌲 React Bootstrap Tree Editor
</h2>
<h3 align="center">
  An interactive tree editor built on react-bootstrap.
</h3>
<p align="center">
  <a href="https://badge.fury.io/js/react-bootstrap-tree-editor" target="_blank" rel="noopener noreferrer"><img src="https://badge.fury.io/js/react-bootstrap-tree-editor.svg" alt="npm Version" /></a>&nbsp;
  <a href="https://github.com/justinmahar/react-bootstrap-tree-editor/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/GitHub-Source-success" alt="View project on GitHub" /></a>&nbsp;
  <a href="https://github.com/justinmahar/react-bootstrap-tree-editor/actions?query=workflow%3ADeploy" target="_blank" rel="noopener noreferrer"><img src="https://github.com/justinmahar/react-bootstrap-tree-editor/workflows/Deploy/badge.svg" alt="Deploy Status" /></a>&nbsp;
  <a href="https://github.com/sponsors/justinmahar" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86" alt="Sponsor"/></a>
</p>

<p align="center">
 <a href="https://justinmahar.github.io/react-bootstrap-tree-editor/?path=/story/stories-demo--demo"><img src="https://raw.githubusercontent.com/justinmahar/react-bootstrap-tree-editor/master/screenshots/demo.png" width="400" /></a>
</p>

<h2 align="center"><a href="https://justinmahar.github.io/react-bootstrap-tree-editor/?path=/story/stories-demo--demo">👁️ View Demo</a></h2>

## Documentation

Read the **[official documentation](https://justinmahar.github.io/react-bootstrap-tree-editor/)**.

## Overview

An interactive tree editor built on [react-bootstrap](https://react-bootstrap.netlify.app/) and powered by [versatile-tree](https://github.com/justinmahar/versatile-tree).

### Features include:

- **🌲 Interactive tree editing**
  - React-Bootstrap powered components and hooks for editing trees.
- **🌐 Expansion Management**
  - Track which nodes are expanded/collapsed.
- **👉 Focus Management**
  - Track and retrieve which node has focus.
- **🔥 Shortcuts**
  - Customizable shortcuts for easy tree manipulation.
- **🖊️ Edit and View Modes**
  - Easily switch between editing and viewing.
- **🔍 Filters &amp; Search**
  - Provide a filter function to make tree searchable and filterable.
- **🗑️ Deletion &amp; Recovery**
  - Delete nodes and easily recover them.
- **🌴 Powered by [versatile-tree](https://github.com/justinmahar/versatile-tree)**
  - Easy to use tree structure. Easily convert tree to/from Object and JSON forms.

[lock:donate]::🚫---------------------------------------

## Donate 

If this project helped you, please consider buying me a coffee. Your support is much appreciated!

<a href="https://paypal.me/thejustinmahar/5"><img src="https://justinmahar.github.io/react-kindling/support/coffee-1.png" alt="Buy me a coffee" height="35" /></a> <a href="https://paypal.me/thejustinmahar/15"><img src="https://justinmahar.github.io/react-kindling/support/coffee-3.png" alt="Buy me 3 coffees" height="35" /></a> <a href="https://paypal.me/thejustinmahar/25"><img src="https://justinmahar.github.io/react-kindling/support/coffee-5.png" alt="Buy me 5 coffees" height="35" /></a>

[/lock:donate]::---------------------------------------🚫

## Table of Contents 

- [Documentation](#documentation)
- [Overview](#overview)
  - [Features include:](#features-include)
- [Donate](#donate)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Available Components](#available-components)
- [Available Hooks](#available-hooks)
- [Tree Options](#tree-options)
- [TypeScript](#typescript)
- [Icon Attribution](#icon-attribution)
- [Contributing](#contributing)
- [⭐ Found It Helpful? Star It!](#-found-it-helpful-star-it)
- [License](#license)

## Installation

```
npm i react-bootstrap-tree-editor
```

## Quick Start

It's highly recommended you check out the [demo](https://justinmahar.github.io/react-bootstrap-tree-editor/?path=/story/stories-demo--demo) and its [source](https://github.com/justinmahar/react-bootstrap-tree-editor/blob/master/src/components/TreeEditorDemo.tsx) to quickly get yourself up and running. 

Import the following:

```jsx
import {
  BasicTreeNodeComponent,
  defaultTreeControllerOptions,
  defaultTreeData,
  useTreeController,
  useTreeShortcuts,
  useTreeState,
} from 'react-bootstrap-tree-editor';
```

Inside your function component:

```jsx
const treeOptions = defaultTreeControllerOptions;
const [tree, setTree] = useTreeState(defaultTreeData);
const treeController = useTreeController(tree, setTree, treeOptions);
const shortcuts = useTreeShortcuts(treeController, document);

// Ensure there's always at least one item to edit
React.useEffect(() => {
  if (!treeController.tree.hasChildren()) {
    const newNodeData = treeController.options.createNewData();
    const node = treeController.mutations.addChildNodeData(treeController.tree, newNodeData);
    treeController.focus.setFocusedNode(node);
  }
}, [treeController.focus, treeController.mutations, treeController.tree, treeController.options]);
```

Render the component: 

```jsx
<BasicTreeNodeComponent
  node={treeController.tree}
  treeController={treeController}
  editable={true}
  shortcuts={shortcuts}
  showBullets={false}
  showPointer={false}
/>
```

[lock:typescript]::🚫---------------------------------------

## Available Components

- **BasicTreeNodeComponent** - This is the main component used to render and edit trees. Use this as a starting point if you'd like to customize how trees are rendered.

See also:

- **BasicTreeNodeDropdown** - This component is used inside BasicTreeNodeComponent to render dropdowns.
- **BasicTreeNodeTitleComponent** - This component is used inside BasicTreeNodeComponent to render the node's title (as text, or as an input).

## Available Hooks

- **useTreeState** - A convenience hook for managing tree state with `React.useState()`.
- **useTreeController** - This is the main hook used to control the tree editor.
- **useTreeShortcuts** - A hook that listens for customizable shortcuts on the provided DOM object.

## Tree Options

By default, tree nodes have an ID with property name `id`, and titles with property name `title`. New node data is created with an ID set to a [random v4 UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier#Version_4_(random)). For example, `e7a422f6-d6f0-4c71-8545-9b2c71c50491`.

The default options can be imported via the following:

```js
import { defaultTreeControllerOptions } from 'react-bootstrap-tree-editor';
```

To customize options, you can provide useTreeController with your own tree options. For example, let's suppose we'd like to use `uid` as the ID prop and `name` as the title prop, and generate our own custom IDs. To support this, you can create your own custom tree controller options like so:

```js
// Custom ID generator
const customIdGenerator = () => `${Date.now()}`;

// Custom tree controller options
const customTreeControllerOptions = {
  idPropertyName: 'uid',
  titlePropertyName: 'name',
  createNewData: () => ({ uid: customIdGenerator(), name: '' }),
};

// ...
const treeController = useTreeController(tree, setTree, treeOptions);
```

## TypeScript

Type definitions have been included for [TypeScript](https://www.typescriptlang.org/) support.

[/lock:typescript]::---------------------------------------🚫

[lock:icon]::🚫---------------------------------------

## Icon Attribution

Favicon by [Twemoji](https://github.com/twitter/twemoji).

[/lock:icon]::---------------------------------------🚫

[lock:contributing]::🚫---------------------------------------

## Contributing

Open source software is awesome and so are you. 😎

Feel free to submit a pull request for bugs or additions, and make sure to update tests as appropriate. If you find a mistake in the docs, send a PR! Even the smallest changes help.

For major changes, open an issue first to discuss what you'd like to change.

[/lock:contributing]::---------------------------------------🚫

## ⭐ Found It Helpful? [Star It!](https://github.com/justinmahar/react-bootstrap-tree-editor/stargazers)

If you found this project helpful, let the community know by giving it a [star](https://github.com/justinmahar/react-bootstrap-tree-editor/stargazers): [👉⭐](https://github.com/justinmahar/react-bootstrap-tree-editor/stargazers)

## License

See [LICENSE.md](https://justinmahar.github.io/react-bootstrap-tree-editor/?path=/story/license--page).