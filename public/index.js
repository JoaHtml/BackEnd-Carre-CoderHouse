const socket = io.connect()

function render (data) {
    const html = data.map((elem, index)=>{
        return(`<div><strong>${elem.author}</strong><em>${elem.text}</em></div>`)
    }).join (" ")
    document.getElementById('messages').innerHTML = html
}

socket.on ('messages', (data) => {render(data)})