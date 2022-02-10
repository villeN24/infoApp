import express from "express";
import cors from "cors";
import path from "path";
import "dotenv/config";

const routeUsers = "users";
import router, * as users from "./routes/userRoute";
import { connectionFunctions } from "./database/database";

const port = 8080;
const app = express();

app.use(cors());
app.use(express.json());

/**
 * The server of the project.
 */
app.use(`/${routeUsers}`, router);
app.use(express.static(path.join(__dirname, "frontend/build")));

const server = app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

const shutdown = () => {
  console.log("Closing server.");
  server.close(() => {
    console.log("Server closed.");
    connectionFunctions.close(() => {
      process.exit(0);
    });
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
