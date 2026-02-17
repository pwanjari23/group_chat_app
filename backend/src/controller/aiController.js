const aiService = require("../service/aiService");

exports.predictText = async (req, res) => {
  try {
    const { context, partialMessage, tone } = req.body;

    if (!partialMessage || partialMessage.length < 3) {
      return res.json({ suggestions: [] });
    }

    const suggestions = await aiService.generatePredictiveText(
      context,
      partialMessage,
      tone
    );

    res.json({ suggestions });

  } catch (error) {
    console.error("AI Predict Error:", error);
    res.status(500).json({ error: "Prediction failed" });
  }
};


exports.smartReplies = async (req, res) => {
  try {
    const { context, incomingMessage, tone } = req.body;

    const replies = await aiService.generateSmartReplies(
      context,
      incomingMessage,
      tone
    );

    res.json({ suggestions: replies });

  } catch (error) {
    console.error("AI Smart Reply Error:", error);
    res.status(500).json({ error: "Smart reply failed" });
  }
};
