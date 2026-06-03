import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import clubRoutes from "./routes/club.routes";
import eventRoutes from "./routes/event.routes";
import registrationRoutes from "./routes/registration.routes";
import { errorHandler } from "./middleware/error.middleware";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Base Greeting
app.get("/", (req, res) => {
  res.json({ message: "Club Management System API Online." });
});

// Routes
app.use("/clubs", clubRoutes);
app.use("/events", eventRoutes);
app.use("/registrations", registrationRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start Server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
