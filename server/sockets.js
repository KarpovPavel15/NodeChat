const MessageModel= require('./models/messages.model');

module.exports = io => {
    io.on('connection', function (socket) {
        socket.emit('connected',"U connected");
        socket.join('all');
        socket.on('msg',content => {
            const obj={
                date:new Date(),
                content:content,
                username:socket.id
            };
            MessageModel.create(obj,err => {
            if(err) return console.error("MessageModel",err);
            socket.emit("message",obj);
            socket.to('all').emit("message",obj);
            });
        })
    });
};