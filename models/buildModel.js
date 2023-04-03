const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const buildSchema = new Schema(
  {
    buildName: {
      type: String,
      required: true,
    },
    chosenClass: {
      type: Schema.Types.Mixed,
      required: true,
    },
    stats: {
      type: Schema.Types.Mixed,
      required: true,
    },
    items: {
      type: Schema.Types.Mixed,
    },
    ammos: {
      type: Schema.Types.Mixed,
    },
    leftWeapons: {
      type: Schema.Types.Mixed,
    },
    rightWeapons: {
      type: Schema.Types.Mixed,
    },
    talismans: {
      type: Schema.Types.Mixed,
    },
    spells: {
      type: Schema.Types.Mixed,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Build", buildSchema);
