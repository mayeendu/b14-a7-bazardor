import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

// Ensure your .env file has this exact variable name,
// or change it to match your actual env variable (e.g., process.env.MONGODB_URI)
const connectionString = process.env.BETTER_AUTH_MONGODB_URL as string;

const client = new MongoClient(connectionString);
const db = client.db();

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
