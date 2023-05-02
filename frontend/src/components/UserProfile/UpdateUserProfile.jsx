import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

function UpdateUserProfile({  match  }) {
  const [user, token] = useAuth()
  const [userProfile, setUserProfile] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    is_establishment: false,
    establishment_name: "",
    opening_time: "",
    closing_time: "",
    menu_url: "",
    specials: "",
    social_media: "",
    entertainment: "",
    teams: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/user/${user.id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
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

  async function handleSubmit() {
    await axios.put(`http://127.0.0.1:5000/api/user/${user.id}/`, updatedUser);
    setEditMode(false);
    setUserProfile(updatedUser);
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
    <div>
      <h1>{user.first_name}'s Profile</h1>
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
            Entertainment:
            <input
                type="text"
                name="entertainment"
                value={updatedUser.entertainment}
                onChange={handleChange}
            />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>
            Cancel
            </button>
        </form>
        ) : (
        <div>
            <p>First Name: {updatedUser.first_name}</p>
            <p>Last Name: {updatedUser.last_name}</p>
            <p>Email: {updatedUser.email}</p>
            <p>Is Establishment: {updatedUser.is_establishment ? "Yes" : "No"}</p>
            {updatedUser.is_establishment && (
            <>
                <p>Establishment Name: {updatedUser.establishment_name}</p>
                <p>Opening Time: {updatedUser.opening_time}</p>
                <p>Closing Time: {updatedUser.closing_time}</p>
                <p>Menu URL: {updatedUser.menu_url}</p>
                <p>Specials: {updatedUser.specials}</p>
                <p>Social Media: {updatedUser.social_media}</p>
                <p>Entertainment: {updatedUser.entertainment}</p>
                <ul>Teams: {
                updatedUser.teams.map(team=><li>{team.name}</li>)
                }</ul>
            </>
            )}
            <button type="button" onClick={handleEdit}>
            Edit Profile
            </button>
        </div>
        )}
    </div>
)};

export default UpdateUserProfile;