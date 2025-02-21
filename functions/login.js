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
  const { username_email, password } = JSON.parse(event.body).datas;

  if (!username_email || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Email/Username and Password are required" })
    };
  }

  const query = "SELECT * FROM users WHERE email = ? OR username = ?";
  db.query(query, [username_email, username_email], async (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Database query failed" })
      };
    }

    if (results.length === 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "User not found" })
      };
    }

    const user = results[0];
    console.log("Stored Password (hashed):", user.password);

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(`Comparing "${password}" with stored password:`, isMatch);

      if (!isMatch) {
        return {
          statusCode: 401,
          body: JSON.stringify({ error: "Invalid credentials" })
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Login successful",
          user: { id: user.id, username: user.username, email: user.email }
        })
      };
    } catch (error) {
      console.error("Bcrypt Error:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Password comparison failed" })
      };
    }
  });
};
