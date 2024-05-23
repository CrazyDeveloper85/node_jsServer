const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3001;

// CORS middleware ekleyelim
app.use(cors());

// Veritabanı bağlantısı
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pagination'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database.');
});

// Sayfalama rotası
app.get('/users', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;  // Limit 3 olarak ayarlanmış
  const offset = (page - 1) * limit;

  const sql = `SELECT name, lastname FROM create_pagination LIMIT ${limit} OFFSET ${offset}`;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
