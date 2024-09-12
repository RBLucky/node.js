
const mongoose = require("mongoose");
const { Schema } = mongoose; // Not own package but a feature
const userSchema = new Schema({
    name: {
        first: {
            type: String,
            trim: true // Remove whitespace
        },
        last: {
            type: String,
            trim: true
        }
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    zipCode: { // Must be 5 digits
        type: Number,
        min: [1000, "Zip code too short"],
        max: 99999
    },
    password: {
        type: String,
        required: true
    },
    courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    subscribedAccount: { type: Schema.Types.ObjectId, ref: "Subscriber" }
}, {
    // Tracks creation/Update time
    timestamps: true
});