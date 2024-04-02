import { useRef, useState } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { BeatLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/reducers/userReducer";
import { showNotification } from "../../utility/showNotifications";

const Login = () => {
    const inputEmail = useRef();
    const inputPassword = useRef();
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

            dispatch(userActions.updateUserUid(res.user.uid));

            showNotification('User signed in successfully!');
        } catch (err) {
            showNotification(err.message);

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