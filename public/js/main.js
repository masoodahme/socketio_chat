const chatForm=document.getElementById("chat-form");
const chatMessages=document.querySelector(".chat-messages");
const socket=io();
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