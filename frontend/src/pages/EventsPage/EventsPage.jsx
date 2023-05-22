import React from "react";
import useAuth from "../../hooks/useAuth";
import PostEvent from "../../components/Events/PostEvent";

const EventsPage = () => {
  const [user, token] = useAuth()
  const auth = "Bearer " + token;

  return (
    <main>
      {/* need only to show if user = is_establishment = True */}
      {/* Instead of null this would show events that have been checked into */}
      {user.is_establishment? <PostEvent userId={user.id} auth={auth} />: null}
      {/* <PostEvent userId={user.id} auth={auth} /> */}
    </main>
  )
};
export default EventsPage;