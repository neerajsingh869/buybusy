import { createContext, useContext, useState } from "react";

const userAuthContext = createContext();

const useUserAuthContextValue = () => {
    return useContext(userAuthContext);
}

const CustomUserAuthContextProvider = ({ children }) => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    return (
        <userAuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
            { children }
        </userAuthContext.Provider>
    )
}

export { useUserAuthContextValue };
export default CustomUserAuthContextProvider;