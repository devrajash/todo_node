const express = require('express');
const bodyParser = require("body-parser");
const port=3000
const app = express()

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv:/', {useNewUrlParser: true,useUnifiedTopology: true});


const todoschema = new mongoose.Schema({
  items: String,
})

const todotask = mongoose.model('todolist',todoschema)



app.get('/', function(req, res) {
  todotask.find(function (err,todolists) {
    if (err){console.log(err)}
    else{
      res.render(__dirname+"/todolist",{z:todolists});
    }

  })

})

app.post('/delete',function (req,res) {
  todotask.deleteOne({ items: req.body.checkbox }, function (err) {
    if(err){console.log(err)}
    else{
      console.log('deleted')
      res.redirect('/')
  }
  });
})

app.post('/', function(req, res) {
  let y = req.body.input
  if(y!==''){
    let x=new todotask({
      items:y,
    })
    x.save()
  }
  else{
    x=x

  }

  res.redirect('/')
})








app.listen(process.env.PORT||3000, () => console.log(`Example app listening at http://localhost:${port}`))
