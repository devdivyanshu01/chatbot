const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to DB
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'div01', // change if needed
  database: 'chatbot_app',
});

db.connect((err) => {
  if (err) {
    console.error('DB Error:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Test API
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Insert user
app.post('/users', (req, res) => {
  const { name, email, phone_number } = req.body;
  db.query(
    'INSERT INTO users (name, email, phone_number) VALUES (?, ?, ?)',
    [name, email, phone_number],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error saving user');
      }
      res.send({ id: result.insertId });
    }
  );
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
