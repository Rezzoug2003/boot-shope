import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Lamadev123",
  database: "test",
});
// ALTER USER 'root'@'localhost'IDENTIFIED WITH mysql_native_password BY 'Lamadev123';
app.get("/", (req, res) => {
  res.json("hello in the world ");
});
app.get("/books", (req, res) => {
  const q = "SELECT * FROM test.books;";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
app.post("/books", (req, res) => {
  const q =
    "INSERT INTO books (`title`, `desc`,`price`, `cover`) VALUES (?, ?, ?,?)";
  //   const VALUES = [
  //     "title from backend",
  //     "desc from backend",
  //     "cover dic from backend",
  //   ];
  const VALUES = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, VALUES, (err, data) => {
    if (err) return res.json(err);
    return res.json("pass sending data");
  });
});
app.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    res.json("Deleted book");
  });
});
app.put("/books/:id", (req, res) => {
  const id = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];
  db.query(q, [...values, id], (err, data) => {
    if (err) return res.json(err);
    res.json("Updated book");
  });
});




app.listen(8800, () => {
  console.log("connected to backend server!1");
});
