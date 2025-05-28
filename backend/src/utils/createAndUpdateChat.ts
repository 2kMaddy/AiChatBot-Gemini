import User from "../models/User.js";
import { randomUUID } from "crypto";

export const createNewChatSession = async (
  prompt: string,
  response: string,
  userId: string
) => {
  try {
    const sessionId = randomUUID();
    const chat = [
      {
        sender: "user",
        message: prompt,
      },
      {
        sender: "ai",
        message: response,
      },
    ];

    const newObject = {
      sessionId,
      lastMessage: prompt,
      chats: chat,
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          chatsList: newObject,
        },
      },
      {
        new: true,
      }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }
    return sessionId.toString();
  } catch (e) {
    console.log(e.message);
  }
};

export const updateChat = async (
  prompt: string,
  response: string,
  userId: string,
  activeChatSessionId: string
) => {
  try {
    const newChat = {
      sender: "user",
      message: prompt,
    };

    const newChatResponse = {
      sender: "ai",
      message: response,
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          "chatsList.$[session].chats": { $each: [newChat, newChatResponse] },
        },
      },
      {
        arrayFilters: [{ "session.sessionId": activeChatSessionId }],
        new: true,
      }
    );
    return updatedUser;
  } catch (e) {
    console.log(e);
  }
};
