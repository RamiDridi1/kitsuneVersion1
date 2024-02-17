const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ReviewSchema = new schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

module.exports = Review = mongoose.model("Reviews", ReviewSchema);
