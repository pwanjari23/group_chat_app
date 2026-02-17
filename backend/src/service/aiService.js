const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-pro",
});

exports.generatePredictiveText = async (context, partialMessage, tone = "normal") => {
  const prompt = `
You are an AI chat assistant.

Conversation context:
${context}

User is typing:
"${partialMessage}"

Suggest 3 short possible next phrases.
Tone: ${tone}
Return only 3 short suggestions separated by commas.
Keep them concise and appropriate.
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return text.split(",").map(s => s.trim()).slice(0, 3);
};


exports.generateSmartReplies = async (context, incomingMessage, tone = "normal") => {
  const prompt = `
You are an AI assistant.

Conversation context:
${context}

Incoming message:
"${incomingMessage}"

Generate 3 short smart replies.
Tone: ${tone}
Each reply under 12 words.
Return each reply on new line.
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  return text
    .split("\n")
    .map(r => r.trim())
    .filter(Boolean)
    .slice(0, 3);
};
