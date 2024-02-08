import type { Meta, StoryObj } from '@storybook/react';
import { TreeEditorDemo } from '../components/TreeEditorDemo';

// === Setup ===
const StoryComponent = TreeEditorDemo; // <-- Set to your component
const meta: Meta<typeof StoryComponent> = {
  title: 'Stories/Demo', // <-- Set to your story title
  component: StoryComponent,
  parameters: {
    options: { showPanel: false }, // Don't show addons panel
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

// === Stories ===
export const Demo: Story = {};