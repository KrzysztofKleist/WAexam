"use strict";

const sqlite = require("sqlite3");
const db = new sqlite.Database("courses.db", (err) => {
  if (err) throw err;
});
const crypto = require("crypto");

exports.getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.get(sql, [email], (err, row) => {
      if (err) {
        reject(err);
      } else if (row === undefined) {
        resolve(false);
      } else {
        const user = { id: row.id, email: row.email, name: row.name };

        crypto.scrypt(password, row.salt, 32, function (err, hashedPassword) {
          if (err) reject(err);
          if (
            !crypto.timingSafeEqual(
              Buffer.from(row.password, "hex"),
              hashedPassword
            )
          )
            resolve(false);
          else resolve(user);
        });
      }
    });
  });
};

// exports.getUserById = (id) => {
//   return new Promise((resolve, reject) => {
//     const sql = "SELECT * FROM user WHERE id = ?";
//     db.get(sql, [id], (err, row) => {
//       if (err) {
//         reject(err);
//       } else if (row === undefined) {
//         resolve({ error: "User not found!" });
//       } else {
//         const user = { id: row.id, email: row.email };
//         resolve(user);
//       }
//     });
//   });
// };
