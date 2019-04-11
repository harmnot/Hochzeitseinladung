const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const brideSchema = new Schema(
  {
    name_male: {
      type: String,
      required: [true, "please fill your partner name"]
    },
    name_female: {
      type: String,
      required: [true, "please fill your partner name"]
    },
    wedding_date: {
      type: Date,
      required: [true, "please fill your wedding date"]
    },
    time_at: {
      type: Date,
      required: [true, "please fill your wedding time"]
    },
    location: {
      type: String,
      required: [true, "where is your wedding at ?"]
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Bride = mongoose.model("Bride", brideSchema);

module.exports = Bride;
