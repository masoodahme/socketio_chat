const chatForm=document.getElementById("chat-form");
const chatMessages=document.querySelector(".chat-messages");
const roomName=document.getElementById("room-name");
const userList=document.getElementById("users");
//get username and room from url
const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
});
const socket=io();
//join chatroom
console.log("main1");
socket.emit("joinRoom",{username,room});
//get room and users
socket.on("roomUser",({room,users})=>{
outputRoomName(room);
outputUsers(users);
});
//Message from server
socket.on("message",message=>{
    console.log(message);
    outputMessage(message);
    //scroll down
    //sets to down to see messages 
    chatMessages.scrollTop=chatMessages.scrollHeight;
})

// message submit

chatForm.addEventListener("submit",(e)=>{
//prevent it from submitting a form
    e.preventDefault();
    //get message text
    //id is msg 
 const msg=e.target.elements.msg.value;

 //emit message to server
 socket.emit("chatMessage",msg);

 //clear the input
 e.target.elements.msg.value="";
 //focus  on the input
 e.target.elements.msg.focus();
 
});

//output message top Dom
function outputMessage(message)
{
    const div=document.createElement("div");
    div.classList.add('message');
    div.innerHTML=`<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
       ${message.text}
    </p>`;
    document.querySelector(".chat-messages").appendChild(div);
}

//Add Room name to DOM
function outputRoomName(room)
{
    
    roomName.innerText=room;
}
//Add  users to DOM
function outputUsers(users)
{
    //array into string
    userList.innerHTML=`
    ${users.map(user=>`<li>${user.username}</li>`).join(" ")}
    `;
}

