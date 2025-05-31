const cors = require('cors');
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// User Registration
app.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  
  try {
    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.json("Already registered");
    }

    // Create new user
    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password, name }])
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error) throw error;

    if (user) {
      if (user.password === password) {
        res.json("Success");
      } else {
        res.json("Wrong password");
      }
    } else {
      res.json("No records found!");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user profile
app.get('/profile/:userId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', req.params.userId)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
app.put('/profile/:userId', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .update(req.body)
      .eq('id', req.params.userId)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});