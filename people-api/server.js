const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an Express app
const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection URI for your "sports" database
const mongoURI = 'mongodb://localhost:27017/sports';  // Replace with your DB URI

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Define a Schema for the "team" collection
const teamSchema = new mongoose.Schema({
  name: String,
  players: Number,
  coach: String,
  city: String
});

// Create a Model from the schema, using the "team" collection explicitly
const Team = mongoose.model('Team', teamSchema, 'team');  // 'team' is the collection name

// Routes

// GET: Fetch all teams from the "team" collection
app.get('/teams', async (req, res) => {
  try {
    const teams = await Team.find();  // Fetch data from the "team" collection
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams' });
  }
});

// POST: Create a new team in the "team" collection
app.post('/teams', async (req, res) => {
  const { name, players, coach, city } = req.body;

  try {
    const newTeam = new Team({ name, players, coach, city });
    await newTeam.save();
    res.status(201).json(newTeam);
  } catch (error) {
    res.status(500).json({ message: 'Error creating team' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
