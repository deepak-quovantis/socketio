const express = require('express');
const PORT = 2003;
const app = express();
const server = require ('http').createServer(app);
const io = require("socket.io")(server, { cors: {origini:'*'}});

//Setup Server
app.set('view engine', 'ejs');

app.get('/home',(req,res) => {
    res.render("home");
});

server.listen(PORT, () => {
     console.log(`listening to port  ${PORT}`);
 })

// // Static files
// app.use(express.static("public"));

io.on('connection', (socket) => {
    console.log('user Connected: '+ socket.id);

    socket.on('message',(data)=> {
        socket.broadcast.emit('message', data);
    })
})
