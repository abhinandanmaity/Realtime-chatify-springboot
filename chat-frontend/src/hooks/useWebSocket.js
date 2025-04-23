// import { useEffect, useState } from "react";
// import SockJS from "sockjs-client";
// import { over } from "stompjs";

// const useWebSocket = (url) => {
//     const [stompClient, setStompClient] = useState(null);
//     const [message, setMessages] = useState([]);

//     useEffect(() => {
//         const socket = new SockJS(url);
//         const client = over(socket);

//         client.connect({}, () => {
//             console.log("Connected to WebSocket ");

//             // Subscribe to topic
//             client.subscribe("/group/public", (msg) => {
//                 const messageBody = JSON.parse(msg.body);
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
//             stompClient.send("/app/message", {}, JSON.stringify(msg));
//         }
//     };

//     return { message, sendMessage };
// };

// export default useWebSocket;
