import jwt from "jsonwebtoken";
export const createToken = (id, email, expiresIn) => {
    const payload = { id, email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
    return token;
};
// Authenticate JWT Token
export const checkToken = async (req, res, next) => {
    const authHead = req.headers["authorization"];
    const token = authHead.split(" ")[1];
    console.log(token);
    if (!token) {
        return res.status(401).send("JWT Token not found");
    }
    try {
        await jwt.verify(token, process.env.JWT_SECRET, (err, success) => {
            if (err) {
                console.error("JWT Verification Error:", err);
                return res.status(401).send("Invalid JWT Token");
            }
            else {
                next();
            }
        });
    }
    catch (err) {
        console.error("JWT Verification Error:", err);
        return res.status(401).send("Invalid JWT Token");
    }
};
//# sourceMappingURL=token-manager.js.map