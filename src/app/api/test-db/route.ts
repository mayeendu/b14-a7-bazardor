import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const uri = process.env.BETTER_AUTH_MONGODB_URL;
  if (!uri) {
    return NextResponse.json(
      { error: "Missing environment variable" },
      { status: 500 },
    );
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    // Ping the database to verify the connection is alive
    await client.db().command({ ping: 1 });
    return NextResponse.json({
      success: true,
      message: "Connected to MongoDB successfully!",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  } finally {
    await client.close();
  }
}
