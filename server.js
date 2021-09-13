'use strict';


const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

// use MongoDS
// getting-started.js
const mongoose = require('mongoose');
let modelBook;



main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/Book');

  const BookSchema = new mongoose.Schema({
    // name: String
    // the basic structure for object
    title: String,
    status: String,
    email: String,
    description: String

  });

 // name of model any name
  // conect with model  use model methods
  // conect 2 schema 3.compile sechema with model
  // must same name  show collections in terminal not shahed 

  modelBook = mongoose.model('Book', BookSchema);
  // seeding data  inital data 
  // data i want to insert 
   BookInfo();

}



async function BookInfo() {

  const book1 = new modelBook({
    title: 'Art',
    status: 'open',
    email: 'shahdalkhatib95@gmail.com',
    description:'Book about the art in The past'
  });
  const book2 = new modelBook({
    title: 'Math',
    status: 'closed',
    email: 'shahdalkhatib95@gmail.com',
    description:'Book about the Math opreation'
  });
  const book3 = new modelBook({
    title: 'Arabic',
    status: 'open',
    email: 'shahdalkhatib95@gmail.com',
    description:'Book about the Arabic Languge and grammers'
  });
  // we use save method to save data 

  await book1.save();
  await book2.save();
  await book3.save();
}


const server = express();
server.use(cors());



//Routs

server.get('/', homeHandler)

function homeHandler(req,res){

  res.send('Welcome to the Home Page-- shahed say Welcome visiter  (:');
}


server.get('/getBook',getBookHandler)


function getBookHandler(r,resp){

// send fav cat list {email}
// i need get the email
const email= r.query.email;
modelBook.find({ownerOfemail:email},(err,result)=>{
if(err){

  console.log(err);
}

else{

resp.send(result);

}
}

)


}


// for open  mogon shell


server.get('/test', (request, response) => {

  response.send('test request received')

})

server.listen(PORT, () => console.log(`listening on ${PORT}`));
