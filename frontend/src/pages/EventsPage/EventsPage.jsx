import React from "react";
import useAuth from "../../hooks/useAuth";
import PostEvent from "../../components/Events/PostEvent";

const EventsPage = () => {
  const [user, token] = useAuth()
  const auth = "Bearer " + token;

  return (
    <main>
      <PostEvent userId={user.id} auth={auth} />
    </main>
  )
};
export default EventsPage;