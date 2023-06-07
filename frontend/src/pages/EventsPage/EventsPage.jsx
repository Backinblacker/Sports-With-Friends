import React from "react";
import useAuth from "../../hooks/useAuth";
import PostEvent from "../../components/Events/PostEvent";
import CheckedInEvents from "../../components/Events/CheckedInEvents";

const EventsPage = () => {
  const [user, token] = useAuth();
  const auth = "Bearer " + token;
  
  return (
    <main>
      {user.is_establishment ? (
        <PostEvent userId={user.id} auth={auth} />
      ) : (
        <CheckedInEvents userId={user.id} auth={auth}/>
      )}
    </main>
  );
};

export default EventsPage;
