const { exec } = require('child_process');
const { trackChangesAndCommit } = require('./gitChanges.js');
const vscode = require('vscode');

const writeTerminal = async () => {
    try {
        const workspaceFolder = vscode.workspace.rootPath;

        // Change directory to the workspace folder
        process.chdir(workspaceFolder);

        // Getting commit message before adding
        const changesOutput = await trackChangesAndCommit();

        // Git add .
        exec('git add .', async (errAdd, stdoutAdd, stderrAdd) => {
            console.log("executed the add");
            if (errAdd || stderrAdd) {
                console.error('Error executing git add command:', errAdd || stderrAdd);
                return;
            }

            // Git commit -m "<commit_message>"
            exec(`${changesOutput}`, async (errCommit, stdoutCommit, stderrCommit) => {
                if (errCommit || stderrCommit) {
                    console.log(changesOutput);
                    console.error('Error executing git commit command:', errCommit || stderrCommit);
                    return;
                }

                // Success message after commit
                console.log('Successfully committed changes:', stdoutCommit.trim());
            });
        });

        return changesOutput;
    } catch (error) {
        console.error('Error:', error);
    }
};

module.exports = {
    writeTerminal
};
