import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

let conceptPanel: vscode.WebviewPanel | undefined;
let templatePanel: vscode.WebviewPanel | undefined;
let customTemplatePanel: vscode.WebviewPanel | undefined;

export default class SidebarProvider {
    constructor(private readonly extensionUri: vscode.Uri) { }

    async resolveWebviewView(webviewView: vscode.WebviewView) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this.extensionUri]
        };

        // load html in sidebar
        webviewView.webview.html = await this.getHtmlForWebview(webviewView.webview);

        // listen message
        webviewView.webview.onDidReceiveMessage(message => {
            const editor = vscode.window.activeTextEditor!;

            if ("snippets" in message) {
                let text = message.snippets;

                editor.edit((build) => {
                    // paste snippets
                    build.insert(editor.selection.end, text);
                });
            }

            // open `concept` page
            if (message.id === "concept") {
                this.openConcept();
            }

            // `pen `template` page
            if (message.id === "template") {
                this.openTemplate();
            }

            // open `custom template` page
            if (message.id === "customTemplate") {
                this.openCustomTemplate();
            }

            return;
        });

    }

    async getHtmlForWebview(webview: vscode.Webview) {
        const filePath = path.join(this.extensionUri.fsPath, 'snippets', 'snippets3.html');
        let html = fs.readFileSync(filePath, 'utf8');

        return html;
    }

    async generateFile(filename: string, content: string) {
        if (vscode.workspace.workspaceFolders === undefined || vscode.workspace.workspaceFolders.length === 0) {
            vscode.window.showErrorMessage('Please open the workspace first.');
            return;
        }
        const workspaceFolder = vscode.workspace.workspaceFolders[0];

        // 写入新的 ipynb 文件
        const newFilePath = path.join(workspaceFolder.uri.fsPath + `/${filename}`);
        fs.mkdirSync(path.dirname(newFilePath), { recursive: true });
        fs.writeFileSync(newFilePath, content);

        vscode.window.showInformationMessage(`File ${filename} created in the workspace path.`);
    }

    async generateLocalIPYNB(filename: string, templatePath: string) {
        if (vscode.workspace.workspaceFolders === undefined || vscode.workspace.workspaceFolders.length === 0) {
            vscode.window.showErrorMessage('Please open the workspace first.');
            return;
        }
        const workspaceFolder = vscode.workspace.workspaceFolders[0];

        // load template
        fs.readFile(templatePath, 'utf-8', (err, template) => {
            if (err) {
                vscode.window.showErrorMessage(`load file ${templatePath} error,${err}`);
                return;
            }

            // write notebook in work directory
            const newFilePath = path.join(workspaceFolder.uri.fsPath + `/${filename}`);
            fs.mkdirSync(path.dirname(newFilePath), { recursive: true });
            fs.writeFileSync(newFilePath, template);

            vscode.window.showInformationMessage(`File ${filename} created in the workspace path.`);
        });
    }

    checkFileExist(filename: string): boolean {
        const workspaceFolder = vscode.workspace.workspaceFolders![0];
        const targetPath = path.join(workspaceFolder.uri.fsPath, filename);
        return fs.existsSync(targetPath);
    }

    openConcept() {
        if (conceptPanel) {
            conceptPanel.reveal(vscode.ViewColumn.One);
        } else {
            const conceptFilePath = path.join(this.extensionUri.fsPath, 'pages', 'concept.html');
            let conceptHtml = fs.readFileSync(conceptFilePath, 'utf8');
            conceptPanel = vscode.window.createWebviewPanel(
                'concept',
                'Matplotlib Concept',
                vscode.ViewColumn.One,
                {}
            );
            conceptPanel.webview.html = conceptHtml;

            conceptPanel.onDidDispose(() => {
                conceptPanel = undefined;
            });
        }
    }

    openTemplate() {
        if (templatePanel) {
            templatePanel.reveal(vscode.ViewColumn.One);
        } else {
            const filePath = path.join(this.extensionUri.fsPath, 'pages', 'template.html');
            let html = fs.readFileSync(filePath, 'utf8');
            templatePanel = vscode.window.createWebviewPanel(
                'template',
                'Notebook Template',
                vscode.ViewColumn.One,
                {
                    enableScripts: true
                }
            );
            templatePanel.webview.html = html;

            templatePanel.webview.onDidReceiveMessage(async message => {
                const fileName = await vscode.window.showInputBox({ prompt: 'Please enter the filename of the notebook file (without the suffix).' });
                if (!fileName) {
                    vscode.window.showErrorMessage('No filename entered.');
                    return;
                }

                const isFileExist = this.checkFileExist(fileName + '.ipynb');
                if (isFileExist) {
                    vscode.window.showWarningMessage(`The file ${fileName}.ipynb already exists. Please change the name or manually remove this file first.`);
                    return;
                }

                await this.generateFile(fileName + '.ipynb', message.ipynb);
            });

            templatePanel.onDidDispose(() => {
                templatePanel = undefined;
            });
        }
    }

    openCustomTemplate() {
        if (customTemplatePanel) {
            customTemplatePanel.reveal();
        } else {
            let customTemplateHtml: fs.PathOrFileDescriptor = vscode.workspace.getConfiguration().get('matplotlib-pilot.customTemplateHtml') as fs.PathOrFileDescriptor;

            if (customTemplateHtml === "") {
                vscode.window.showInformationMessage("Please first set the template web page path through the variable Custom Template HTML in the settings interface of VS Code. For the production method of the template web page, see the Overview column on the plugin homepage.");
                return;
            }

            fs.readFile(customTemplateHtml, 'utf8', (err, html) => {
                if (err) {
                    vscode.window.showInformationMessage(`load file ${customTemplateHtml} error，${err}`);
                    return;
                }

                customTemplatePanel = vscode.window.createWebviewPanel(
                    'CustomTemplate',
                    'Custom Template',
                    vscode.ViewColumn.One,
                    {
                        enableScripts: true
                    }
                );
                customTemplatePanel.webview.html = html;

                customTemplatePanel.webview.onDidReceiveMessage(async message => {
                    const filename = await vscode.window.showInputBox({ prompt: 'Please enter the filename of the notebook file (without the suffix).' });
                    if (!filename) {
                        vscode.window.showErrorMessage('No filename entered.');
                        return;
                    }

                    const isFileExist = this.checkFileExist(filename + '.ipynb');
                    if (isFileExist) {
                        vscode.window.showWarningMessage(`The file ${filename}.ipynb already exists. Please change the name or manually remove this file first.`);
                        return;
                    }
                    console.log(message.id);
                    console.log(message.ipynbpath);
                    await this.generateLocalIPYNB(filename + '.ipynb', message.ipynbpath);
                });

                customTemplatePanel.onDidDispose(() => {
                    customTemplatePanel = undefined;
                });
            });
        }
    }

}