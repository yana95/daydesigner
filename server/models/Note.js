const mongoose = require("mongoose") ;

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title     : { type: String, required: true},
    text      : { type: String },
    status      : { type: String, required: true },
    tasks      : { type: []},
    starred		: {type: Boolean},
    listId		:{type: String},
    date: {type: Date}
});

module.exports.model =  mongoose.model('Note', NoteSchema);
