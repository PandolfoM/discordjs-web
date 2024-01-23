import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { AuthContext } from "../../auth/context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Sidenav from "../../components/Drawer";

function ServerSettings() {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams<string>();
  const [isValidId, setIsValidId] = useState<boolean | null>(null);

  useEffect(() => {
    const checkValidity = async (): Promise<void> => {
      const docRef = doc(db, "currentServers", "servers");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const valid =
          currentUser?.guilds.some(
            (guild) => guild.id === id && guild.id.includes(docSnap.data().id)
          ) ?? null;
        setIsValidId(valid);
      }
    };

    checkValidity();
  }, [currentUser, id]);

  if (isValidId === null) {
    return <div>Loading...</div>;
  }

  if (!isValidId) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Sidenav />
      <div>ServerSettings</div>
    </>
  );
}

export default ServerSettings;
