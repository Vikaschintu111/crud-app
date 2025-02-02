const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create an instance of Express
const app = express();
const port = 5000; // You can choose any port you prefer

// Middleware
app.use(express.json()); // To parse JSON data
app.use(cors()); // To allow cross-origin requests (important for React)

const mongoURI = 'mongodb://localhost:27017/sports'; // Replace with your MongoDB URI if needed

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

// Define a Schema for the "team" collection
const teamSchema = new mongoose.Schema({
  name: String,
  role: String,
  age:Number,
  matches:Number,
  runs:Number,
  wickets:Number
  
});

// Create a Model for the "team" collection
const Team = mongoose.model('Team', teamSchema, 'team'); // 'team' is the collection name

// Routes

// 1. GET: Fetch all teams
app.get('/teams', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams); // Return the list of teams
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams' });
  }
});

// 2. POST: Create a new team
app.post('/teams', async (req, res) => {
  const { name, role, age, matches, runs, wickets } = req.body;
  try {
    const newTeam = new Team({ name, role,age, matches, runs, wickets });
    await newTeam.save();
    res.status(201).json(newTeam); // Return the created team
  } catch (error) {
    res.status(500).json({ message: 'Error creating team' });
  }
});

// 3. PUT: Update a team by ID
// PUT: Update a team by ID
app.put('/teams/:id', async (req, res) => {
    const { id } = req.params;
    const { name, role, age, matches, runs, wickets } = req.body;
  
    try {
      const updatedTeam = await Team.findByIdAndUpdate(id, { name, role, age, matches, runs, wickets }, { new: true });
      if (!updatedTeam) {
        return res.status(404).json({ message: 'Team not found' });
      }
      res.json(updatedTeam); // Return the updated team
    } catch (error) {
      res.status(500).json({ message: 'Error updating team' });
    }
  });
  
// 4. DELETE: Delete a team by ID
app.delete('/teams/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Team.findByIdAndDelete(id);
    res.status(200).json({ message: 'Team deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting team' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
