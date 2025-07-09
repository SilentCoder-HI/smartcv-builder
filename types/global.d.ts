// types/global.d.ts
import { MongoClient } from "mongodb"

declare global {
  // Add the custom type to globalThis
  var _mongoClientPromise: Promise<MongoClient> | undefined
}
