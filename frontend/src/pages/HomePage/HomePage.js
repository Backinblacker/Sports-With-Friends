import React from "react";
import useAuth from "../../hooks/useAuth";
import UpdateUserProfile from "../../components/UserProfile/UpdateUserProfile";

const HomePage = () => {
  const [user, token] = useAuth()
  const auth = "Bearer " + token;

  return (
    <main>
      <h1>Welcome to Sport With Friends</h1>
      <UpdateUserProfile userId={user.id} auth={auth} />
    </main>
  )
};
export default HomePage;
