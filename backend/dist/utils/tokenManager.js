import jwt from "jsonwebtoken";
export const generateToken = (id, email) => {
    const payLoad = { id, email };
    const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    console.log(token);
    return token;
};
export const verifyToken = async (req, res, next) => {
    try {
        const header = req.headers["authorization"];
        console.log(`Header ${header}`);
        const token = header.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        return new Promise((resolve, reject) => {
            return jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
                if (err) {
                    reject(err.message);
                    return res.status(401).json({ message: "Unauthorized" });
                }
                else {
                    resolve();
                    res.locals.jwtData = success;
                    return next();
                }
            });
        });
    }
    catch (e) {
        console.log(e);
        return res.status(401).json({ message: "Unauthorized" });
    }
};
//# sourceMappingURL=tokenManager.js.map