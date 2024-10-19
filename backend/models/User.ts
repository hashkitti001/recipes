import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
   "name": {
    "type": String,
    "unique": true,
    "required": true
    },
    "password": {
        "type": String,
        "required": true,
    },
    "email": {
        "type": "String",
        "required": true
    },
    "imageURL": {
        "type": "String",
        "required": false
    }
})

const User = mongoose.model("users", userSchema)
export default User
