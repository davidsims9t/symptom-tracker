import { useState } from "react";
// import Drawer from "./Drawer.jsx";
import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import classes from "../assets/nav.module.css";

const Navbar = () => {
    const [state, setState] = useState({
        isOpen: false
    });

    const clerk = useClerk();

    return (
        <div className={classes.nav}>
            Test
        </div>
    );
};

export default Navbar;