const { exec } = require('child_process');

// Function to get changes in all files
function getAllChanges() {
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
            const fileContentsPromises = changedFiles.map(file => getFileContent(file));

            Promise.all(fileContentsPromises)
                .then(contents => {
                    const changes = {};
                    changedFiles.forEach((file, index) => {
                        changes[file] = contents[index];
                    });
                    resolve(changes);
                })
                .catch(reject);
        });
    });
}

// Function to get content of a specific file
function getFileContent(filePath) {
    return new Promise((resolve, reject) => {
        exec(`git show HEAD:${filePath}`, (err, stdout, stderr) => {
            if (err || stderr) {
                reject(err || stderr);
                return;
            }
            resolve(stdout);
        });
    });
}

// Example usage
getAllChanges()
    .then(changes => {
        console.log('Changes in files:', changes);
        // Now you can process or send this information to Gemini LLM or use it further in your extension logic
    })
    .catch(error => {
        console.error('Error:', error);
    });
