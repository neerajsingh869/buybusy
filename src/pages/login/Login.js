import { useRef, useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
// import { useUserAuthContextValue } from "../../contexts/userAuthContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { BeatLoader } from "react-spinners";
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/reducers/userReducer";

const Login = () => {
    const inputEmail = useRef();
    const inputPassword = useRef();
    // const { setIsSignedIn, setUserUid } = useUserAuthContextValue();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const auth = getAuth();

    const handleSignIn = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const email = inputEmail.current.value;
            const password = inputPassword.current.value;

            const res = await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
            // setIsSignedIn(true);
            // setUserUid(res.user.uid);
            // dispatch(userActions.changeSignedInStatus(true));
            dispatch(userActions.updateUserUid(res.user.uid));

            toast.success('User signed in successfully!', {
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

            // setIsSignedIn(false);
            // dispatch(userActions.changeSignedInStatus(false));
            dispatch(userActions.updateUserUid(null));
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className={ styles.formContainer }>
                <form onSubmit={ handleSignIn }>
                    <h2>Sign In</h2>
                    <input type="email" placeholder="Enter Email" ref={ inputEmail } />
                    <input type="password" placeholder="Enter Password" ref={ inputPassword } />
                    <button>
                        { 
                            loading ? <BeatLoader
                                color="white"
                                size={10}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /> : "Sign In" 
                        }
                    </button>
                    <Link to="/signup">Or SignUp instead</Link>
                </form>
            </div>
        </>
    )
};

export default Login;