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

io.on('connection', (socket) =>{
    console.log('user Connected');
    console.log(socket);
    socket.on('message', (msg) => {
        console.log(msg)
        io.emit('message', msg)
    });
    
})