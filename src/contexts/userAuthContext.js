import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import toast from 'react-hot-toast';

const userAuthContext = createContext();

const useUserAuthContextValue = () => {
    return useContext(userAuthContext);
}

const CustomUserAuthContextProvider = ({ children }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userUid, setUserUid] = useState(null);

    // representation of authenticate user
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                console.log("user is signed in");
                setIsSignedIn(true);
                setUserUid(user.uid);
            }});
    }, [auth]);

    const signOutUser = async () => {
        try {
            await signOut(auth);

            toast.success('User signed out successfully!', {
                duration: 2000,
                style: {
                    minWidth: "18rem",
                    minHeight: "3.5rem",
                    marginTo: "2rem"
                }
            });
        } catch (err) {
            toast.error(err.message, {
                duration: 2000,
                style: {
                    minWidth: "18rem",
                    minHeight: "3.5rem",
                    marginTo: "2rem"
                }
            });
            
        } finally {
            setIsSignedIn(false);
        }
    }

    return (
        <userAuthContext.Provider value={{ isSignedIn, setIsSignedIn, userUid, setUserUid, signOutUser }}>
            { children }
        </userAuthContext.Provider>
    )
}

export { useUserAuthContextValue };
export default CustomUserAuthContextProvider;