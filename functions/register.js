const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const db = mysql.createConnection({
  host: 'sql12.freesqldatabase.com',
  user: 'sql12763887',
  password: 'M3UJrVhlij',
  database: 'sql12763887'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

exports.handler = async function(event, context) {
  const { email, password, gender, grade } = JSON.parse(event.body).datas;

  if (!password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Password is required' })
    };
  }

  try {
    console.log('Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully:', hashedPassword);

    function generateHashId() {
      return Math.floor(100000000 + Math.random() * 900000000).toString();
    }

    function insertUser(hashId) {
      const queryCheck = 'SELECT COUNT(*) AS count FROM users WHERE hash_id = ?';
      db.query(queryCheck, [hashId], (err, results) => {
        if (err) {
          console.error('Database error:', err);
          return { statusCode: 500, body: JSON.stringify({ error: 'Database error' }) };
        }

        if (results[0].count > 0) {
          console.log(`Hash ID ${hashId} exists, generating new one...`);
          insertUser(generateHashId());
        } else {
          const queryInsert = 'INSERT INTO users (email, password, gender, grade, hash_id) VALUES (?, ?, ?, ?, ?)';
          db.query(queryInsert, [email, hashedPassword, gender, grade, hashId], (err, result) => {
            if (err) {
              console.error('Error registering user:', err);
              return { statusCode: 500, body: JSON.stringify({ error: 'Error registering user' }) };
            }
            return { statusCode: 200, body: JSON.stringify({ message: 'User registered successfully' }) };
          });
        }
      });
    }

    insertUser(generateHashId());
  } catch (error) {
    console.error('Hashing error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error hashing password' })
    };
  }
};
