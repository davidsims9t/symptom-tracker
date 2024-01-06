import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    // @ts-ignore
    test: {
        environment: 'happy-dom'
    },
    plugins: [react()],
    root: "src"
});