const mongoose = require("mongoose") ;

const Schema = mongoose.Schema;

const ListSchema = new Schema({
    title     : { type: String, required: true},
    edit: {type: Boolean}
});

module.exports.model =  mongoose.model('List', ListSchema);
