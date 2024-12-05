import mongoose from 'mongoose'
require("dotenv").config()

async function dbConnect() {
    try {
        const dbString = process.env.DB_STRING
        await mongoose.connect(dbString!)
        console.log("Connected to MongoDB database successfully!")
    } catch (e) {
        console.error("Failed to connect to the database server because", e)
        process.exit(1)
    }

}
export default dbConnect;