const express= require('express');
const app = express();
const nunjucks=require('nunjucks');
const server=require('http').Server(app);
const io =require('socket.io')(server,{serveClient:true});
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/chat');
mongoose.Promise = require('bluebird');

app.get('/',(req,res) =>{
   res.render('index.html',{date:new Date()});
});
server.listen(3000,'0.0.0.0',()=>{
    console.log("server on");
});
nunjucks.configure('./client/views', {
    autoescape: true,
    express: app
});
app.use('/assets',express.static('./client/public'));
require('./sockets')(io);