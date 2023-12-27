const { run } = require('./geminiLLM.js');

const trackChangesAndCommit = async() => {
    try {
        // const changesMade = await userChanges();
        const result = await run();
        // if(result){
        //     await commitChanges(result);
        // }
        return result;

    } catch (error) {
        console.log("Error: ", error);
    }
};

const userChanges = async() => {
};

const commitChanges = async(result) => {
};

module.exports = {
    trackChangesAndCommit
};