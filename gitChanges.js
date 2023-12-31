const { run } = require('./geminiLLM.js');
const { getUnstagedChanges } = require('./gitChangesTest.js');

const trackChangesAndCommit = async () => {
    try {
        const changes = await getUnstagedChanges();
        const changesText = JSON.stringify(changes);
        const prompt = `Detected changes in the codebase:\n${changesText}\nPlease generate a detailed descriptive commit message summarizing these modifications. The format should be: git commit -m <your_message>.`;
        const result = await run(prompt);
        return result;
    } catch (error) {
        console.error('Error:', error);
    }
};

module.exports = {
    trackChangesAndCommit
};