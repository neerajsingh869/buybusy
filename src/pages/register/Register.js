import { useRef, useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { userActions } from "../../redux/reducers/userReducer";
import { showNotification } from "../../utility/showNotifications";

const Register = () => {
    const inputEmail = useRef();
    const inputPassword = useRef();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const auth = getAuth();

    const handleSignUp = async (e) => {
        e.preventDefault();

        setLoading(true);

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
            setLoading(false);
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
                            loading ? <BeatLoader
                                color="white"
                                size={10}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /> : "Sign Up" 
                        }
                    </button>
                </form>
            </div>
        </>
    )
};

export default Register;