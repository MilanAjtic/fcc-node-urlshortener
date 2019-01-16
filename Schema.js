const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
  original_url: String,
  short_url: Number
})
 
mongoose.model("Url", UrlSchema);
