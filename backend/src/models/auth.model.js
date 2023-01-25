const mongoose = require("mongoose");

const AuthSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  code: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("Auth", AuthSchema);
module.exports = User;
