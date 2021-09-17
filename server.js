'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const server = express();
server.use(cors());


//  To acess the data if the rsult undifend i must to add the below code 
server.use(express.json());

const PORT = process.env.PORT || 3001;


// use MongoDS
// getting-started.js
const mongoose = require('mongoose');


let modelBook;
main().catch(err => console.log(err));

async function main() {

  // update 1
  //await mongoose.connect( 'mongodb://localhost:3010/Book');

await mongoose.connect(process.env.MONGOURL);

  const BookSchema = new mongoose.Schema({
    // name: String
    // the basic structure for object
    BookName: String,
    Status: String,
    email: String,
    Description: String

  });

 // name of model any name
  // conect with model  use model methods
  // conect 2 schema 3.compile sechema with model
  // must same name  show collections in terminal not shahed 

  modelBook = mongoose.model('Book', BookSchema);
  // seeding data  inital data 
  // data i want to insert 
//   BookInfo();

}



async function BookInfo() {

  const book1 = new modelBook({
    BookName: 'Art',
    Status: 'open',
    email: 'shahdalkhatib95@gmail.com',
    Description:'Book about the art in The past'
  });
  const book2 = new modelBook({
    BookName: 'Math',
    Status: 'closed',
    email: 'shahdalkhatib95@gmail.com',
    Description:'Book about the Math opreation'
  });
  const book3 = new modelBook({
    BookName: 'Arabic',
    Status: 'open',
    email: 'shahdalkhatib95@gmail.com',
    Description:'Book about the Arabic Languge and grammers'
  });
  // we use save method to save data 

  await book1.save();
  await book2.save();
  await book3.save();
}






//Routs

server.get('/', homeHandler)
server.get('/getBook',getBookHandler)
// Deal with POST 
// use POST  i must to use it in front end and the back end also
server.post('/addBook',addBookHandler);
server.delete('/deleteBook/:id',deleteBookHandler);
server.put('/updateBook/:id',updateBookHandler);




function homeHandler(req,res){

  res.send('Welcome to the Home Page-- shahed say Welcome visiter  (:');
}

function getBookHandler(r,resp){

// send fav cat list {email}
// i need get the email
const email= r.query.email;
modelBook.find({email:email},(err,result)=>{
if(err){

  console.log(err);
}

else{

resp.send(result);

}
}

)


}




async function addBookHandler(a,b){
// we need data 
// this consolr below will be empty becouse the POST data in the body not in the QSP
console.log(a.query);
// if i use the get will print but in the post Not 
// The POST exist in Requst Preload
// the data in the POST will be in the Body 
// we need to add one line to acces the bosy in JSON 
// the first time will give undifiend  to acess for first time in must to add 
// server.use(express.json())

console.log(a.body);
// use the destructure   the name must match the data that exisit in body 
// the name must match name of var came from the front end model
const{BookName,Description,Status,email}=a.body;
// creat a new model save it in DB
await  modelBook.create({

  BookName:BookName,
  Description:Description,
  Status:Status,
  email:email

});
// theNewBook.save();
// b.json(theNewBook);

modelBook.find({email:email},(err,result)=>{
  if(err){
    console.log(err);
  }
  else{
  console.log(result);
  }
  
  
  })

}

// for open  mogon shell


// server.get('/test', (request, response) => {

//   response.send('test request received')

// })






//Func Handler for Delete 
 function deleteBookHandler(a,b){
// delete better than  remove  becouse the delete remove multiple data

const bookId=a.params.id;
const email=a.query.email;
modelBook.deleteOne({_id:bookId},(err,result)=>{
// it will return error or result
//console.log(result);
modelBook.find({email:email},(err,result)=>{
if(err){
  console.log(err);
}
else{
console.log(result);
}


})


})



 }






 function updateBookHandler(req,res) {
  const id = req.params.id;
  const {BookName,Description,email,Status} = req.body;
  
  modelBook.findByIdAndUpdate(id,{BookName,Status,Description},(err,result)=>{
      modelBook.find({ownerEmail:email},(err,result)=>{
          if(err)
          {
              console.log(err);
          }
          else
          {
              res.send(result);
          }
      })
  })
}


server.listen(PORT, () => console.log(`listening on ${PORT}`));
