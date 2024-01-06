import { User, onAuthStateChanged, signInWithCustomToken } from "firebase/auth";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../firebase";
import Cookies from "js-cookie";

interface AuthContext {
  currentUser?: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
}

export const AuthContext = createContext<AuthContext>({
  currentUser: null,
  setCurrentUser: () => {},
});

export const AuthContextProvider = (props: React.PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const handleSignIn = async () => {
      try {
        // Retrieve the customToken from the cookie
        const customToken = Cookies.get("customToken");

        if (customToken) {
          // Sign in with the custom token
          await signInWithCustomToken(auth, customToken);
        } else {
          console.error("Custom token not found in the cookie.");
        }
      } catch (error) {
        console.error("Error signing in:", error);
      }
    };

    // Call the sign-in function when the component mounts
    handleSignIn();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};
