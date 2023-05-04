const mongoose = require("mongoose");
const { isEmail } = require("validator");

const adminSchema = mongoose.Schema(
  {
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, required: true, unique: true, validate: [isEmail] },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
