const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const levelSchema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      default: null,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      default: null,
      unique: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Level = mongoose.model("Level", levelSchema);

module.exports = Level;
