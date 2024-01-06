import { useContext } from "react";
import { AuthContext } from "../auth/context";

function Dashboard() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div>
      <h1>Admin Servers:</h1>
      {currentUser && <p>Current User</p>}
    </div>
  );
}

export default Dashboard;
