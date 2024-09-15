const OpenAI = require("openai");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");

dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

exports.generateContent = async (req, res) => {
  try {
    const { keywords } = req.body;
    console.log(`Received keywords: ${keywords}`);

    if (!Array.isArray(keywords) || keywords.length === 0) {
      return res
        .status(400)
        .json({ error: "Keywords must be a non-empty array" });
    }

    const prompt = `Generate a blog post based on the following keywords: ${keywords.join(
      ", "
    )}`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: true,
      stop: null,
    });

    let generatedContent = "";

    for await (const chunk of chatCompletion) {
      generatedContent += chunk.choices[0]?.delta?.content || "";
    }

    res.json({ content: generatedContent.trim() });
  } catch (error) {
    console.log("Error generating content:", error.message);
    res.status(400).json({ error: error.message });
  }
};
