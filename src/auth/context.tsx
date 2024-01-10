import { User, signInWithCustomToken } from "firebase/auth";
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

interface IUserDoc {
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
  currentUser?: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
  userDoc?: IUserDoc | null;
  setUserDoc: Dispatch<SetStateAction<IUserDoc | null>>;
}

export const AuthContext = createContext<AuthContext>({
  currentUser: null,
  setCurrentUser: () => {},
  userDoc: null,
  setUserDoc: () => {},
});

export const AuthContextProvider = (props: React.PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userDoc, setUserDoc] = useState<IUserDoc | null>(null);

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
              setCurrentUser(userCredential.user);

              try {
                const ref = doc(db, "users", userCredential.user.uid);
                const docSnap = await getDoc(ref);

                if (docSnap.exists()) {
                  setUserDoc(docSnap.data() as IUserDoc);
                } else {
                  console.log("No Document");
                }
              } catch (error) {
                console.error(error);
              }
            }
          );
        } else {
          console.error("Custom token not found in the cookie.");
        }
      } catch (error) {
        console.error("Error signing in:", error);
      }
    };

    handleSignIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, setCurrentUser, userDoc, setUserDoc }}>
      {props.children}
    </AuthContext.Provider>
  );
};
