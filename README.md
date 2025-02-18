<h2 align="center">
  🌲 React Bootstrap Tree Editor
</h2>
<h3 align="center">
  An interactive tree editor built on react-bootstrap.
</h3>
<p align="center">
  <a href="https://badge.fury.io/js/react-bootstrap-tree-editor" target="_blank" rel="noopener noreferrer"><img src="https://badge.fury.io/js/react-bootstrap-tree-editor.svg" alt="npm Version" /></a>&nbsp;
  <a href="https://github.com/justinmahar/react-bootstrap-tree-editor/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/GitHub-Source-success" alt="View project on GitHub" /></a>&nbsp;
  <a href="https://github.com/justinmahar/react-bootstrap-tree-editor/actions?query=workflow%3ADeploy" target="_blank" rel="noopener noreferrer"><img src="https://github.com/justinmahar/react-bootstrap-tree-editor/workflows/Deploy/badge.svg" alt="Deploy Status" /></a>
</p>
<!-- [lock:donate-badges] 🚫--------------------------------------- -->
<p align="center">
  <a href="https://paypal.me/thejustinmahar/5"><img src="https://img.shields.io/static/v1?label=Buy%20me%20a%20coffee&message=%E2%9D%A4&logo=KoFi&color=%23fe8e86" alt="Buy me a coffee" /></a>&nbsp;<a href="https://github.com/sponsors/justinmahar" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86" alt="Sponsor"/></a>
</p>
<!-- [/lock:donate-badges] ---------------------------------------🚫 -->

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

<!-- [lock:donate] 🚫--------------------------------------- -->

## Donate 

If this project helped save you time, please consider buying me a coffee, which powers my development (and life). Your support is much appreciated!

<a href="https://github.com/sponsors/justinmahar"><img src="https://justinmahar.github.io/react-kindling/support/sponsor.png" alt="Sponsor via GitHub" height="35" /></a>&nbsp; <a href="https://paypal.me/thejustinmahar/5"><img src="https://justinmahar.github.io/react-kindling/support/coffee-1.png" alt="Buy me a coffee" height="35" /></a>&nbsp; <a href="https://paypal.me/thejustinmahar/15"><img src="https://justinmahar.github.io/react-kindling/support/coffee-3.png" alt="Buy me 3 coffees" height="35" /></a>&nbsp; <a href="https://paypal.me/thejustinmahar/25"><img src="https://justinmahar.github.io/react-kindling/support/coffee-5.png" alt="Buy me 5 coffees" height="35" /></a>

<!-- [/lock:donate] ---------------------------------------🚫 -->

## Table of Contents 

- [Documentation](#documentation)
- [Overview](#overview)
  - [Features include:](#features-include)
- [Donate](#donate)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Setting Tree Data Externally](#setting-tree-data-externally)
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

## Setting Tree Data Externally

If you'd like to set the tree data yourself outside of the editor, then you'll need to force the tree node component to re-render when you set the data.

To do this, you can create a piece of state called `changeTime` that tracks when you set the data yourself. You'd then pass this value as the `key` prop to the `BasicTreeNodeComponent`.

```ts
// Use this to force tree to re-render when setting tree data
const [changeTime, setChangeTime] = React.useState(Date.now());
```

```ts
const resetTree = () => {
  const newTree = new Tree(defaultTreeData);
  // Track when we changed the tree data ourselves
  setChangeTime(Date.now());
  setTree(newTree);
}
```

Add the `key` prop to `BasicTreeNodeComponent`, using the `changeTime` as the value:

```jsx
<BasicTreeNodeComponent
  key={changeTime} // Ensures external changes to tree data are rendered
  node={treeController.tree}
  treeController={treeController}
  editable={true}
  shortcuts={shortcuts}
  showBullets={false}
  showPointer={false}
/>
```

Now you can modify the tree using both the editor, and externally.

<!-- [lock:typescript] 🚫--------------------------------------- -->

## TypeScript

Type definitions have been included for [TypeScript](https://www.typescriptlang.org/) support.

<!-- [/lock:typescript] ---------------------------------------🚫 -->

<!-- [lock:icon] 🚫--------------------------------------- -->

## Icon Attribution

Favicon by [Twemoji](https://github.com/twitter/twemoji).

<!-- [/lock:icon] ---------------------------------------🚫 -->

<!-- [lock:contributing] 🚫--------------------------------------- -->

## Contributing

Open source software is awesome and so are you. 😎

Feel free to submit a pull request for bugs or additions, and make sure to update tests as appropriate. If you find a mistake in the docs, send a PR! Even the smallest changes help.

For major changes, open an issue first to discuss what you'd like to change.

<!-- [/lock:contributing] --------------------------------------🚫 -->

## ⭐ Found It Helpful? [Star It!](https://github.com/justinmahar/react-bootstrap-tree-editor/stargazers)

If you found this project helpful, let the community know by giving it a [star](https://github.com/justinmahar/react-bootstrap-tree-editor/stargazers): [👉⭐](https://github.com/justinmahar/react-bootstrap-tree-editor/stargazers)

<!-- [lock:support] 🚫--------------------------------------- -->
Want to support the project? Feel free to grab me a coffee, which is my main source of fuel for development:

<a href="https://paypal.me/thejustinmahar/5"><img src="https://justinmahar.github.io/react-kindling/support/coffee-1.png" alt="Buy me a coffee" height="35" /></a>&nbsp; <a href="https://paypal.me/thejustinmahar/15"><img src="https://justinmahar.github.io/react-kindling/support/coffee-3.png" alt="Buy me 3 coffees" height="35" /></a>&nbsp; <a href="https://paypal.me/thejustinmahar/25"><img src="https://justinmahar.github.io/react-kindling/support/coffee-5.png" alt="Buy me 5 coffees" height="35" /></a>

<!-- [/lock:support] ---------------------------------------🚫 -->

## License

See [LICENSE.md](https://justinmahar.github.io/react-bootstrap-tree-editor/?path=/docs/license--docs).