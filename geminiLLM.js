const { GoogleGenerativeAI } = require("@google/generative-ai");
// require('dotenv').config();

const genAI = new GoogleGenerativeAI("AIzaSyD3I20VtW3E9Bpd56GCOO8WS0Z4MMf-JWE");
async function run(prompt) {
  
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}


module.exports = {
    run
};