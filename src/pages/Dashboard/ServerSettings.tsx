import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { AuthContext } from "../../auth/context";
import { doc, getDoc } from "firebase/firestore";
import { db, functions } from "../../firebase";
import Sidenav from "../../components/Drawer";
import { httpsCallable } from "firebase/functions";
import Dropdown from "../../components/Dropdown";
import { ChannelProps, RoleProps, SettingsProps } from "../../utils/types";
import { AppContext } from "../../context/appContext";

function ServerSettings() {
  const { currentUser } = useContext(AuthContext);
  const { setSettings, channels, setChannels, roles, setRoles } =
    useContext(AppContext);
  const { id } = useParams<string>();
  const [isValidId, setIsValidId] = useState<boolean | null>(null);

  useEffect(() => {
    const checkValidity = async (): Promise<void> => {
      const serversRef = doc(db, "currentServers", "servers");
      const serversSnap = await getDoc(serversRef);

      if (serversSnap.exists()) {
        const valid =
          currentUser?.guilds.some(
            (guild) =>
              guild.id === id && guild.id.includes(serversSnap.data().id)
          ) ?? null;
        setIsValidId(valid);

        if (id) {
          const settingsRef = doc(db, "settings", id);
          const settingsSnap = await getDoc(settingsRef);

          if (settingsSnap.exists()) {
            setSettings(settingsSnap.data() as SettingsProps);
          }
        }
      }
    };

    checkValidity();
  }, [currentUser, id]);

  useEffect(() => {
    const getData = async (guildId: string | undefined) => {
      const getChannels = httpsCallable(functions, "getChannels");
      const getRoles = httpsCallable(functions, "getRoles");
      await getChannels({ guildId }).then((result) => {
        const data = result.data;

        return setChannels(data as [ChannelProps]);
      });
      await getRoles({ guildId }).then((result) => {
        const data = result.data;

        return setRoles(data as [RoleProps]);
      });
    };

    if (isValidId) {
      getData(id);
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
        <Dropdown channels={channels} dbItem={"djRole"} />
      </div>
    </>
  );
}

export default ServerSettings;
