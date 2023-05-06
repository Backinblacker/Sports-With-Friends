import React from "react";
import useAuth from "../../hooks/useAuth";
import FavoriteEstablishment from "../../components/FavoriteEstablishment/FavoriteEstablishment";

const FavoritesPage = () => {
  const [user, token] = useAuth()
  const auth = "Bearer " + token;

  return (
    <main>
      <FavoriteEstablishment userId={user.id} auth={auth} />
    </main>
  )
};

export default FavoritesPage;