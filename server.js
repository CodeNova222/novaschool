require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',  // Change to your database host
    user: 'sql12763887',       // Your MySQL username
    password: 'M3UJrVhlij',       // Your MySQL password
    database: 'sql12763887'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

function generateHashId() {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}

app.post('/register', async (req, res) => {
  const { email, password, gender, grade } = req.body.datas;

  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }

  try {
    console.log('Hashing password...'); // Debugging
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully:', hashedPassword); // Debugging

    function generateHashId() {
      return Math.floor(100000000 + Math.random() * 900000000).toString();
    }

    function insertUser(hashId) {
      const queryCheck = 'SELECT COUNT(*) AS count FROM users WHERE hash_id = ?';
      db.query(queryCheck, [hashId], (err, results) => {
        if (err) {
          console.error('Database error:', err); // Debugging
          return res.status(500).json({ error: 'Database error' });
        }

        if (results[0].count > 0) {
          console.log(`Hash ID ${hashId} exists, generating new one...`); // Debugging
          insertUser(generateHashId());
        } else {
          const queryInsert = 'INSERT INTO users (email, password, gender, grade, hash_id) VALUES (?, ?, ?, ?, ?)';
          db.query(queryInsert, [email, hashedPassword, gender, grade, hashId], (err, result) => {
            if (err) {
              console.error('Error registering user:', err); // Debugging
              return res.status(500).json({ error: 'Error registering user' });
            }
            res.json({ message: 'User registered successfully' });
          });
        }
      });
    }

    insertUser(generateHashId());
  } catch (error) {
    console.error('Hashing error:', error); // Debugging
    res.status(500).json({ error: 'Error hashing password' });
  }
});



app.post("/login", (req, res) => {
  const { username_email, password } = req.body.datas; 

  if (!username_email || !password) {
    return res.status(400).json({ error: "Email/Username and Password are required" });
  }

  console.log("Received Login Request:", req.body);

  const query = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(query, [username_email, username_email], async (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (results.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = results[0];
    console.log("Stored Password (hashed):", user.password); 

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(`Comparing "${password}" with stored password:`, isMatch); 

      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      res.json({
        message: "Login successful",
        user: { id: user.id, username: user.username, email: user.email },
      });
    } catch (error) {
      console.error("Bcrypt Error:", error);
      res.status(500).json({ error: "Password comparison failed" });
    }
  });
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
