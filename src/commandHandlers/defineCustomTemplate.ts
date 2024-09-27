import * as vscode from 'vscode';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as cheerio from 'cheerio';

const cssString = `
h2 {
    text-align: center; /* 文本居中 */
    width: 100vw; /* 设置宽度为视口宽度的100%，使得h2元素全宽 */
    margin: 0; /* 清除默认的外边距，可根据需要调整上下的外边距 */
    background-color: var(--vscode-button-background);
    color: var(--vscode-button-foreground);
}
img {
    border: 2px solid var(--vscode-button-background); /* 设置边框宽度、样式和颜色 */
}
.container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.box {
    width: 240px;
    height: 240px;
    margin: 10px;
    text-align: center;
}
button {
    border: none;
    margin-top: 2px;
    padding: var(--input-padding-vertical) var(--input-padding-horizontal);
    width: 80%;
    text-align: center;
    outline: 1px solid transparent;
    outline-offset: 2px !important;
    color: var(--vscode-button-foreground);
    background: var(--vscode-button-background);
    font-size: 16px;
}

button:hover {
    cursor: pointer;
    background: var(--vscode-button-hoverBackground);
}

button:focus {
    outline-color: var(--vscode-focusBorder);
}

button.secondary {
    color: var(--vscode-button-secondaryForeground);
    background: var(--vscode-button-secondaryBackground);
}

button.secondary:hover {
    background: var(--vscode-button-secondaryHoverBackground);
}

.box img {
    width: 100%;
    height: 80%;
}`;

const jsString = `
const vscode = acquireVsCodeApi();

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        vscode.postMessage({
            "id": this.id,
            "ipynbpath": this.dataset.ipynbpath
        });
    });
});`;

const defaultCover_base64 = `data:image/jpeg;base64,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
`;


export async function defineCustomTemplate(context: vscode.ExtensionContext) {
    const options: vscode.OpenDialogOptions = {
        canSelectFiles: true,
        canSelectFolders: false,
        canSelectMany: false,
        openLabel: 'Open File',
        filters: {
            'Text files': ['html'],
            'All files': ['*']
        }
    };

    const selectedUris = await vscode.window.showOpenDialog(options);

    if (selectedUris && selectedUris.length > 0) {
        const selectedUri = selectedUris[0];
        let htmlContent = await fs.readFile(selectedUri.fsPath, 'utf-8');

        const $ = cheerio.load(htmlContent);
        const imgElements = $('img');

        for (const element of imgElements) {
            const src = $(element).attr('src');
            if (src) {
                const imagePath = path.join(path.dirname(selectedUri.fsPath), src);
                try {
                    const imageData = await fs.readFile(imagePath);
                    const base64Data = Buffer.from(imageData).toString('base64');
                    $(element).attr('src', `data:image/png;base64,${base64Data}`);
                } catch (error) {
                    $(element).attr('src', defaultCover_base64);
                    vscode.window.showWarningMessage(`读取封面文件 ${imagePath} 失败: ${error}，使用默认模板封面`);
                }
            }
        }

        // 嵌入 CSS 和 JavaScript
        $('head').append(`<style>${cssString}</style>`);
        $('body').append(`<script>${jsString}</script>`);

        const newFilePath = path.join(path.dirname(selectedUri.fsPath), 'customTemplate.html');
        await fs.writeFile(newFilePath, $.html());
        vscode.window.showInformationMessage(`自定义模板文件写出到 ${newFilePath}`);
    }
}