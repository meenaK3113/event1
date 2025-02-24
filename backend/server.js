import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./Routes/userRoute.js";
import pool from "./config/db.js";
import express from 'express';
import bodyParser from 'body-parser'; 
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
// const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Verify PostgreSQL connection
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL!"))
  .catch((err) => console.error("❌ Database connection error:", err));

// Routes
app.use("/users", userRoutes);


app.post('/api/events', async (req, res) => {
  const eventDetails = req.body;
  const { data, error } = await supabase.from('event_details').insert([eventDetails]);

  if (error) {
      res.status(500).json({ error: error.message });
  } else {
      res.status(200).json({ data });
  }
});

app.get("/", (req, res) => res.send("🚀 API is running"));

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
