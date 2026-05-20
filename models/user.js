import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        firstName:{
            type: String,
            required: true,
        },
        lastName:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true,
        },
        isadmin:{
            type: Boolean,
            required: true,
            default: false
        },
        isblocked:{
            type: Boolean,
            required: true,
            default: false
        },
        isemailverified:{
            type: Boolean,
            required: true,
            default: false
        },
        image:{
            type: String,
            required: true,
            default:"images/default.png"
        }
    }
)
const User = mongoose.model("User", userSchema)

export default User