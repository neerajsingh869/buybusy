import { useContext, useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

import { userActions } from "../redux/slices/userSlice";
import { showNotification } from "../utility/showNotifications";
import { provider } from "../configs/firebase";
import googleLogo from "../assets/google.png";
import { cartActions, cartSelector } from "../redux/slices/cartSlice";
import { updateCartAndSaveIntoDatabase } from "../utility/updateCartAndSaveIntoDatabase";
import { useAppDispatch, useAppSelector } from "../hook";
import { DARK_THEME } from "../constants";
import { ThemeContext } from "../contexts/themeContext";

const Register = () => {
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputPassword = useRef<HTMLInputElement>(null);

  const [loadingTraditional, setLoadingTraditional] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const theme = useContext(ThemeContext);

  const { cart } = useAppSelector(cartSelector);

  const auth = getAuth();

  const signInWithGoogle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setLoadingGoogle(true);

    try {
      const res = await signInWithPopup(auth, provider);
      navigate("/");

      const updatedCart = await updateCartAndSaveIntoDatabase(
        res.user.uid,
        cart
      );

      dispatch(cartActions.replaceOrders(updatedCart));
      dispatch(userActions.updateUserUid(res.user.uid));

      showNotification("User signed in successfully!", "success", theme);
    } catch (err: unknown) {
      if (err instanceof Error) {
        showNotification(err.message, "error", theme);
      } else {
        showNotification("An unknown error occurred.", "error", theme);
      }

      dispatch(userActions.updateUserUid(null));
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoadingTraditional(true);

    try {
      const email = inputEmail.current ? inputEmail.current.value : "";
      const password = inputPassword.current ? inputPassword.current.value : "";

      const res = await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");

      const updatedCart = await updateCartAndSaveIntoDatabase(
        res.user.uid,
        cart
      );

      dispatch(cartActions.replaceOrders(updatedCart));
      dispatch(userActions.updateUserUid(res.user.uid));

      showNotification("User signed up successfully!", "success", theme);
    } catch (err: unknown) {
      if (err instanceof Error) {
        showNotification(err.message, "error", theme);
      } else {
        showNotification("An unknown error occurred.", "error", theme);
      }

      dispatch(userActions.updateUserUid(null));
    } finally {
      setLoadingTraditional(false);
    }
  };

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <form className="w-80 flex flex-col p-4 gap-4" onSubmit={handleSignUp}>
          <h2 className="text-dark dark:text-white font-extrabold text-4xl my-4">
            Sign Up
          </h2>
          <input
            className="border border-solid border-violet-600 outline-none h-12 rounded-lg p-3 text-lg"
            type="email"
            placeholder="Enter Email"
            ref={inputEmail}
          />
          <input
            className="border border-solid border-violet-600 outline-none h-12 rounded-lg p-3 text-lg"
            type="password"
            placeholder="Enter Password"
            ref={inputPassword}
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
              "Sign Up"
            )}
          </button>
          <div className="flex justify-center align-center">
            <span className="m-3 w-1/2 border-solid border-neutral-400 border-y ml"></span>
            <span className="text-black dark:text-white">OR</span>
            <span className="m-3 w-1/2 border-solid border-neutral-400 border-y ml"></span>
          </div>
          <button
            className="h-12 rounded-xl text-lg shadow-md dark:text-black dark:hover:text-white text-white bg-violet-600 dark:bg-violet-400 border-violet-600 dark:border-violet-400 border-2 cursor-pointer transition-all hover:text-violet-600  hover:bg-white dark:hover:bg-black"
            type="button"
            onClick={signInWithGoogle}
          >
            {loadingGoogle ? (
              <BeatLoader
                color={theme === DARK_THEME ? "white" : "black"}
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={googleLogo}
                  alt="Google Logo"
                  style={{
                    width: "24px",
                    marginRight: "8px",
                    objectFit: "contain",
                  }}
                />
                <span>Continue Using Google</span>
              </div>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
