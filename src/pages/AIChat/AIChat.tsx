import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { io, Socket } from  "socket.io-client"
import { Button } from "@/components/ui/button";

const accessToken = localStorage.getItem("token");


export default function AIChat() {
  const [messages, setMessages] = useState<{ message: string; user: "user" | "Ollama" }[]>([]);
  const [input, setInput] = useState("");
  const socket = useRef<Socket | null>(null);
  const sendMessage = () => {
    if (input.trim()) {
      const message = {
        user: "Temp",
        message: input
      }
      socket.current?.emit("sendMessage", message);
      setMessages((prev) => [...prev, {message: input, user: "user"}])
      setInput(""); // Clear input after sending
    }
  };
  useEffect(() => {
    socket.current = io("http://localhost:3004", {
      transports: ["websocket"],
      auth: {
        token: `${accessToken}`, // Replace with your actual token
      },
    });

    socket.current?.on("connect", () => {
      console.log("Connected with socket id:", socket.current?.id);
    });

    socket.current?.on("connect_error", (err) => {
      console.error("Connection error:", err);
    });

    return () => {
      socket.current?.disconnect();
    };
  }, []);
  useEffect(() => {
    // socket.on("receiveMessage", (msg) => {
    //     console.log(msg, "msg");
    //   setMessages((prev) => [...prev, msg]);
    // });

    // return () => {
    //   socket.off("receiveMessage"); // Cleanup listener on unmount
    // };
  }, []);
//   const sendMessage1 = () => {
//     if (!input.trim()) return;

//     const newMessages = [...messages, { message: input, user: "user" }];
//     setMessages(newMessages);
//     setInput("");

//     // Simulate bot response
//     setTimeout(() => {
//       setMessages((prev) => [...prev, { message: "Hello! How can I help?", user: "Ollama" }]);
//     }, 1000);
//   };

  return (
    
    <div className="flex flex-col w-full h-full p-4">
        <h1>AI chat</h1>
      <Card className="flex flex-col flex-1 overflow-hidden">
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 rounded-md ${msg.user === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-200 text-black self-start"}`}>
              {msg.message}
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="flex items-center mt-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button className="ml-2" onClick={sendMessage}>
          Send
        </Button>
      </div>
    </div>
  );
}
