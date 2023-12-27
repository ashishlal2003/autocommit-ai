// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { run } = require('./geminiLLM.js');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "autocommit-ai" is now active!');
	let disposable = vscode.commands.registerCommand('autocommit-ai.helloWorld', async function () {
		try {
			const reply = await run();
			vscode.window.showInformationMessage(`Please check the console for the reply: ${reply}`);
		} catch (error) {
			console.log(error);
			vscode.window.showInformationMessage(`The extension says: ${error}`);
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
