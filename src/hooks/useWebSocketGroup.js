import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
// import { over } from "stompjs";

// const useWebSocketGroup = (url) => {
//     const [stompClient, setStompClient] = useState(null);
//     const [message, setMessages] = useState([]);

//     useEffect(() => {
//         const socket = new SockJS(url);
//         const client = over(socket);

//         client.connect({}, () => {
//             console.log("Connected to WebSocket ");

//             // Subscribe to topic
//             client.subscribe("/group/public", (msg) => {
//                 const messageBody = JSON.parse(msg.lastMessagegroup);
//                 console.log("Received: ", messageBody);
//                 setMessages((prev) => [...prev, messageBody]);
//             });

//             setStompClient(client);
//         });

//         return () => {
//             if (stompClient) stompClient.disconnect();
//         };
//     }, [url]);

//     const sendMessage = (msg) => {
//         if (stompClient) {
//             stompClient.send(`/app/group-message/${msg.id}`, {}, JSON.stringify(msg.lastMessagegroup));
//         }
//     };

//     return { message, sendMessage };
// };

// export default useWebSocketGroup;



import { Client } from "@stomp/stompjs";
import { getToken } from "../config/SessionManagement";

const useWebSocket = (url) => {
    const [stompClient, setStompClient] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = new SockJS(url);
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000, // Auto-reconnect after 5 seconds
            connectHeaders: {
                Authorization: `Bearer ${getToken()}`  // Attach token in headers
            },
            onConnect: () => {
                console.log("Connected to WebSocket");

                // Subscribe to public group messages
                client.subscribe("/group/public", (msg) => {
                    const messageBody = JSON.parse(msg.body);
                    console.log("Public Received: ", messageBody);
                    setMessages((prev) => [...prev, messageBody]);
                });

                setStompClient(client);
            },
            onStompError: (frame) => {
                console.error("Stomp error: ", frame);
            }
        });

        client.activate();

        return () => {
            client.deactivate();
        };
    }, [url]);

    const sendMessage = (msg) => {

        if (stompClient) {
            console.log("msg  send");
            console.log(msg);
            stompClient.publish({
                destination: `/app/group-message/${msg.id}`, // ✅ Matches @MessageMapping("/group-message/{id}"),
                body: JSON.stringify(msg.lastMessagegroup),
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });
        }
    };

    return { messages, sendMessage };
};

export default useWebSocket;