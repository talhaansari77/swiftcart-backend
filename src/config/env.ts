import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: process.env.PORT || "5005",
  mongoUri: process.env.MONGO_URI || "",
  jwtSecret: process.env.JWT_SECRET || "",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
};

if (!env.mongoUri) {
  throw new Error("MONGO_URI is missing in environment variables");
}

if (!env.jwtSecret) {
  throw new Error("JWT_SECRET is missing in environment variables");
}