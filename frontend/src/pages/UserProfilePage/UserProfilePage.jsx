import React from "react";
import useAuth from "../../hooks/useAuth";
import UpdateUserProfile from "../../components/UserProfile/UpdateUserProfile";
import { useParams } from "react-router-dom";

const UserProfilePage = () => {
  const [user, token] = useAuth()
  const auth = "Bearer " + token;
  const { user_id } = useParams();

  return (
    <main>
      <UpdateUserProfile user_id={user_id} auth={auth} />
    </main>
  )
};
export default UserProfilePage;