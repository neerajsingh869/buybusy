import { useRef } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useUserAuthContextValue } from "../../contexts/userAuthContext";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
    const inputEmail = useRef();
    const inputPassword = useRef();
    const { setIsSignedIn } = useUserAuthContextValue();
    const navigate = useNavigate();

    const auth = getAuth();

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            const email = inputEmail.current.value;
            const password = inputPassword.current.value;

            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
            setIsSignedIn(true);
            console.log("User signed in successfully!")
        } catch (err) {
            alert(err.message);
            setIsSignedIn(false);
        }
    }

    return (
        <div className={ styles.formContainer }>
            <form onSubmit={ handleSignIn }>
                <h2>Sign In</h2>
                <input type="email" placeholder="Enter Email" ref={ inputEmail } />
                <input type="password" placeholder="Enter Password" ref={ inputPassword } />
                <button>Sign In</button>
                <Link to="/signup">Or SignUp instead</Link>
            </form>
        </div>
    )
};

export default Login;