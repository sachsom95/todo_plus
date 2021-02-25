import * as _vscode from 'vscode'

declare global{
    const tsvscode:{
        getState: () => any;
        setState: (state: any) => any;
        postMessage: ({type:string,value:any})=>void;
    }
}