const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const Monster = Schema({
  //Unique id created automatically by the mongoose
  monsterName:{ type: String, required: true, default : false},
  email:{ type: String, required: true, default : false, unique:true},
  password:{ type: String, required: true, default : false},
  role: { type: String, required: true, default : false},
  createdAt: { type: Date, required: true, default :false},
  friends: { type: [Schema.Types.ObjectId], required: false}
});

Monster.plugin(uniqueValidator);
module.exports = mongoose.model("monster", Monster);