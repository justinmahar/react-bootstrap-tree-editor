"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Demo = void 0;
/*
 * More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
 * More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
 * More on args: https://storybook.js.org/docs/react/writing-stories/args
 * More on argTypes: https://storybook.js.org/docs/react/api/argtypes
 */
const react_1 = __importDefault(require("react"));
const TreeEditorDemo_1 = require("../components/TreeEditorDemo");
exports.default = {
    title: 'Stories/Demo',
    component: TreeEditorDemo_1.TreeEditorDemo,
};
const Template = (args) => react_1.default.createElement(TreeEditorDemo_1.TreeEditorDemo, Object.assign({}, args));
exports.Demo = Template.bind({});
// Demo.args = {
//   label: 'World',
// };
