import { useRef } from "react";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useUserAuthContextValue } from "../../contexts/userAuthContext";

const Login = () => {
    const inputEmail = useRef();
    const inputPassword = useRef();
    const { setIsSignedIn } = useUserAuthContextValue();

    const auth = getAuth();

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            const email = inputEmail.current.value;
            const password = inputPassword.current.value;

            await signInWithEmailAndPassword(auth, email, password);
            setIsSignedIn(true);
            console.log("User signed in successfully!")
        } catch (err) {
            alert(err.message);
            setIsSignedIn(false);
        }
    }

    return (
        <>
            <h2>Login Page</h2>
            <form onSubmit={ handleSignIn }>
                <input type="email" placeholder="Email" ref={ inputEmail } />
                <input type="password" placeholder="Password" ref={ inputPassword } />
                <button>Sign In</button>
            </form>
        </>
    )
};

export default Login;