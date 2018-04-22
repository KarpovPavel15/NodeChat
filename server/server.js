const express= require('express');
const app=express();
//const http=require("http")
const  nunjucks=require('nunjucks');
const server=require('http').Server(app);
const io =require('socket.io')(server,{serveClient:true});
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/chat2',{});
mongoose.Promise=require('bluebird');

app.get('/',(req,res) =>{
   res.render('index.html',{date:new Date()});
});

/*http.createServer(function(request, response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end();
    console.log("server on");
}).listen(3000);*/
server.listen(3000,'0.0.0.0',()=>{
   console.log("server on");
});
nunjucks.configure('./client/views', {
    autoescape: true,
    express: app
});
app.use('/assets',express.static('./client/public'));

io.on('connection', function (socket) {
socket.emit('connected',"U connected");
socket.join('all');
socket.on('msg',content=>{
    console.log("msg",content);
    const obj={
        date:new Date(),
        content:content,
        username:socket.id
    };
    socket.emit("message",obj);
    socket.to('all').emit("message",obj);
})
});