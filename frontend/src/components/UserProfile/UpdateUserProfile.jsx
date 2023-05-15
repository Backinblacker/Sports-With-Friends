import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import TeamSelector from "../TeamSelector/TeamSelector";

function UpdateUserProfile() {
  const [user, token] = useAuth();
  const [userProfile, setUserProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState([]);
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
          `http://127.0.0.1:5000/api/userinfo/${user.id}`,
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
  }, [user, token]);

  function handleEdit() {
    setEditMode(true);
    setUpdatedUser(userProfile);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    
    // need to get the team ids instead of the entire team object
    const lastSelectedTeam = selectedTeams.length > 0 ? selectedTeams[selectedTeams.length - 1] : null;
  
    try {
      console.log("Request body:", updatedUser);
      const response = await axios.put(
        `http://127.0.0.1:5000/api/user/${user.id}`,
        {
          ...updatedUser,
          teams: [...updatedUser.teams, lastSelectedTeam],
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

  return (
    <div className="profile">
      <h1>{user.username}'s Profile</h1>
      {editMode ? (
        <form onSubmit={handleSubmit}>
            <label>
            First Name:
            <input
                type="text"
                name="first_name"
                value={updatedUser.first_name}
                onChange={handleChange}
            />
            </label>
            <label>
            Last Name:
            <input
                type="text"
                name="last_name"
                value={updatedUser.last_name}
                onChange={handleChange}
            />
            </label>
            <label>
            Email:
            <input
                type="text"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
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
            <label>
            Establishment Name:
            <input
                type="text"
                name="establishment_name"
                value={updatedUser.establishment_name}
                onChange={handleChange}
            />
            </label>
            <label>
            Zip Code:
            <input
                type="integer"
                name="zip_code"
                value={updatedUser.zip_code}
                onChange={handleChange}
            />
            </label>
            <label>
            Opening Time:
            <input
                type="time"
                name="opening_time"
                value={updatedUser.opening_time}
                onChange={handleChange}
            />
            </label>
            <label>
            Closing Time:
            <input
                type="time"
                name="closing_time"
                value={updatedUser.closing_time}
                onChange={handleChange}
            />
            </label>
            <label>
            Menu URL:
            <input
                type="text"
                name="menu_url"
                value={updatedUser.menu_url}
                onChange={handleChange}
            />
            </label>
            <label>
            Specials:
            <input
              type="text"
              name="specials"
              value={updatedUser.specials}
              onChange={handleChange}
            />
          </label>
          <label>
            Social Media:
            <input
              type="text"
              name="social_media"
              value={updatedUser.social_media}
              onChange={handleChange}
            />
          </label>
          <label>
            Entertainment:
            <input
              type="text"
              name="entertainment"
              value={updatedUser.entertainment}
              onChange={handleChange}
            />
          </label>
          <label>
            Teams:
            <TeamSelector
              sport={updatedUser.sport}
              onSelectTeam={(selectedTeams) =>
                setUpdatedUser(selectedTeams )
              }
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p className="border-profile">First Name: {updatedUser.first_name}</p>
          <p className="border-profile">Last Name: {updatedUser.last_name}</p>
          <p className="border-profile">Email: {updatedUser.email}</p>
          <p className="border-profile">Is Establishment: {updatedUser.is_establishment ? "Yes" : "No"}</p>
          {updatedUser.is_establishment && (
            <>
              <p className="border-profile">Establishment Name: {updatedUser.establishment_name}</p>
              <p className="border-profile">Zip Code: {updatedUser.zip_code}</p>
              <p className="border-profile">Opening Time: {updatedUser.opening_time}</p>
              <p className="border-profile">Closing Time: {updatedUser.closing_time}</p>
              <p className="border-profile">Menu URL: {updatedUser.menu_url}</p>
              <p className="border-profile">Specials: {updatedUser.specials}</p>
              <p className="border-profile">Social Media: {updatedUser.social_media}</p>
              <p className="border-profile">Entertainment: {updatedUser.entertainment}</p>
              <div className="border-profile">
                <p>Teams: </p>
                <ul className="profile-list">
                  {/* Here is the idea behind mappting to the team id */}
                  {updatedUser.teams.map((team) => (
                    <div key={team.id}>{team.name}</div>
                  ))}
                </ul>
              </div>
            </>
          )}
          <button type="button" onClick={handleEdit}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default UpdateUserProfile;