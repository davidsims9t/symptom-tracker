import { useSignUp } from "@clerk/clerk-react";
import { useState } from "react";

const SignIn = () => {
    const { isLoaded, signUp, setActive } = useSignUp();
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    
    return (

    );
};

export default SignIn;