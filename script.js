const clearButton = document.getElementById("clear");
const input = document.getElementById("message");
const chat = document.getElementById("chat");
const button = document.getElementById("send");

function sendMessage() {

    const text = input.value.trim();

    if (text === "") return;

    chat.innerHTML += `
        <div class="user">${text}</div>
    `;

    input.value = "";
    chat.scrollTop = chat.scrollHeight;

    // Typing message
    const typing = document.createElement("div");
    typing.className = "ai";
    typing.id = "typing";
    typing.innerHTML = "🤖 NovaMind AI is typing...";
    chat.appendChild(typing);

    chat.scrollTop = chat.scrollHeight;

    setTimeout(() => {

        document.getElementById("typing").remove();

        chat.innerHTML += `
        <div class="ai">
        🤖 NovaMind AI<br>
        Sorry! Real AI is not connected yet.<br>
        You said: <b>${text}</b>
        </div>
        `;

        chat.scrollTop = chat.scrollHeight;

    },1000);

}

button.addEventListener("click", sendMessage);

input.addEventListener("keydown", function(e){

    if(e.key==="Enter"){
        sendMessage();
    }

});

clearButton.addEventListener("click", function(){

    chat.innerHTML = `
    <div class="ai">
    Hello Ayush 👋<br>
    How can I help you today?
    </div>
    `;

});