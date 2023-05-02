// import React, { useContext } from "react";
// import AuthContext from "../../context/AuthContext";
// import useCustomForm from "../../hooks/useCustomForm";
// import useAuth from "../../hooks/useAuth";

// const EstablishmentPage = () => {
//   const [user, token] = useAuth()
//     const auth = "Bearer " + token;
//   const { registerEstablishmentUser } = useContext(AuthContext);
//   const defaultValues = {
//     establishment_name: "",
//     opening_time: "",
//     closing_time: "",
//     menu_url: "",
//     specials: "",
//     social_media: "",
//     entertainment:"",
//     teams:"",
//   };
//   const [formData, handleInputChange, handleSubmit] = useCustomForm(
//     defaultValues,
//     (data) => {
//       registerEstablishmentUser({ ...data, is_establishment: true });
//     }
//   );

//   return (
//     <div className="container">
//       <form className="form" onSubmit={handleSubmit}>
//           <div>
//             <label>
//               Establishment Name:{" "}
//               <input
//                 type="text"
//                 name="establishment_name"
//                 value={formData.establishment_name}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <label>
//               Opening Time:{" "}
//               <input
//                 type="time"
//                 name="opening_time"
//                 value={formData.opening_time}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <label>
//               Closing Time:{" "}
//               <input
//                 type="time"
//                 name="closing_time"
//                 value={formData.closing_time}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <label>
//               Menu URL:{" "}
//               <input
//                 type="text"
//                 name="menu_url"
//                 value={formData.menu_url}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <label>
//               Specials:{" "}
//               <input
//                 type="text"
//                 name="specials"
//                 value={formData.specials}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <label>
//               Social Media:{" "}
//               <input
//                 type="text"
//                 name="social_media"
//                 value={formData.social_media}
//                 onChange={handleInputChange}
//               />
//             </label>
//             <label>
//               Entertainment:{" "}
//               <input
//                 type="text"
//                 name="entertainment"
//                 value={formData.entertainment}
//                 onChange={handleInputChange}
//               />
//             </label>
//             </div>
//         <button>Update Profile</button>
//       </form>
//     </div>
//   );
// };

// export default EstablishmentPage;