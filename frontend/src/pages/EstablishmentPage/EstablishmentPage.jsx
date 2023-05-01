import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";

const RegisterEstablishmentPage = () => {
  const { registerEstablishmentUser } = useContext(AuthContext);
  const defaultValues = {
    establishmentName: "",
    openingTime: "",
    closingTime: "",
    menuUrl: "",
    specials: "",
    socialMedia: "",
    entertainment:""
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerEstablishmentUser
  );

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
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

export default RegisterEstablishmentPage;