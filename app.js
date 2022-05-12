const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactdance');
}
const port = 80;
// define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    concern: String,
  });

var contact = mongoose.model('contact', contactSchema);



// EXPRES SPECIFIC CODE
app.use('/static', express.static('static'));//for serving static files
app.use(express.urlencoded());

// PUG SPECIFIC CODE
app.set('view engine','pug');//set template engine as pug
app.set('views', path.join(__dirname,'views'))//set the views directory


//ENDPOINT
app.get('/',(req,res)=>{
    const param = {};
    res.status(200).render('home.pug',param);
})
app.get('/contact',(req,res)=>{
    const param = {};
    res.status(200).render('contact.pug',param);

})

app.post('/contact',(req,res)=>{
  var mydata = new contact(req.body);
  mydata.save().then(()=>{
  res.send("this item has been saved in the database")
  })
  .catch(()=>{
    res.status(400).send("item was not saved to the database")
  })

})

//STARTING THE SERVER
app.listen(port, ()=>{
    console.log(`Starting the application sucessfuly on port ${port}. `)
});