const express=require("express");
const path=require("path");
const http=require("http");
const socketio=require("socket.io");
const formatMessage=require("./utils/messages");
const app=express();
//create server
const server=http.createServer(app);
const io=socketio(server);


//set static
//__dirname-->returns the path of the currently running file
//path.join(__dirname,'public')-->add the public to the path so it returns the single path such as w://chat/chat_application/public
app.use(express.static(path.join(__dirname,'public')))

const botName="chatCord Bot";
//run when client connects
io.on("connection",socket=>{
    console.log("New WS Connection ...");
    //welcome current user
    socket.emit("message",formatMessage(botName,"welcome to chat room"));

    //Broadcast when a user connects
    //sends the message to all users except the using user
    socket.broadcast.emit("message",formatMessage(botName,"a user has joined the chat"));

    //runs when a user disconnects
    socket.on("disconnect",()=>{
        //sends message to all users
        io.emit("message",formatMessage(botName,"a user has left the chat"));
    });
    //listen for chatMessage
    socket.on("chatMessage",msg=>{
        console.log(msg);
        io.emit("message",formatMessage("User",msg));
    })
});

const port=process.env.PORT||3000;
server.listen(port,()=>{
    console.log("server has started");
})