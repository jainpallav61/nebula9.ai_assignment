// controllers/aiController.js
const OpenAI = require("openai");
const dotenv = require("dotenv");
const Groq = require("groq-sdk");

dotenv.config();

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

// exports.generateContent = async (req, res) => {
//     try {
//         const { keywords } = req.body;
//         console.log(`Received keywords: ${keywords}`);

//         if (!Array.isArray(keywords) || keywords.length === 0) {
//             return res.status(400).json({ error: 'Keywords must be a non-empty array' });
//         }

//         const prompt = `Generate a blog post based on the following keywords: ${keywords.join(", ")}`;

//         const completion = await openai.completions.create({
//             model: "gpt-3.5-turbo",
//             prompt: prompt,
//             max_tokens: 500,
//             temperature: 0.7,
//         });

//         const generatedContent = completion.choices[0].text.trim();
//         res.json({ content: generatedContent });
//     } catch (error) {
//         console.log("Error generating content:", error.response ? error.response.data : error.message);
//         res.status(400).json({ error: error.response ? error.response.data : error.message });
//     }
// };

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

    // Start the chat completion request to Groq
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

    // Collect the response as it streams
    for await (const chunk of chatCompletion) {
      generatedContent += chunk.choices[0]?.delta?.content || "";
    }

    // Send the collected content as the response
    res.json({ content: generatedContent.trim() });
  } catch (error) {
    console.log("Error generating content:", error.message);
    res.status(400).json({ error: error.message });
  }
};
