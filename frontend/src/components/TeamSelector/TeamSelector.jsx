import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TeamSelector({ onSelectTeam }) {
    const [teams, setTeams] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [sport, setSport] = useState("null");

    useEffect(() => {
        async function fetchTeams() {
          const response = await axios.get(`http://127.0.0.1:5000/api/teams/${sport}`);
          setTeams(response.data);
        }
        fetchTeams();
    }, [sport]);

    function handleTeamSelect(event) {
      const teamId = parseInt(event.target.value);
      const team = teams.find((team) => team.id === teamId);
      if (!selectedTeams.some((selectedTeam) => selectedTeam.id === team.id)) {
        const updatedSelectedTeams = [...selectedTeams, team];
        setSelectedTeams(updatedSelectedTeams);
        const teamsObject = {};
        updatedSelectedTeams.forEach((selectedTeam) => {
          teamsObject[selectedTeam.id] = selectedTeam;
        });
        onSelectTeam(updatedSelectedTeams);
      }
    }

    return (
        <div>
          <label htmlFor="sport">Sport:</label>
          <select id="sport" value={sport} onChange={(event) => setSport(event.target.value)}>
            <option value='null'>--Select League--</option>
            <option value="Basketball">NBA</option>
            <option value="Baseball">MLB</option>
            <option value="Hockey">NHL</option>
            <option value="Football">NFL</option>
          </select>
    
          <label htmlFor="team">Team:</label>
          <select id="team" onChange={handleTeamSelect}>
            <option value=""></option>
            {teams.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
    
          <ul>
            {selectedTeams.map((team) => (
              <li key={team.id}>{team.name}</li>
            ))}
          </ul>
        </div>
      );
};

export default TeamSelector;
