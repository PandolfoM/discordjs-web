import { signInWithCustomToken } from "firebase/auth";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../firebase";
import Cookies from "js-cookie";
import { doc, getDoc } from "firebase/firestore";

interface IGuilds {
  icon: string;
  id: string;
  name: string;
  owner: boolean;
  permissions: number;
  permissions_new: string;
  features: Array<string>;
}

export interface IUserDoc {
  avatar: string;
  discriminator: string;
  email: string;
  guilds: Array<IGuilds>;
  refreshToken: string;
  token: string;
  uid: string;
  username: string;
}

interface AuthContext {
  currentUser?: IUserDoc | undefined;
  setCurrentUser: Dispatch<SetStateAction<IUserDoc | undefined>>;
  // userDoc?: IUserDoc | null;
  // setUserDoc: Dispatch<SetStateAction<IUserDoc | null>>;
}

export const AuthContext = createContext<AuthContext>({
  currentUser: undefined,
  setCurrentUser: () => {},
  // userDoc: null,
  // setUserDoc: () => {},
});

export const AuthContextProvider = (props: React.PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<IUserDoc | undefined>(
    undefined
  );

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       console.log("Auth state");

  //       // setCurrentUser(user);
  //     }
  //   });

  //   return () => unsub();
  // }, []);

  useEffect(() => {
    const handleSignIn = async () => {
      try {
        // Retrieve the customToken from the cookie
        const customToken = Cookies.get("customToken");

        if (customToken) {
          signInWithCustomToken(auth, customToken).then(
            async (userCredential) => {
              // setCurrentUser(userCredential.user);

              try {
                const ref = doc(db, "users", userCredential.user.uid);
                const docSnap = await getDoc(ref);

                if (docSnap.exists()) {
                  setCurrentUser(docSnap.data() as IUserDoc);
                } else {
                  console.log("No Document");
                }
              } catch (error) {
                console.error(error);
              }
            }
          );
        } else {
          if (process.env.NODE_ENV === "development") {
            setCurrentUser({
              avatar: "a_f3c01d3e1dcee4458e09c1bd76e5d397",
              discriminator: "0",
              email: "matt@pandolfo.com",
              guilds: [
                {
                  features: [],
                  icon: "a_bad3c64a2c2286b2efe93240b0964542",
                  id: "726268945266638909",
                  name: "Epicans 🌭",
                  owner: true,
                  permissions: 2147483647,
                  permissions_new: "562949953421311",
                },
                {
                  features: [],
                  icon: "ed4054e153a1349353f824b9d1ae5aac",
                  id: "442509808969580554",
                  name: "RyRyanP Twitch Server",
                  owner: false,
                  permissions: 2147483647,
                  permissions_new: "562949953421311",
                },
              ],
              refreshToken: "",
              token: "",
              uid: "248910149442338816",
              username: "thoomin",
            });
            return;
          }
          console.error("Custom token not found in the cookie.");
        }
      } catch (error) {
        console.error("Error signing in:", error);
      }
    };

    handleSignIn();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
