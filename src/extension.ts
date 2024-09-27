import * as vscode from 'vscode';
import { defineCustomTemplate } from './commandHandlers/defineCustomTemplate';
import { loadtxt, load } from './commandHandlers/loadCommands';
import { refreshSidebar, modifySidebar } from './commandHandlers/sidebarCommands';
import SidebarProvider from './sidebarProvider';

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "matplotlib-pilot" is now active!');

    // 自定义命令
    context.subscriptions.push(
        vscode.commands.registerCommand('matplotlib-pilot.defineCustomTemplate', () => defineCustomTemplate(context)),
        vscode.commands.registerCommand('matplotlib-pilot.loadtxt', () => loadtxt(context)),
        vscode.commands.registerCommand('matplotlib-pilot.load', () => load(context)),
        vscode.commands.registerCommand('matplotlib-pilot.refreshSidebar', () => refreshSidebar(context)),
        vscode.commands.registerCommand('matplotlib-pilot.modifySidebar', () => modifySidebar(context))
    );


    // pltSidebarView
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            'mpSidebarView',
            new SidebarProvider(context.extensionUri)
        )
    );

}

// This method is called when your extension is deactivated
export function deactivate() {
    console.log('Extension "matplotlib-pilot" is now deactived!');
}
