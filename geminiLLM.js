const { GoogleGenerativeAI } = require("@google/generative-ai");
// require('dotenv').config();

// // Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyD3I20VtW3E9Bpd56GCOO8WS0Z4MMf-JWE");
async function run() {
  // For text-only input, use the gemini-pro model
  
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = "Who is India's prime minister?"

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}


module.exports = {
    run
};