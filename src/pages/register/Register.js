import { useRef } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useUserAuthContextValue } from "../../contexts/userAuthContext";

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
        <>
            <h2>Register Page</h2>
            <form onSubmit={ handleSignUp }>
                <input type="email" placeholder="Email" ref={ inputEmail } />
                <input type="password" placeholder="Password" ref={ inputPassword } />
                <button>Sign Up</button>
            </form>
        </>
    )
};

export default Register;