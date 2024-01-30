import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { AuthContext } from "../../auth/context";
import { doc, getDoc } from "firebase/firestore";
import { db, functions } from "../../firebase";
import Sidenav from "../../components/Drawer";
import { httpsCallable } from "firebase/functions";
import Dropdown from "../../components/Dropdown";

function ServerSettings() {
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams<string>();
  const [isValidId, setIsValidId] = useState<boolean | null>(null);
  const [channels, setChannels] = useState<Array<object>>();

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

  useEffect(() => {
    const guildChannels = async (guildId: string | undefined) => {
      const getChannels = httpsCallable(functions, "getChannels");
      await getChannels({ guildId }).then((result) => {
        const data = result.data as { channels?: [] };
        console.log(data.channels);

        return setChannels(data.channels);
      });
    };

    if (isValidId) {
      guildChannels(id);
    }
  }, [isValidId, id]);

  if (isValidId === null) {
    return <div>Loading...</div>;
  }

  if (!isValidId) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Sidenav />
      <h4 style={{ textAlign: "center" }}>Channel Selection</h4>
      <div>
        <Dropdown channels={channels} />
      </div>
    </>
  );
}

export default ServerSettings;
