const API_KEY = "AQ.Ab8RN6I57S_91rZQhnZt9FqgmDYN";

const clearButton = document.getElementById("clear");
const input = document.getElementById("message");
const chat = document.getElementById("chat");
const button = document.getElementById("send");

async function sendMessage() {

    const text = input.value.trim();

    if (text === "") return;

    chat.innerHTML += `
    <div class="user">${text}</div>
    `;

    input.value = "";
    chat.scrollTop = chat.scrollHeight;

    const typing = document.createElement("div");
    typing.className = "ai";
    typing.id = "typing";
    typing.innerHTML = "🤖 NovaMind AI is thinking...";
    chat.appendChild(typing);

    chat.scrollTop = chat.scrollHeight;

    try {

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: text
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        document.getElementById("typing").remove();

        let reply = "Sorry, I couldn't understand.";

        if (
            data.candidates &&
            data.candidates.length > 0 &&
            data.candidates[0].content &&
            data.candidates[0].content.parts &&
            data.candidates[0].content.parts.length > 0
        ) {
            reply = data.candidates[0].content.parts[0].text;
        }

        chat.innerHTML += `
        <div class="ai">
        🤖 NovaMind AI<br><br>
        ${reply}
        </div>
        `;

        chat.scrollTop = chat.scrollHeight;

    } catch (error) {

        document.getElementById("typing").remove();

        chat.innerHTML += `
        <div class="ai">
        ❌ Error connecting to Gemini API.
        </div>
        `;

    }

}

button.addEventListener("click", sendMessage);

input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

clearButton.addEventListener("click", function() {

    chat.innerHTML = `
    <div class="ai">
    Hello Ayush 👋<br>
    How can I help you today?
    </div>
    `;

});