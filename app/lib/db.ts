import mongoose from 'mongoose'

const connection = {}
export async function connectDB() {
  if (connection.isConnected) return
  const db = await mongoose.connect(process.env.MONGO_URI!)
  connection.isConnected = db.connections[0].readyState
}

const PurchaseSchema = new mongoose.Schema({
  walletAddress: String,
  type: String,
  amount: Number,
  status: String,
  proofUrl: String,
  tx_ref: String,
  createdAt: { type: Date, default: Date.now },
})

export const Purchase = mongoose.models.Purchase || mongoose.model('Purchase', PurchaseSchema)

export async function savePaymentRecord(data) {
  await connectDB()
  return Purchase.create(data)
}

export async function creditUser(walletAddress, amount) {
  await connectDB()
  await Purchase.updateOne({ walletAddress, status: 'pending' }, { status: 'credited', amount })
}
