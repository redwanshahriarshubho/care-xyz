import clientPromise from "./mongodb";

async function test() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const collections = await db.listCollections().toArray();
    console.log("Connected to MongoDB. Collections:", collections);
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

test();
