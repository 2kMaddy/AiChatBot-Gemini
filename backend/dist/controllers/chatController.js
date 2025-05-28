import User from "../models/User.js";
import { GoogleGenAI } from "@google/genai";
import { createNewChatSession, updateChat, } from "../utils/createAndUpdateChat.js";
export const getAllChats = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const chatsList = user.chatsList;
        return res.status(200).json({ chatsList });
    }
    catch (e) {
        console.log(e.message);
        res.status(500).json({ message: "Server error" });
    }
};
export const getResponsebyPrompt = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { prompt, activeChatSessionId } = req.body;
        if (!prompt) {
            res.status(400).json({ message: "Please provide query" });
        }
        const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
        });
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt,
        });
        let sessionId;
        if (activeChatSessionId === "newChat") {
            sessionId = await createNewChatSession(prompt, response.text, userId.toString());
        }
        else {
            await updateChat(prompt, response.text, userId.toString(), activeChatSessionId.toString());
            sessionId = activeChatSessionId;
        }
        res.status(200).json({ message: response.text, sessionId });
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Server error" });
    }
};
export const deleteChatById = async (req, res, next) => {
    try {
        const { chatSessionId, userId } = req.params;
        if (!chatSessionId) {
            res.status(400).json({ message: "Please provide chat session ID" });
        }
        const updatedUser = await User.findByIdAndUpdate(userId, {
            $pull: {
                chatsList: { sessionId: chatSessionId },
            },
        }, { new: true });
        if (updatedUser) {
            res.status(200).json({ message: "Chat deleted successfully" });
        }
        else {
            res.status(404).json({ message: "Chat not found" });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Server Error" });
    }
};
export const deleteAllChatByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(401).json({
                message: "Authentication failed: User ID not found in token.",
            });
        }
        const updatedUser = await User.findByIdAndUpdate(userId, {
            $set: { chatsList: [] },
        }, { new: true });
        if (updatedUser) {
            res.status(200).json({
                message: "All chats deleted successfully for the user.",
                userId: updatedUser._id,
            });
        }
        else {
            res.status(404).json({ message: "User not found with the provided ID." });
        }
    }
    catch (error) {
        console.error("Error deleting all chats:", error);
        res.status(500).json({
            message: "An unexpected server error occurred.",
            error: error.message,
        });
    }
};
export const openChatById = async (req, res, next) => {
    try {
        const { chatSessionId, userId } = req.params;
        if (!chatSessionId) {
            res.status(400).json({ message: "Please provide chat session ID" });
        }
        const user = await User.findById(userId);
        const { chatsList } = user;
        const chat = chatsList.find((session) => session.sessionId === chatSessionId);
        if (chat) {
            res.status(200).json({ message: "Chat found", chat });
        }
        else {
            res.status(404).json({ message: "Chat not found" });
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ message: "Server error" });
    }
};
//# sourceMappingURL=chatController.js.map