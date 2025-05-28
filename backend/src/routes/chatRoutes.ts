import Router from "express";
import {
  getAllChats,
  getResponsebyPrompt,
  deleteChatById,
  deleteAllChatByUserId,
  openChatById,
} from "../controllers/chatController.js";

const chatRoutes = Router();

chatRoutes.get("/get-all-chats/:userId", getAllChats);
chatRoutes.post("/get-response-by-prompt/:userId", getResponsebyPrompt);
chatRoutes.delete("/delete-chat/:userId/:chatSessionId", deleteChatById);
chatRoutes.delete("/delete-all-chat/:userId", deleteAllChatByUserId);
chatRoutes.get("/open-chat/:userId/:chatSessionId", openChatById);

export default chatRoutes;
