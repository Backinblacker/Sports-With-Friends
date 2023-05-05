import React, { useState, useEffect, useContext } from "react";

const FavoritesPage = () => {
  const [user, token] = useAuth()
  const auth = "Bearer " + token;

  return (
    <main>
      {/* need only to show if user = is_establishment = True */}
      {/* need show favorites for user */}
    </main>
  )
};

export default FavoritesPage;