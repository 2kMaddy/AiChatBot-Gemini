import { GoogleGenerativeAI } from "@google/generative-ai";
// import { Chat } from "../models/User.js";
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
export const sendMessage = async (req, res, next) => {
    try {
        const { userId, query } = req.body;
        if (!query) {
            res.statu(401).json({ error: "Please provide query" });
        }
        const prompt = query;
        const model = genAI.getModel({ model: "gemini-pro" });
        const result = await model.generateContent({ prompt });
        const response = await result.response;
        const generatedText = response.text();
        if (generatedText) {
            res.json({ response: generatedText });
        }
        else {
            res.status(500).json({ error: "No response received from Gemini." });
        }
    }
    catch (e) {
        console.log(e.message);
    }
};
//# sourceMappingURL=chat-controllers.js.map