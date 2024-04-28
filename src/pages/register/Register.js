import { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useDispatch } from "react-redux";

import { userActions } from "../../redux/reducers/userReducer";
import { showNotification } from "../../utility/showNotifications";
import { provider } from "../../configs/firebase";
import googleLogo from "../../assets/google.png";

const Register = () => {
  const inputEmail = useRef();
  const inputPassword = useRef();
  const dispatch = useDispatch();
  const [loadingTraditional, setLoadingTraditional] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth();

  const signInWithGoogle = async (e) => {
    e.preventDefault();

    setLoadingGoogle(true);

    try {
      const res = await signInWithPopup(auth, provider);
      navigate("/");

      dispatch(userActions.updateUserUid(res.user.uid));

      showNotification("User signed in successfully!");
    } catch (err) {
      showNotification(err.message);

      dispatch(userActions.updateUserUid(null));
    } finally {
      setLoadingGoogle(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    setLoadingTraditional(true);

    try {
      const email = inputEmail.current.value;
      const password = inputPassword.current.value;

      const res = await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");

      dispatch(userActions.updateUserUid(res.user.uid));

      showNotification("User signed up successfully!");
    } catch (err) {
      showNotification(err.message);

      dispatch(userActions.updateUserUid(null));
    } finally {
      setLoadingTraditional(false);
    }
  };

  return (
    <>
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <form className="w-80 flex flex-col p-4 gap-4" onSubmit={handleSignUp}>
          <h2 className="text-sky-950 font-extrabold text-4xl my-4">Sign Up</h2>
          <input className="border border-solid border-violet-600 outline-none h-12 rounded-lg p-3 text-lg" type="email" placeholder="Enter Email" ref={inputEmail} />
          <input
            className="border border-solid border-violet-600 outline-none h-12 rounded-lg p-3 text-lg"
            type="password"
            placeholder="Enter Password"
            ref={inputPassword}
          />
          <button className="bg-violet-600 text-white border-none h-10 rounded-xl text-lg shadow-md shadow-slate-400">
            {loadingTraditional ? (
              <BeatLoader
                color="white"
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
            OR
            <span className="m-3 w-1/2 border-solid border-neutral-400 border-y ml"></span>
          </div>
          <button className="bg-violet-600 text-white border-none h-10 rounded-xl text-lg shadow-md shadow-slate-400" type="button" onClick={signInWithGoogle}>
            {loadingGoogle ? (
              <BeatLoader
                color="white"
                size={10}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItem: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={googleLogo}
                  alt="Google Logo"
                  style={{
                    width: "20px",
                    marginRight: "8px",
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
