import { useAuth, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { useState } from "react";
import classes from "../assets/nav.module.css";
import SignIn from "./SignIn";

const Navbar = () => {
    const { isSignedIn, isLoaded, signOut } = useAuth();
    const { user } = useUser();
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <nav className={classes.nav}>
            <div className={classes.logo}>
                Logo
            </div>
            <div className="flex gap-2 items-center">
                {isSignedIn && isLoaded && (
                    <>
                        <Link to="/" className={classes.navBtn}>
                            Dashboard
                        </Link>
                        <button onClick={() => signOut()} className={classes.navBtn}>
                            Sign Out
                        </button>
                        {user?.hasImage && (
                            <img src={user.imageUrl} alt={user.username || "Unknown Image"} />
                        )}
                    </>
                )}
                {!isSignedIn && isLoaded && (
                    <button onClick={() => setModalOpen(true)} className={classes.navBtn}>
                        Sign In
                    </button>
                )}
            </div>
            {isModalOpen && createPortal(<SignIn setModalOpen={setModalOpen} />, document.body)}
        </nav>
    );
};

export default Navbar;