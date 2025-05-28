import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";
//connections and listeneres 
const PORT = process.env.PORT || 4000;
connectToDatabase()
    .then(() => {
    app.listen(PORT, () => console.log("Server is running and Database connected successfully"));
})
    .catch((err) => console.log(err));
//# sourceMappingURL=index.js.map