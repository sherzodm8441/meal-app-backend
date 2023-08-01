const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true},
        password: { type: String, required: true},
        favorites: [{
            recipeId: Number,
            fav: Boolean
        }],
        ratings: [{
            recipeId: Number,
            rating: Number
        }],
        createdAt: {
            type: Date,
            default: ()=> Date.now(),
            immutable: true
        }
    }
)

module.exports = mongoose.model("User", userSchema);