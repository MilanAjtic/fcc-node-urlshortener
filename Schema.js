const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require('shortid');

const UrlSchema = new Schema({
  _id: {
    type: String,
    'default': shortid.generate
  },
  original_url: String,
})
 
mongoose.model("Url", UrlSchema);
