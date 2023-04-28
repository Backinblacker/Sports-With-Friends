import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";

const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    isEstablishment: false,
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
  );

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <label>
          First Name:{" "}
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Last Name:{" "}
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:{" "}
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Are you an establishment?
          <input
            type="checkbox"
            name="isEstablishment"
            checked={formData.isEstablishment}
            onChange={handleInputChange}
          />
        </label>
        {formData.isEstablishment && (
          <div>
            <label>
              Establishment Name:{" "}
              <input
                type="text"
                name="establishmentName"
                value={formData.establishmentName}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Opening Time:{" "}
              <input
                type="time"
                name="openingTime"
                value={formData.openingTime}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Closing Time:{" "}
              <input
                type="time"
                name="closingTime"
                value={formData.closingTime}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Menu URL:{" "}
              <input
                type="text"
                name="menuUrl"
                value={formData.menuUrl}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Specials:{" "}
              <input
                type="text"
                name="specials"
                value={formData.specials}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Social Media:{" "}
              <input
                type="text"
                name="socialMedia"
                value={formData.socialMedia}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Entertainment:{" "}
              <input
                type="text"
                name="entertainment"
                value={formData.entertainment}
                onChange={handleInputChange}
              />
            </label>
            </div>
        )}
        <button>Register!</button>
      </form>
    </div>
  );
};

export default RegisterPage;
