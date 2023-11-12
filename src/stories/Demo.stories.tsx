/*
 * More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
 * More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
 * More on args: https://storybook.js.org/docs/react/writing-stories/args
 * More on argTypes: https://storybook.js.org/docs/react/api/argtypes
 */
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TreeEditorDemo } from '../components/TreeEditorDemo';

export default {
  title: 'Stories/Demo',
  component: TreeEditorDemo,
  parameters: {
    controls: {
      disabled: true,
    },
    options: { showPanel: false },
  },
} as ComponentMeta<typeof TreeEditorDemo>;

const Template: ComponentStory<typeof TreeEditorDemo> = (args) => <TreeEditorDemo />;

export const Demo = Template.bind({});
// Demo.args = {
//   label: 'World',
// };
