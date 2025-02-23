const express = require("express");
const pg = require("pg");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Connection
const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Check if the database is connected
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Database connection error:", err.stack);
  } else {
    console.log("✅ Connected to PostgreSQL database!");
    release(); // Release the client back to the pool
  }
});


// Route to check if server is running
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

// Route to fetch all users from users_details table
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM user_details");
    res.json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});




// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
