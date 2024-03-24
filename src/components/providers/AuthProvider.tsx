import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import app from "@/utils/firebaseClient";
import { fetchData } from "@/utils/api";
import { UserProfile } from "firebase/auth";
import { UserData } from "@/models/user";

interface AuthContextType {
  authUser: User | null;
  currentUser: UserData | null | undefined;
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<UserData | null>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    // This listens for changes to the auth state (e.g., user logs in or out)
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);

      if (user) {
        setAuthUser(user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const token = await user.getIdToken();
        localStorage.setItem("userToken", token);
        // if no user exists, create user
        try {
          // Attempt to fetch the user's profile
          const { data } = await fetchData("/api/users/firebase", {
            method: "GET",
          });
          setCurrentUser(data);
          console.log("User profile:", data);
        } catch (error) {
          if (
            error instanceof Error &&
            error.message.includes("User not found")
          ) {
            // Assuming the user does not exist, create the user
            const userData: UserProfile = {
              email: user.email!,
              name: user.displayName!,
            };
            try {
              const newUser = await fetchData("/api/users", {
                method: "POST",
                body: userData,
              });
              console.log("New user created:", newUser);
            } catch (creationError) {
              console.error("Failed to create user:", creationError);
            }
          } else {
            console.error("Failed to get user:", error);
          }
        }
      } else {
        // User is signed out
        setCurrentUser(null);
        setAuthUser(null);
        localStorage.removeItem("userToken");
        // setUserDisplayName(null);
      }
      setIsLoading(false);
    });

    // Clean up the subscription
    return unsubscribe;
  }, []);

  const loginWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = async () => {
    const auth = getAuth(app);
    try {
      await signOut(auth);
      setCurrentUser(null);
      setAuthUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const value = {
    authUser,
    currentUser,
    isLoading,
    loginWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
