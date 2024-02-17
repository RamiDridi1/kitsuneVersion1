// models/user.js

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
    name: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        default: "user", 
        enum: ["user", "admin"], 
    },
});

module.exports = User = mongoose.model("Users", UserSchema);

