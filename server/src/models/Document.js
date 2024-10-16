const { Schema, model } = require("mongoose");

const DocumentSchema = new Schema(
  {
    _id: {
      type: String, // Specify the type as String for UUID
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = model("Document", DocumentSchema);
