import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    envDir: "../.",
    plugins: [
        react(),
        VitePWA({
            registerType: "prompt",
            includeAssets: [
                "favicon.ico",
                "apple-touch-icon.png",
                "masked-icon.svg",
            ],
            manifest: {
                name: "Блог",
                short_name: "Блог",
                description: "Блог",
                theme_color: "#333",
                start_url: "/",
                icons: [],
            },
        }),
    ],
});
