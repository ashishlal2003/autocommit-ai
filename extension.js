const vscode = require('vscode');
const { writeTerminal } = require('./writeTerminal.js');

function activate(context) {
    console.log('Congratulations, your extension "autocommit-ai" is now active!');
    
    let disposable = vscode.commands.registerCommand('autocommit-ai.helloWorld', async function () {
        try {
            console.log('Current directory:', process.cwd()); // Log the current directory
            const reply = await writeTerminal();
            vscode.window.showInformationMessage(`The commit message is: ${reply}`);
        } catch (error) {
            console.error(error);
            vscode.window.showInformationMessage(`The extension says: ${error}`);
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
