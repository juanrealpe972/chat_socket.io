import io from "socket.io-client"
import { useState, useEffect } from "react"

const socket = io("/")
//,{
//   auth: {
//     serverOffset: 0
//   }
// }
function App() {

  let [message, setMessage] = useState('')
  const [messageError, setMessageError] = useState(null)
  const [messageTouched, setMessageTouched] = useState(false)
  const [messages, setMessages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (messageError) {
      return
    }
    const newMessageMe = {
      msj: message,
      from: "Me",
    }
    setMessages([...messages, newMessageMe])
    if (message && message.trim() !== '') {
      socket.emit("chat_message", message)
    }
  }

  useEffect(() => {
    if (message === '') {
      setMessageError("Message cannot be empty.")
    } else {
      setMessageError(null)
    }
    socket.on("message", receiveMenssage)
    return () => {
      socket.off('message', receiveMenssage)
    }
  }, [message])

  const receiveMenssage = message => setMessages((state) => [...state, message])

  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10 flex flex-col w-2/4">
        <h1 className="text-2xl text-center font-bold my-2">Subcoffee chat</h1>
        <br />
        {messageError && messageTouched && (
          <p className="bg-red-600 text-white">{messageError}</p>
        )}
        <ul className="overflow-y-auto h-64 scroll-smooth">
          {
            messages.map((message, i) => (
              <li key={i} className={
                `my-2 p-2 table text-sm rounded-md ${message.from === "Me" ? "bg-cyan-700" : "bg-green-700 ml-auto"}`
              }>
                <span className={
                  `text-xs font-mono ${message.from === "Me" ? "text-orange-500" : "text-red-500"}`
                }>{message.from}</span>
                <p className="text-lg">{message.msj}</p>
              </li>
            ))
          }
        </ul>
        <div className="flex h-10 bg-slate-600 items-center">
          <input
            type="text"
            placeholder="Write your message"
            value={message}
            className="rounded-md bg-slate-500 border border-zinc-500 w-full mx-4 p-2 h-7 text-black focus:outline-double focus:outline-slate-800 focus:shadow-md"
            onChange={(e) => setMessage(e.target.value)}
            onBlur={(e) => setMessageTouched(true)}
            autoComplete="true"
          />
          <button
            type="submit"
            className="px-3"
          >Enviar</button>
        </div>
      </form>
    </div>
  )
}

export default App