const { exec } = require('child_process');

// Function to get unstaged changes in all files
function getUnstagedChanges() {
    console.log('Current directory:', process.cwd());
    return new Promise((resolve, reject) => {
        exec('git diff --name-only', (err, stdout, stderr) => {
            if (err) {
                reject(err);
                return;
            }
            if (stderr) {
                reject(stderr);
                return;
            }

            const changedFiles = stdout.split('\n').filter(Boolean);
            const fileContentsPromises = changedFiles.map(file => getUnstagedFileDiff(file));

            Promise.all(fileContentsPromises)
                .then(diffs => {
                    const changes = {};
                    changedFiles.forEach((file, index) => {
                        changes[file] = diffs[index];
                    });
                    resolve(changes);
                })
                .catch(reject);
        });
    });
}

// Function to get diff of a specific unstaged file
function getUnstagedFileDiff(filePath) {
    return new Promise((resolve, reject) => {
        exec(`git diff HEAD:${filePath} ${filePath}`, (err, stdout, stderr) => {
            if (err || stderr) {
                reject(err || stderr);
                return;
            }
            resolve(stdout);
        });
    });
}

module.exports = {
    getUnstagedChanges
};
