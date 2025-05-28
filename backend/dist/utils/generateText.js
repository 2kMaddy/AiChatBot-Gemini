import https from "https";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const generateTextDirect = async (prompt) => {
    console.log(genAI);
    const apiKey = process.env.GEMINI_API_KEY;
    const hostname = "generativelanguage.googleapis.com";
    const path = `/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    const requestBody = JSON.stringify({
        contents: [
            {
                role: "user",
                parts: [{ text: prompt }],
            },
        ],
    });
    const options = {
        hostname: hostname,
        path: path,
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": Buffer.byteLength(requestBody),
        },
    };
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            let data = "";
            res.on("data", (chunk) => {
                data += chunk;
            });
            res.on("end", () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        const parsedData = JSON.parse(data);
                        if (parsedData.candidates &&
                            parsedData.candidates.length > 0 &&
                            parsedData.candidates[0].content &&
                            parsedData.candidates[0].content.parts &&
                            parsedData.candidates[0].content.parts.length > 0 &&
                            parsedData.candidates[0].content.parts[0].text) {
                            resolve(parsedData.candidates[0].content.parts[0].text);
                        }
                        else {
                            reject(new Error("Gemini response did not contain expected text content."));
                        }
                    }
                    catch (e) {
                        reject(new Error(`Failed to parse JSON response from Gemini: ${e.message}`));
                    }
                }
                else {
                    reject(new Error(`Gemini API Error: Status ${res.statusCode}, Message: ${data}`));
                }
            });
        });
        req.on("error", (e) => {
            reject(new Error(`Network or Request Error: ${e.message}`));
        });
        req.write(requestBody);
        req.end();
    });
};
//# sourceMappingURL=generateText.js.map