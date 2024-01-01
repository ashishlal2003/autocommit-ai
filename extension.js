const vscode = require('vscode');
const { writeTerminal } = require('./writeTerminal.js');

function activate(context) {
    console.log('Congratulations, your extension "autocommit-ai" is now active!');

    const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
    statusBarItem.text = 'AutoCommit AI';
    statusBarItem.tooltip = 'Click to perform AutoCommit AI action';
    statusBarItem.command = 'autocommit-ai.autocommitai';
    statusBarItem.show();

    let disposable = vscode.commands.registerCommand('autocommit-ai.autocommitai', async function () {
        try {
            const progressOptions = { location: vscode.ProgressLocation.Notification, title: 'AutoCommit in progress...' };
            await vscode.window.withProgress(progressOptions, async () => {
                const reply = await writeTerminal();
                vscode.window.showInformationMessage(`The commit message is: ${reply}`);
            });
        } catch (error) {
            console.error(error);
            vscode.window.showInformationMessage(`The extension says: ${error}`);
        }
    });

    context.subscriptions.push(disposable, statusBarItem);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
