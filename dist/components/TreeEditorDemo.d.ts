import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
export declare const TreeEditorDemo: () => React.JSX.Element;
export declare const demoTreeData: {
    title: string;
    children: {
        id: string;
        title: string;
        children: {
            id: string;
            title: string;
            children: {
                id: string;
                title: string;
                children: never[];
            }[];
        }[];
    }[];
};
