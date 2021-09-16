'use strict';
import server from './server'

const mongoose = require('mongoose');


let modelBook;
main().catch(err => console.log(err));

async function main() {

  // update 1
  //await mongoose.connect( 'mongodb://localhost:27017/Book');

await mongoose.connect(process.env.MONGOURL);

  const BookSchema = new mongoose.Schema({
    // name: String
    // the basic structure for object
    BookName: String,
    Status: String,
    email: String,
    Description: String

  });
  
  modelBook = mongoose.model('Book', BookSchema);
  // seeding data  inital data 
  // data i want to insert 
// BookInfo();

}
