"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
require("dotenv/config");
const routeUsers = "users";
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const database_1 = require("./database/database");
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
/**
 * The server of the project.
 */
app.use(`/${routeUsers}`, userRoute_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "frontend/build")));
const server = app.listen(port, () => {
    console.log(`Listening at ${server.address()}`);
    database_1.connectionFunctions.connect();
});
const shutdown = () => {
    console.log("Closing server.");
    server.close(() => {
        console.log("Server closed.");
        database_1.connectionFunctions.close(() => {
            process.exit(0);
        });
    });
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
//# sourceMappingURL=app.js.map