const mongoose = require("mongoose");
const User = require("./user");

const selectionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  game_id: {
    type: Number,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    required: false,
    unique: true
  },
  time: {
    type: String,
    required: false,
    unique: true
  },
  selection: {
    type: String,
    required: true
  },
  is_Won: {
    type: Boolean,
    required: false
  },
  is_Push: {
    type: Boolean,
    required: false
  }
})

selectionSchema.pre("remove", async function (next) {
  try {
    let user = await User.findById(this.user);
    user.selections.remove(this.id)
    await user.save();
    return next()
  } catch (err) {
    return next(err)
  }
  // find user
  // remove the id of the message from their messages list
  // save that user
  // return next;

})

const Selection = mongoose.model("selection", selectionSchema)

module.exports = Selection;