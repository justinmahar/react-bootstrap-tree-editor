export interface TreeControllerOptions {
    idPropertyName: string;
    titlePropertyName: string;
    createNewData: () => Record<string, any>;
}
export declare const defaultTreeControllerOptions: TreeControllerOptions;
