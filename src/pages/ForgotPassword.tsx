import { useContext, useRef, useState } from "react";
import { BeatLoader } from "react-spinners";
import { FirebaseError } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import { DARK_THEME } from "../constants";
import { showNotification } from "../utility/showNotifications";
import { ThemeContext } from "../contexts/themeContext";

const ForgotPassword = () => {
  const [loadingTraditional, setLoadingTraditional] = useState<boolean>(false);
  const inputEmail = useRef<HTMLInputElement>(null);

  const theme = useContext(ThemeContext);
  const auth = getAuth();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoadingTraditional(true);

    if (!inputEmail.current?.value) {
      showNotification("Please enter an email address", "error", theme);
      return;
    }

    const email = inputEmail.current.value;

    try {
      const actionCodeSettings = {
        url: import.meta.env.VITE_FIREBASE_REDIRECT_URL,
        // url: import.meta.env.VITE_FIREBASE_REDIRECT_URL_DEV,
        handleCodeInApp: true,
      };

      await sendPasswordResetEmail(auth, email, actionCodeSettings);

      showNotification(
        "Password reset email sent successfully!",
        "success",
        theme
      );
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        showNotification(error.message, "error", theme);
      } else {
        showNotification("An unknown error occurred.", "error", theme);
      }
    } finally {
      setLoadingTraditional(false);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <form
        className="w-80 flex flex-col p-4 gap-4"
        onSubmit={handleForgotPassword}
      >
        <h2 className="text-dark dark:text-white font-extrabold text-4xl my-4">
          Password Reset
        </h2>
        <input
          className="border border-solid border-violet-600 outline-none h-12 rounded-lg p-3 text-lg"
          type="email"
          placeholder="Enter Email"
          ref={inputEmail}
        />
        <button className="h-12 rounded-xl text-lg shadow-md dark:text-black dark:hover:text-white text-white bg-violet-600 dark:bg-violet-400 border-violet-600 dark:border-violet-400 border-2 cursor-pointer transition-all hover:text-violet-600  hover:bg-white dark:hover:bg-black">
          {loadingTraditional ? (
            <BeatLoader
              color={theme === DARK_THEME ? "white" : "black"}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Send Password Reset Link"
          )}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
