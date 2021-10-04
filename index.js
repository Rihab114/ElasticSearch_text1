
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
  const port = 8080

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.locals.data = "";



app.post('/search', function(req,next){
  var item = req.body.tagToSearch;
  req.app.locals.data = item;



})
  // charger la page html
  app.get('/',function(req,res) {
    res.sendFile(__dirname +'/search.html');
  });

// defenir le contenu de route /search
app.get('/search', function (req, res){
  client.search({

    index : 'flickrphotos3',
    body: {"size" : 4000 ,


    "query": {"fuzzy": {"tags":  req.app.locals.data }}}
 

    
}) .then(req => {
  res.send(req.body.hits.hits);
  console.log(req.body.hits.hits);
})
    

}, function (err) {
console.trace(err.message);
});


//app.post('/search', function(req,next){
  //var item = req.body.tagToSearch;
  //console.log(item)
//});


  



  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })



  module.exports = app;
