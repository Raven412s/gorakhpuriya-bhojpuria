import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in environment variables");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents creating multiple connections.
 */
interface MongooseGlobal {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// eslint-disable-next-line no-var
declare global {
  var mongoose: MongooseGlobal | undefined;
}

const cached: MongooseGlobal = global.mongoose ?? {
  conn: null,
  promise: null,
};

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI as string, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  global.mongoose = cached;

  return cached.conn;
}
