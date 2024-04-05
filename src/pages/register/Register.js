import { useRef, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useDispatch } from "react-redux";

import styles from "./Register.module.css";
import { userActions } from "../../redux/reducers/userReducer";
import { showNotification } from "../../utility/showNotifications";
import { provider } from "../../configs/firebase";

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

            showNotification('User signed in successfully!');
        } catch (err) {
            showNotification(err.message);

            dispatch(userActions.updateUserUid(null));
        } finally {
            setLoadingGoogle(false);
        }
    }

    const handleSignUp = async (e) => {
        e.preventDefault();

        setLoadingTraditional(true);

        try {
            const email = inputEmail.current.value;
            const password = inputPassword.current.value;

            const res = await createUserWithEmailAndPassword(auth, email, password);
            navigate("/");

            dispatch(userActions.updateUserUid(res.user.uid));

            showNotification('User signed up successfully!');
        } catch (err) {
            showNotification(err.message);

            dispatch(userActions.updateUserUid(null));
        } finally {
            setLoadingTraditional(false);
        }
    }

    return (
        <>
            <div className={ styles.formContainer }>
                <form onSubmit={ handleSignUp }>
                    <h2>Sign Up</h2>
                    <input type="email" placeholder="Enter Email" ref={ inputEmail } />
                    <input type="password" placeholder="Enter Password" ref={ inputPassword } />
                    <button>
                        { 
                            loadingTraditional ? <BeatLoader
                                color="white"
                                size={10}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /> : "Sign Up" 
                        }
                    </button>
                    <button 
                        type="button" 
                        onClick={ signInWithGoogle }>
                        { 
                            loadingGoogle ? <BeatLoader
                                color="white"
                                size={10}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /> : "Sign Up with Google" 
                        }
                    </button>
                </form>
            </div>
        </>
    )
};

export default Register;