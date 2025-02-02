import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CrudOperations.css";

const CrudOperations = () => {
  const [teams, setTeams] = useState([]);
  const [newTeam, setNewTeam] = useState({
    name: "",
    role: "",
    age: "",
    matches: "",
    runs: "",
    wickets: "",
  });
  const [selectedTeam, setSelectedTeam] = useState(null);

  const apiUrl = "http://localhost:5000/teams"; // URL of your backend API

  // Fetch all teams
  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => console.error("Error fetching teams:", error));
  }, []);

  // Create a new team
  const handleCreate = () => {
    axios
      .post(apiUrl, newTeam)
      .then((response) => {
        setTeams([...teams, response.data]);
        setNewTeam({
          name: "",
          role: "",
          age: "",
          matches: "",
          runs: "",
          wickets: "",
        });
      })
      .catch((error) => console.error("Error creating team:", error));
  };

  // Update a team
  const handleUpdate = (id) => {
    axios
      .put(`${apiUrl}/${id}`, newTeam)
      .then((response) => {
        // Update the team in the state
        const updatedTeams = teams.map((team) =>
          team._id === id ? response.data : team
        );
        setTeams(updatedTeams);
        setSelectedTeam(null); // Close the edit form
        setNewTeam({
          name: "",
          role: "",
          age: "",
          matches: "",
          runs: "",
          wickets: "",
        }); // Reset form
      })
      .catch((error) => console.error("Error updating team:", error));
  };

  // Delete a team
  const handleDelete = (id) => {
    axios
      .delete(`${apiUrl}/${id}`)
      .then(() => {
        setTeams(teams.filter((team) => team._id !== id));
      })
      .catch((error) => console.error("Error deleting team:", error));
  };
  const handleEdit = (team) => {
    setSelectedTeam(team); // Set the team to be edited
    setNewTeam({
      name: team.name,
      role: team.role,
      age: team.age,
      matches: team.matches,
      runs: team.runs,
      wickets: team.wickets,
    });
  };

  return (
    <div>
      <h1>CRUD Operations (Teams)</h1>

      <div>
        <h2>{selectedTeam ? "Edit Team" : "Create New Team"}</h2>
        <input
          type="text"
          value={newTeam.name}
          onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
          placeholder=" Name"
        />
        <input
          type="text"
          value={newTeam.role}
          onChange={(e) => setNewTeam({ ...newTeam, role: e.target.value })}
          placeholder="role"
        />
        <input
          type="number"
          value={newTeam.age}
          onChange={(e) => setNewTeam({ ...newTeam, age: e.target.value })}
          placeholder="age"
        />
        <input
          type="number"
          value={newTeam.matches}
          onChange={(e) => setNewTeam({ ...newTeam, matches: e.target.value })}
          placeholder="matches"
        />
        <input
          type="number"
          value={newTeam.runs}
          onChange={(e) => setNewTeam({ ...newTeam, runs: e.target.value })}
          placeholder="runs"
        />
        <input
          type="number"
          value={newTeam.wickets}
          onChange={(e) => setNewTeam({ ...newTeam, wickets: e.target.value })}
          placeholder="wickets"
        />
        {selectedTeam ? (
          <button onClick={() => handleUpdate(selectedTeam._id)}>
            Update Team
          </button>
        ) : (
          <button onClick={handleCreate}>Create Team</button>
        )}
      </div>

      <ul>
        {teams.map((team) => (
          <li key={team._id}>
            {team.name} - {team.city}
            <button onClick={() => handleEdit(team)}>Edit</button>
            <button onClick={() => handleDelete(team._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudOperations;
