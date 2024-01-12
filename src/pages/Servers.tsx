import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/context";
import styles from "./servers.module.scss";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";

function Servers() {
  const { currentUser } = useContext(AuthContext);
  const [validServers, setValidServers] = useState<Array<string>>([""]);

  useEffect(() => {
    const validServer = async () => {
      const docRef = doc(db, "currentServers", "servers");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setValidServers(docSnap.data().id);
      }
    };

    validServer();

    return;
  }, []);

  return (
    <div>
      <h3>
        Hello {currentUser?.username}! <br />
        Please select a server to get started.
      </h3>
      <hr />
      <div className={styles.container}>
        {currentUser?.guilds.map((i) => (
          <div key={i.id} className={styles.iconContainer}>
            {validServers.includes(i.id) ? (
              <Link to={`/dashboard/${i.id}`}>
                <img
                  className={`${styles.serverIcon} ${styles.valid}`}
                  src={`https://cdn.discordapp.com/icons/${i.id}/${i.icon}.png`}
                  alt={i.name}
                />
              </Link>
            ) : (
              <img
                className={`${styles.serverIcon} ${styles.invalid}`}
                src={`https://cdn.discordapp.com/icons/${i.id}/${i.icon}.png`}
                alt={i.name}
              />
            )}
            {i.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Servers;
