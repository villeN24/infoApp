import mysql from "mysql";

/** An object to create a connection to database. */
const pool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DB,
});

export const connectionFunctions = {
  connect: () => {
    function funkkari(resolve, reject) {
      console.log("connecting");
      pool.connect((err) => {
        if (err) {
          reject(err);
        } else {
          resolve("Connected.");
        }
      });
    }
    return new Promise(funkkari);
  },
  close: () => {
    function funkkari(resolve, reject) {
      pool.end((err) => {
        if (err) {
          reject(err);
        } else {
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
        } else {
          resolve(allLocations);
        }
      });
    }
    return new Promise(funkkari);
  },
  findById: (id: number) => {
    function funkkari(resolve, reject) {
      pool.query(
        `SELECT * FROM users WHERE id = ?`,
        [id],
        (err, foundLocation) => {
          if (err) {
            reject(err);
          } else if (foundLocation.length < 1) {
            resolve(null);
          } else {
            resolve(foundLocation);
          }
        }
      );
    }
    return new Promise(funkkari);
  },
  deleteById: (id: number) => {
    function funkkari(resolve, reject) {
      pool.query(`DELETE FROM users WHERE id = ?`, [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(id);
        }
      });
    }
    return new Promise(funkkari);
  },
  save: (fName: string, lName: string, age: number) => {
    function funkkari(resolve, reject) {
      pool.query(
        `INSERT INTO users (fName, lName, age) Values(?, ?, ?)`,
        [fName, lName, age],
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve("Entry succesfully added.");
          }
        }
      );
    }
    return new Promise(funkkari);
  },
};
