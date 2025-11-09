import mongoose from "mongoose"
import { DB_NAME } from "../constant.js"

const connecting = async () => {
    try {
        const conn = await mongoose.connect(`${process.env.DB}/${DB_NAME}`)
        console.log(`✅ MongoDB Connected : ${conn.connection.host}`)
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`)
        process.exit(1)
    }
}

export default connecting;