const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 2200;

server.listen(port,()=>{
    console.log(`server is listening on port ${port}`)
})

app.get('/',(req,res) => {
    res.sendFile(__dirname+ '/public/index.html')
});
app.get('/javascript',(req,res) => {
    res.sendFile(__dirname+ '/public/javascript.html')
});
app.get('/angular',(req,res) => {
    res.sendFile(__dirname+ '/public/angular.html')
});
app.get('/aws',(req,res) => {
    res.sendFile(__dirname+ '/public/aws.html')
});

io.on('connection', (socket) =>{
    socket.on('join',(data)=>{
        socket.join(data.room);
        io.in(data.room).emit('message',`New user connected ${data.room} room!`)
    })
    socket.on('message', (data) => {
        io.in(data.room).emit('message', data.msg)
    });
    
})