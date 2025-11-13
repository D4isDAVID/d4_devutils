export enum NuiCallback {
    Close = 'close',
    RunCodeJs = 'runCode:javascript',
    RunCodeLua = 'runCode:lua',
}

export interface NuiCallbackData {
    [NuiCallback.Close]: null;
    [NuiCallback.RunCodeJs]: string;
    [NuiCallback.RunCodeLua]: string;
}

export interface NuiCallbackResponse {
    [NuiCallback.Close]: true;
    [NuiCallback.RunCodeJs]: { success: boolean; output: string };
    [NuiCallback.RunCodeLua]: { success: boolean; output: string };
}
