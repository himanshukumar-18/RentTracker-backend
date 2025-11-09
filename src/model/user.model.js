import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        date: {
            type: String,
            required: true,
        },
        rentAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ["cash", "upi", "banktransfer", "other"], // optional validation
            trim: true,
        },
        proof: {
            type: String, // Cloudinary file URL
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
