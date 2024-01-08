import { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import Navbar from "./components/Navbar";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import "normalize.css";
import Provider from "./components/Provider";
import Loader from "./components/Loader";
import "./assets/global.css";

const Home = lazy(() => import('./pages/Home'));
const SignIn = lazy(() => import('./components/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export const App = () => {
    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <Provider>
                <BrowserRouter>
                    <Navbar />
                    <Suspense fallback={<Loader />}>
                        <Routes>
                            <Route index element={<Home />} />
                            <Route path="/sign-in" element={<SignIn />} />
                            <Route path="/sign-up" element={<SignUp />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </Provider>
        </ClerkProvider>
    );
};

const container = document.querySelector('#app');
const root = ReactDOM.createRoot(container!);
root.render(<App />);