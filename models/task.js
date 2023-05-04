const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const taskSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    assign: { type: ObjectId, ref: "Admin" },
    priority: { type: String },
    deadline: { type: String },
    step: { type: ObjectId, ref: "Step", require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
