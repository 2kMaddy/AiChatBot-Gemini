import mongoose from "mongoose";
const chatsSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});
const chatsListSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastMessage: String,
    sessionTime: {
        type: Date,
        default: Date.now,
    },
    chats: [chatsSchema],
});
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    chatsList: [chatsListSchema],
});
export default mongoose.model("User", userSchema);
//# sourceMappingURL=User.js.map