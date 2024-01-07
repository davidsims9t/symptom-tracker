import { useState } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
// import Drawer from "./Drawer.jsx";
import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import { Button } from "@mui/material";

const Navbar = () => {
    const [state, setState] = useState({
        isOpen: false
    });

    const clerk = useClerk();

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setState({isOpen: true})}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Easy Test
                    </Typography>
                    <SignedIn>
                        <Button variant="text" color="secondary" onClick={() => clerk.signOut({})}>
                            Sign Out
                        </Button>
                    </SignedIn>
                    <SignedOut>
                        <Button variant="text" color="secondary" onClick={() => clerk.openSignIn({})}>
                            Sign In
                        </Button>
                    </SignedOut>
                </Toolbar>
            </AppBar>

            {/* <Drawer isOpen={state.isOpen} setState={setState} /> */}
        </>
    );
};

export default Navbar;