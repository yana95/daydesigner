const express        = require('express');
const cors = require('cors') ;
const bodyParser     = require('body-parser');
const port = 8000;
const Actions = require("./utils/DataBaseUtils");
const db             = require('./config/db');
const app            = express();

Actions.setUpConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

// RESTful api handlers
app.get('/notes', (req, res) => {
    Actions.listNotes().then(data => res.send(data));
});

app.post('/notes', (req, res) => {
    Actions.createNote(req.body).then(data => {res.send(data);});
});

app.put('/notes/check/:id', (req, res) =>{
  Actions.checkNote(req.params.id).then(data => {res.send(data);});
});

app.put('/notes/:id', (req, res) =>{
  Actions.editNote(req.body.id, req.body.data).then(data => {res.send(data);});
});

app.delete('/notes/:id', (req, res) => {
    Actions.deleteNote(req.params.id).then(data => res.send(data));
});

app.get('/lists', (req, res) => {
    Actions.listLists().then(data => res.send(data));
});

app.post('/lists', (req, res) => {
     Actions.createList(req.body).then(data => {res.send(data);});
});

const server = app.listen(port, function() {
    console.log(`Server is up and running on port ${port}`);
});

/*

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err);
  require('./app/routes')(app, database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });               
})*/