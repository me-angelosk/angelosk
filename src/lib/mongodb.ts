import { MONGODB_DB, MONGODB_URI } from "$env/static/private";
import { attachDatabasePool } from "@vercel/functions";
import { MongoClient, type MongoClientOptions } from "mongodb";

if (!MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

//@ts-ignore
const options: MongoClientOptions = {
  appName: "devrel.template.vercel-better-auth",
  maxIdleTimeMS: 5000,
};

export const client = new MongoClient(MONGODB_URI, options);

// Attach the client to ensure proper cleanup on function suspension.
// See https://vercel.com/blog/the-real-serverless-compute-to-database-connection-problem-solved
attachDatabasePool(client);

// Get the database instance for Better Auth
export async function getDatabase(dbName?: string) {
  return client.db(dbName || MONGODB_DB || "test");
}