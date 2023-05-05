import React from "react";
import useAuth from "../../hooks/useAuth";

const DetailsPage = () => {
  const [user, token] = useAuth()
  const auth = "Bearer " + token;

  return (
    <main>
        {/* need user establishment info no ability to post or update*/}
        {/* Need to view events no ability to edit */}
        {/* Need Reviews for establishments */}
        {/* <PostEvent userId={user.id} auth={auth} /> */}
    </main>
  )
};
export default DetailsPage;