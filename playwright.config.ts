import { defineConfig, devices } from "@playwright/test"

export default defineConfig({
    testDir: "./tests",

    use: {
        baseURL: "http://localhost:3000",
        ...devices["Desktop Chrome"],
    },

    webServer: {
        command: "NODE_ENV=test npm run dev",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
    },
})
