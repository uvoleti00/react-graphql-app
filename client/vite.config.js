import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react'
import TSConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [tailwindcss(),React(), TSConfigPaths()],
    test: {
        globals: true,
        environment: 'jsdom'
    }
})