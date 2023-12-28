const { exec } = require('child_process');
const { trackChangesAndCommit } = require('./gitChanges.js');

const writeTerminal = async () => {
    try {
        // Git add .
        exec('git add .', async (err, stdout, stderr) => {
            if (err || stderr) {
                console.error('Error executing git add command:', err || stderr);
                return;
            }

            // Get output from trackChangesAndCommit()
            try {
                const changesOutput = await trackChangesAndCommit();

                // Log the output from trackChangesAndCommit()
                console.log('Output from trackChangesAndCommit():', changesOutput);
            } catch (error) {
                console.error('Error in trackChangesAndCommit:', error);
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
};

writeTerminal();//change