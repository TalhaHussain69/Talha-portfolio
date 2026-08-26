import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

/* =========================================
   PORTFOLIO SERVER HEALTH ENDPOINT
========================================= */

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        server: "Talha Portfolio Server",
        status: "Online & Ready",
        ai: "Local Frontend AI Engine Active"
    });
});

/* =========================================
   SERVE STATIC PORTFOLIO FILES
========================================= */

app.use(express.static(__dirname));

/* =========================================
   START SERVER
========================================= */

app.listen(PORT, () => {
    console.log(`
=========================================
       TALHA PORTFOLIO SERVER
=========================================

Server running at: http://localhost:${PORT}
Static Portfolio: http://localhost:${PORT}

=========================================
`);
});