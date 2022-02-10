"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionFunctions = void 0;
const mysql_1 = __importDefault(require("mysql"));
/** An object to create a connection to database. */
const pool = mysql_1.default.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.host,
    database: process.env.database,
    connectionLimit: 10,
});
exports.connectionFunctions = {
    close: (close) => {
        function funkkari(resolve, reject) {
            pool.end((err) => {
                if (err) {
                    reject(err);
                    close();
                }
                else {
                    resolve("Query completed, closing connection.");
                }
            });
        }
        return new Promise(funkkari);
    },
    findAll: () => {
        function funkkari(resolve, reject) {
            pool.query(`SELECT * FROM users`, (err, allLocations) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(allLocations);
                }
            });
        }
        return new Promise(funkkari);
    },
    findById: (id) => {
        function funkkari(resolve, reject) {
            pool.query(`SELECT * FROM users WHERE id = ?`, [id], (err, foundLocation) => {
                if (err) {
                    reject(err);
                }
                else if (foundLocation.length < 1) {
                    resolve(null);
                }
                else {
                    resolve(foundLocation);
                }
            });
        }
        return new Promise(funkkari);
    },
    deleteById: (id) => {
        function funkkari(resolve, reject) {
            pool.query(`DELETE FROM users WHERE id = ?`, [id], (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(id);
                }
            });
        }
        return new Promise(funkkari);
    },
    save: (fName, lName, age) => {
        function funkkari(resolve, reject) {
            pool.query(`INSERT INTO users (fName, lName, age) VALUES (?, ?, ?)`, [fName, lName, age], (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve("Entry succesfully added.");
                }
            });
        }
        return new Promise(funkkari);
    },
    editEntry: (id, fName, lName, age) => {
        function funkkari(resolve, reject) {
            pool.query(`UPDATE users SET fName = ?, lName = ?, age = ? WHERE id = ?;`, [fName, lName, age, id], (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve("Entry succesfully edited.");
                }
            });
        }
        return new Promise(funkkari);
    },
};
//# sourceMappingURL=database.js.map