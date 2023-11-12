import React from 'react';
import { Tree, TreeNode } from 'versatile-tree';
import { TreeControllerOptions } from './TreeControllerOptions';
import { useTreeExpansions } from './useTreeExpansions';
import { useTreeFocus } from './useTreeFocus';
import { useTreeMutations } from './useTreeMutations';
import { useTreeFilter } from './useTreeFilter';

export const UNDEFINED_ID = 'UNDEFINED_ID';

export const useTreeController = (
  tree: Tree,
  setTree: (newTree: Tree | TreeNode) => void,
  opts: TreeControllerOptions,
) => {
  const options: TreeControllerOptions = React.useMemo(
    () => ({
      idPropertyName: opts.idPropertyName,
      titlePropertyName: opts.titlePropertyName,
      createNewData: opts.createNewData,
    }),
    [opts.idPropertyName, opts.titlePropertyName], // Don't add createNewData as it changes on every render
  );
  const expansions = useTreeExpansions(tree, options);
  const mutations = useTreeMutations(tree, setTree, options);
  const focus = useTreeFocus(tree, expansions, options);
  const filters = useTreeFilter(tree, options);
  return React.useMemo(
    () => ({
      tree,
      setTree,
      options,
      expansions,
      mutations,
      focus,
      filters,
    }),
    [tree, setTree, options, expansions, mutations, focus, filters],
  );
};

export type TreeController = ReturnType<typeof useTreeController>;
