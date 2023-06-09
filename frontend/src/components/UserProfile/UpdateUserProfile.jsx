import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import TeamSelector from "../TeamSelector/TeamSelector";
import {PersonFill} from "react-bootstrap-icons"

function UpdateUserProfile({ user_id }) {
  const [user, token] = useAuth();
  const [userProfile, setUserProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [teams, setTeams] = useState([]);
  const [updatedUser, setUpdatedUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    is_establishment: false,
    establishment_name: "",
    zip_code:"",
    opening_time: "",
    closing_time: "",
    menu_url: "",
    specials: "",
    social_media: "",
    entertainment: "",
    teams: [],
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/userinfo/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserProfile(response.data);
        setUpdatedUser(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserProfile();
  }, [user, token, user_id]);

  function handleEdit() {
    setEditMode(true);
    setUpdatedUser(userProfile);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    
    const lastSelectedTeam = selectedTeams.length > 0 ? selectedTeams[selectedTeams.length - 1] : null;
  
    const teamsIds = updatedUser.teams.map((team) => team.id);

    try {
      console.log("Request body:", updatedUser);
      const response = await axios.put(
        `http://127.0.0.1:5000/api/user/${user_id}`,
        {
          ...updatedUser,
          teams: teamsIds,
          },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserProfile(response.data);
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  }


  function handleCancel() {
    setEditMode(false);
  }

  function handleChange(event) {
    setUpdatedUser({
      ...updatedUser,
      [event.target.name]: event.target.value,
    });
  }

  function handleTeamSelect(updatedSelectedTeams) { // Receive the updatedSelectedTeams
    setSelectedTeams(updatedSelectedTeams);
    setUpdatedUser({
      ...updatedUser,
      teams: updatedSelectedTeams, // Update the teams property with updatedSelectedTeams
    });
  }

  const isUserLoggedIn = user.id === user_id;

  return (
    <div className="profile">
      <h1>User Profile</h1>
      <div className="iconSize">
        <PersonFill className="custom-icon" />
      </div>
      {editMode ? (
        <form onSubmit={handleSubmit}>
            <label>
            First Name:
            <input
                type="text"
                name="first_name"
                value={updatedUser.first_name}
                onChange={handleChange}
                className={editMode ? "border-profile-b" : ""}
            />
            </label>
            <label>
            Last Name:
            <input
                type="text"
                name="last_name"
                value={updatedUser.last_name}
                onChange={handleChange}
                className={editMode ? "border-profile-b" : ""}
            />
            </label>
            <label>
            Email:
            <input
                type="text"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
                className={editMode ? "border-profile-b" : ""}
            />
            </label>
            <label>
            Is Establishment:
            <input
                type="checkbox"
                name="is_establishment"
                checked={updatedUser.is_establishment}
                onChange={handleChange}
            />
            </label>
            <br/>
            <label>
            Establishment Name:
            <input
                type="text"
                name="establishment_name"
                value={updatedUser.establishment_name}
                onChange={handleChange}
                className={editMode ? "border-profile-b" : ""}
            />
            </label>
            <label>
            Zip Code:
            <input
                type="integer"
                name="zip_code"
                value={updatedUser.zip_code}
                onChange={handleChange}
                className={editMode ? "border-profile-b" : ""}
            />
            </label>
            <label>
            Opening Time:
            <input
                type="time"
                name="opening_time"
                value={updatedUser.opening_time}
                onChange={handleChange}
                className={editMode ? "border-profile-b" : ""}
            />
            </label>
            <label>
            Closing Time:
            <input
                type="time"
                name="closing_time"
                value={updatedUser.closing_time}
                onChange={handleChange}
                className={editMode ? "border-profile-b" : ""}
            />
            </label>
            <label>
            Menu URL:
            <input
                type="text"
                name="menu_url"
                value={updatedUser.menu_url}
                onChange={handleChange}
                className={editMode ? "border-profile-b" : ""}
            />
            </label>
            <label>
            Specials:
            <input
              type="text"
              name="specials"
              value={updatedUser.specials}
              onChange={handleChange}
              className={editMode ? "border-profile-b" : ""}
            />
          </label>
          <label>
            Social Media:
            <input
              type="text"
              name="social_media"
              value={updatedUser.social_media}
              onChange={handleChange}
              className={editMode ? "border-profile-b" : ""}
            />
          </label>
          <label>
            Entertainment:
            <input
              type="text"
              name="entertainment"
              value={updatedUser.entertainment}
              onChange={handleChange}
              className={editMode ? "border-profile-b" : ""}
            />
          </label>
          <label>
            Teams:
            <TeamSelector
            sport={updatedUser.sport}
            onSelectTeam={handleTeamSelect} 
            selectedTeams={selectedTeams}
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel} className="editButton">
            Cancel
          </button>
        </form>
      ) : (
        <>
          <div className="profile-info">
            <div className="profile-column">
              <div className="profile-item">
                <p className="border-profile-a">First Name:</p>
                <p className="border-profile-a">Last Name:</p>
                <p className="border-profile-a">Email:</p>
                {updatedUser.is_establishment && (
                  <>
                    <p className="border-profile-a">Are you an establishment profile:</p>
                    <p className="border-profile-a">Establishment Name:</p>
                    <p className="border-profile-a">Zip Code:</p>
                  </>
                )}
              </div>
            </div>
            <div className="profile-column">
              <div className="profile-item">
                <p className="border-profile-b">{updatedUser.first_name}</p>
                <p className="border-profile-b">{updatedUser.last_name}</p>
                <p className="border-profile-b">{updatedUser.email}</p>
                {updatedUser.is_establishment && (
                  <>
                    <p className="border-profile-b">{updatedUser.is_establishment ? "Yes" : "No"}</p>
                    <p className="border-profile-b">{updatedUser.establishment_name}</p>
                    <p className="border-profile-b">{updatedUser.zip_code}</p>
                  </>
                )}
              </div>
            </div>
            {updatedUser.is_establishment && (
              <>
                <div className="profile-column">
                  <div className="profile-item">
                    <p className="border-profile-a">Opening Time:</p>
                    <p className="border-profile-a">Closing Time:</p>
                    <p className="border-profile-a">Menu URL:</p>
                    <p className="border-profile-a">Specials:</p>
                    <p className="border-profile-a">Social Media:</p>
                    <p className="border-profile-a">Entertainment:</p>
                  </div>
                </div>
                <div className="profile-column">
                  <div className="profile-item">
                    <p className="border-profile-b">{updatedUser.opening_time}</p>
                    <p className="border-profile-b">{updatedUser.closing_time}</p>
                    <p className="border-profile-b">{updatedUser.menu_url}</p>
                    <p className="border-profile-b">{updatedUser.specials}</p>
                    <p className="border-profile-b">{updatedUser.social_media}</p>
                    <p className="border-profile-b">{updatedUser.entertainment}</p>
                  </div>
                </div>
              </>
            )}
          </div>
          {isUserLoggedIn && (
            <button type="button" onClick={handleEdit} className="editButton">
              Edit Profile
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default UpdateUserProfile;