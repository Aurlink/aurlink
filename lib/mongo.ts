// lib/mongo.ts
import { MongoClient } from 'mongodb'

if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI not defined')

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)
let db: any = null

export async function getDb() {
  if (db) return db
  await client.connect()
  db = client.db('aurlink')
  return db
}
