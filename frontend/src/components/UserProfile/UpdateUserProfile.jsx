import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateUserProfile({ match }) {
  const [user, setUser] = useState({});
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
  });

  useEffect(() => {
    async function fetchUser() {
      const response = await axios.get(`/api/user/${match.params.user_id}`);
      setUser(response.data);
    }
    fetchUser();
  }, [match.params.user_id]);

  function handleEdit() {
    setEditMode(true);
    setUpdatedUser(user);
  }

  async function handleSubmit() {
    await axios.put(`/api/user/${user.id}`, updatedUser);
    setEditMode(false);
    setUser(updatedUser);
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
      <h1>User Profile</h1>
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
            <button type="submit">Save</button>
            <button type="button" onClick={handleCancel}>
            Cancel
            </button>
        </form>
        ) : (
        <div>
            <p>First Name: {user.first_name}</p>
            <p>Last Name: {user.last_name}</p>
            <p>Email: {user.email}</p>
            <p>Is Establishment: {user.is_establishment ? "Yes" : "No"}</p>
            {user.is_establishment && (
            <>
                <p>Establishment Name: {user.establishment_name}</p>
                <p>Opening Time: {user.opening_time}</p>
                <p>Closing Time: {user.closing_time}</p>
                <p>Menu URL: {user.menu_url}</p>
                <p>Specials: {user.specials}</p>
                <p>Social Media: {user.social_media}</p>
                <p>Entertainment: {user.entertainment}</p>
            </>
            )}
            <button type="button" onClick={handleEdit}>
            Edit Profile
            </button>
        </div>
        )};
    </div>
)};

export default UpdateUserProfile;