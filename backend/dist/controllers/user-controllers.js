import { User } from "../models/User.js";
export const getAllUsers = async (res) => {
    try {
        const users = await User.find();
        if (!users) {
            res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(users);
    }
    catch (e) {
        console.log(e.message);
    }
};
//# sourceMappingURL=user-controllers.js.map