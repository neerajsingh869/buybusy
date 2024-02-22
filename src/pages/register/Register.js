import { useRef } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useUserAuthContextValue } from "../../contexts/userAuthContext";
import styles from "./Register.module.css";

const Register = () => {
    const inputEmail = useRef();
    const inputPassword = useRef();
    const { setIsSignedIn } = useUserAuthContextValue();

    const auth = getAuth();

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            const email = inputEmail.current.value;
            const password = inputPassword.current.value;

            await createUserWithEmailAndPassword(auth, email, password);
            setIsSignedIn(true);
            console.log("User signed up successfully!")
        } catch (err) {
            alert(err.message);
            setIsSignedIn(false);
        }
    }

    return (
        <div className={ styles.formContainer }>
            <form onSubmit={ handleSignUp }>
                <h2>Sign Up</h2>
                <input type="email" placeholder="Enter Email" ref={ inputEmail } />
                <input type="password" placeholder="Enter Password" ref={ inputPassword } />
                <button>Sign Up</button>
            </form>
        </div>
    )
};

export default Register;