import React from "react";
import useAuth from "../../hooks/useAuth";


const HomePage = () => {
  const [user, token] = useAuth()
    const auth = "Bearer " + token;

    return(
        <main>
            <h1>Welcome to Sport With Friends</h1>
        </main>
    )
};
export default HomePage;
