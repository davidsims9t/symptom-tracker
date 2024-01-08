import { useSignIn } from "@clerk/clerk-react";
import { OAuthStrategy } from "@clerk/types";
import { useCallback, useState } from "react";
import classes from "../assets/sign-in.module.css";

const SignIn = ({ setModalOpen }: { setModalOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const { isLoaded, signIn } = useSignIn();
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (!isLoaded) {
            return;
        }

        try {
            const result = await signIn.create({
                strategy: "password",
                transfer: false,
                identifier: emailAddress,
                password,
            });
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    const handleClose = useCallback(() => {
        setModalOpen(false);
    }, [setModalOpen]);

    const signInWith = (strategy: OAuthStrategy) => {
        return signIn?.authenticateWithRedirect({
          strategy,
          redirectUrl: "/sso-callback",
          redirectUrlComplete: "/",
        });
      };

    return (
        <div className={classes.signInModalWrapper} role="dialog">
            <div className={classes.signInModal}>
                <button onClick={handleClose}>Close</button>
                <h3>Sign In</h3>
                <div>
                    <button onClick={() => signInWith("oauth_google")} className={classes.signInBtn}>
                        Sign In With Google
                    </button>
                </div>
                <form>
                    <div>
                        <input placeholder="Enter email..." className={classes.input} onChange={(e) => setEmailAddress(e.target.value)} id="email" name="email" type="email" />
                    </div>
                    <div>
                        <input placeholder="Enter password..." className={classes.input} onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" />
                    </div>
                    <div className="flex justify-center">
                        <button className={classes.signInBtn} onClick={handleSubmit}>Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;