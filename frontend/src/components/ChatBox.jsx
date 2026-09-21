import { useState } from "react";
import { sendAdvisoryRequest } from "../api/api";

const ChatBox = ({ formData }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input) return;
    setMessages([...messages, { sender: "user", text: input }]);

    const res = await sendAdvisoryRequest(input);
    setMessages((prev) => [...prev, { sender: "bot", text: res.advisory }]);

    setInput("");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Chat with CropBot</h2>
      <div className="h-64 overflow-y-auto mb-4 border p-2 rounded">
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 ${m.sender === "user" ? "text-right text-blue-600" : "text-left text-green-600"}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          className="flex-grow border rounded-l px-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSend} className="bg-blue-500 text-white px-4 rounded-r">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
