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
// app.use(cors());
app.use(cors({ origin: "http://localhost:5173" })); 
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


//Feedback_details
app.post('/api/feedback', async (req, res) => {
  const { feedback_id,attendee_id, event_id, feedback_text, rating, performance } = req.body;

  // Insert into Supabase table 'feedback_details'
  const { data, error } = await supabase.from('feedback_details').insert([
    {
      feedback_id,
      attendee_id,
      event_id,
      feedback_text,
      rating,
      performance,
      feedback_created_at: new Date().toISOString(), // Store current timestamp
    }
  ]);

  if (error) {
    res.status(500).json({ error: error.message });
  } else {
    res.status(200).json({ message: "Feedback submitted successfully!", data });
  }
});



app.get("/", (req, res) => res.send("🚀 API is running"));

app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
