const mongoose = require("mongoose") ;
const Note = require('../models/Note');
const List = require('../models/List');
const ObjectID = require('mongodb').ObjectID;


module.exports = {
    setUpConnection: function setUpConnection() {
        mongoose.connect(`mongodb://admin:06022011@ds127341.mlab.com:27341/application`);
    },

    listNotes: function(id) {
        return Note.model.find();
    },

    createNote: function(data) {
        var con = mongoose.connection;

        const note = new Note.model({
            title: data.title,
            text: data.text,
            tasks: data.tasks,
            status: data.status,
            starred: data.starred,
            listId: data.listId
        });
        
        return con.collection('notes').insert(note);
    },

    deleteNote: function(id) {
        return Note.model.findById(id).remove();
    },

    checkNote: function(id){
        console.log(typeof id);
        return Note.model.findById(id, function (err, note) {
          if(note.status != "done"){
            note.status = 'done';
          }
          else{
            note.status = 'todo';
          }
          return note.save();
        });
    },

    editNote: function(id, data){
        return Note.model.findById(id, function (err, note) {
            note.title = data.title;
            note.text = data.text;
            note.tasks = data.tasks;
            note.status = data.status;
            note.starred = data.starred;
            note.listId = data.listId;
            return note.save();
        });
    },

    listLists: function(id) {
        return List.model.find();
    },

    createList: function(data) {
        var con = mongoose.connection;

        const list = new List.model({
            title: data.title,
            edit: true
        });
        
        return con.collection('lists').insert(list);
    },
}

