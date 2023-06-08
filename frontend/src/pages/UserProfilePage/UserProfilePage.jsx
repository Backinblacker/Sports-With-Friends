import React from "react";
import useAuth from "../../hooks/useAuth";
import UpdateUserProfile from "../../components/UserProfile/UpdateUserProfile";

const UserProfilePage = () => {
  const [user, token] = useAuth()
  const auth = "Bearer " + token;

  return (
    <main>
      <UpdateUserProfile userId={user.id} auth={auth} />
    </main>
  )
};
export default UserProfilePage;