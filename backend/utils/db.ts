import mongoose from 'mongoose'
require("dotenv").config()

async function dbConnect() {
    try {
        // const dbString = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
        const dbString = "mongodb://localhost:27017/recipes"
        await mongoose.connect(dbString)
        console.log("Connected to MongoDB database successfully!")
    } catch (e) {
        console.error("Failed to connect to the database server because", e)
        process.exit(1)
    }

}
export default dbConnect;