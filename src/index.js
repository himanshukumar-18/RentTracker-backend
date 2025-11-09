import dotenv from "dotenv";
import DB from "./db/db.js";
import { app } from "./app.js";

// Load environment variables
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 5000;

// Start server
DB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✅ Server running at: http://localhost:${PORT}`);
        });

        // Handle server errors
        app.on("error", (err) => {
            console.error("❌ Server Error:", err.message);
            process.exit(1);
        });
    })
    .catch((err) => {
        console.error("❌ Database connection failed:", err.message);
        process.exit(1);
    });
