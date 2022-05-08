//express
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
//mongodb + mongoose
const mongodbpw = 'mongodb+srv://moonhosting917:answldnr917!@cluster0.pe89p.mongodb.net/aboutmoon?retryWrites=true&w=majority';
const mongoose = require("mongoose");
const { Schema } = require('mongoose');
mongoose
.connect(mongodbpw)
.then(()=>console.log('MongoDB Connected...'))
.catch(err=>console.log(err))


//database
const UserSchema = new Schema({
  user_id: {
    required: true,
    // unique: true,
    type: String,
  },
  time: {
    required: true,
    type: String,
  },
  content: {
    required: true,
    type: String,
  },
})

const Users = mongoose.model("users", UserSchema);







//server
const http = require('http').createServer(app);
http.listen(8080, function () {
  console.log('listening on 8080')
}); 

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cors());

app.get('/', function(req, res){
    res.send("server on");
});

app.post('/chat', function(req, res){
  Users.find(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.send(users)
    }
  });
});

app.post('/addchat', function(req, res){
  const userInfo = new Users({
    user_id: "Anonymous",
    time: new Date().toLocaleString(),
    content: req.body.chat,
  });
  
  userInfo
  .save()
  .then(()=>console.log('Saved'))
  .catch(err=>console.log(err))
});







