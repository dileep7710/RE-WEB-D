const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: '12345'
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password()
  ];
};

// Home route

app.get("/", (req, res) => {
  let q = `SELECT count(*) FROM user`;
  try {
    connection.query(q, (err, result) => {
    if(err) throw err;
    let count = result[0]["count(*)"];
    res.render("home.ejs",{ count });
    });
} catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});

// Show Route

app.get("/user", (req, res) => {
  let q = `SELECT * FROM user`;
  try {
    connection.query(q, (err, users) => {
    if(err) throw err;
    // console.log(result);
    res.render("users.ejs", {users});
    });
} catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});

// Edit Route
app.get("/user/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id='${id}'`;

  try {
    connection.query(q, (err, result) => {
    if(err) throw err;
    res.render("edit.ejs");
    });
} catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});

app.listen("8080", () => {
  console.log("server is listening to port 8080");
});

