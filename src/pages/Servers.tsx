import { useContext } from "react";
import { AuthContext } from "../auth/context";

function Servers() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <h1>Admin Servers:</h1>
      {currentUser && <p>Current User {currentUser.uid}</p>}
    </div>
  );
}

export default Servers;
