import { MongoClient } from "./deps.ts";
//hqHOSL3XfjtK8ey5
const client = new MongoClient();
client.connectWithUri(Deno.env.get("MONGODB_URI") || " ");

const db = client.database("JussmorDB");

export const usersCollection = db.collection("users");
export const surveyCollection = db.collection("survey");
