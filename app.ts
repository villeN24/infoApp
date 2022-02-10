import express from "express";
import cors from "cors";
import "dotenv/config";

const routeUsers = "users";
import router, * as users from "./routes/userRoute";

const port = 8080;
const app = express();

app.use(cors());
app.use(express.json());

/**
 * The server of the project.
 */
app.use(`/${routeUsers}`, router);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
