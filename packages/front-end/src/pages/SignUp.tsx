import { useSignUp } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (!isLoaded) {
            return;
        }

        try {
            await signUp.create({
                emailAddress,
                password,
            });

            // send the email.
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            // change the UI to our pending section.
            setPendingVerification(true);
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    const onPressVerify = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (!isLoaded) return;

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });
            if (completeSignUp.status !== "complete") {
                /*  investigate the response, to see if there was an error
                 or if the user needs to complete more steps.*/
                console.log(JSON.stringify(completeSignUp, null, 2));
            }
            if (completeSignUp.status === "complete") {
                await setActive({ session: completeSignUp.createdSessionId })
                navigate("/");
            }
        } catch (err: any) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <div>
            {!pendingVerification && (
                <form>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input onChange={(e) => setEmailAddress(e.target.value)} id="email" name="email" type="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" />
                    </div>
                    <button onClick={handleSubmit}>Sign up</button>
                </form>
            )}
            {pendingVerification && (
                <div>
                    <form>
                        <input
                            value={code}
                            placeholder="Code..."
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <button onClick={onPressVerify}>
                            Verify Email
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default SignIn;