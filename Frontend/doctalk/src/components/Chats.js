// Chats.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import ChatArea from './ChatArea';

const Chats = () => {
  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. Rachael', profession: 'Psychologist', online: true },
    { id: 2, name: 'Dr. Johnson', profession: 'Counselor', online: false },
    // Add more doctors as needed
  ]);

  const { doctorId } = useParams();
  const [selectedDoctor, setSelectedDoctor] = useState(
    doctors.find((doctor) => doctor.id === parseInt(doctorId, 10))
  );
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:5000'); // Replace with your backend server URL
    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); 
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('message', (data) => {
        setMessages([...messages, data]);
      });
    }
  }, [socket, messages]);

  const startChat = (doctor) => {
    setSelectedDoctor(doctor);
    setMessages([]);
    window.location.href = `/dashboard/chat/${doctor.id}`;
  };

  const sendMessage = () => {
    if (inputMessage.trim() !== '' && socket) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'You',
        text: inputMessage.trim(),
      };

      socket.emit('message', newMessage);
      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-1 h-screen max-w-screen-lg bg-gray-100 p-4">
      <div className="flex space-x-4">
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-bold mb-4">Proffessionals</h2>
          {doctors.map((doctor) => (
            <Link
              key={doctor.id}
              to={`/chats/${doctor.id}`}
              className={`p-2 border rounded cursor-pointer ${
                selectedDoctor && selectedDoctor.id === doctor.id
                  ? 'bg-blue-200'
                  : 'hover:bg-gray-200'
              }`}
              onClick={() => startChat(doctor)}
            >
              <p className="text-sm font-semibold">{doctor.name}</p>
              <p className="text-xs text-gray-500">{doctor.profession}</p>
              {doctor.online ? (
                <span className="text-xs text-green-500">Online</span>
              ) : (
                <span className="text-xs text-red-500">Offline</span>
              )}
            </Link>
          ))}
        </div>

        <ChatArea
          selectedDoctor={selectedDoctor}
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          messages={messages}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chats;



// Chats.js
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, Routes, Route } from 'react-router-dom';
// import io from 'socket.io-client';
// import ChatArea from './ChatArea';

// const Chats = () => {
//   const [doctors, setDoctors] = useState([
//     { id: 1, name: 'Dr. Rachael', profession: 'Psychologist', online: true },
//     { id: 2, name: 'Dr. Johnson', profession: 'Counselor', online: false },
//     // Add more doctors as needed
//   ]);

//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [inputMessage, setInputMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [socket, setSocket] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const newSocket = io('http://localhost:5000'); // Replace with your backend server URL
//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect(); // Clean up on unmount
//     };
//   }, []);

//   useEffect(() => {
//     if (socket) {
//       socket.on('message', (data) => {
//         setMessages([...messages, data]);
//       });
//     }
//   }, [socket, messages]);

//   const startChat = (doctor) => {
//     setSelectedDoctor(doctor);
//     setMessages([]);
//     // Redirect to the chat area for the selected doctor
//     navigate(`/chats/${doctor.id}`);
//   };

//   const sendMessage = () => {
//     if (inputMessage.trim() !== '' && socket) {
//       const newMessage = {
//         id: messages.length + 1,
//         sender: 'You',
//         text: inputMessage.trim(),
//       };

//       socket.emit('message', newMessage);
//       setMessages([...messages, newMessage]);
//       setInputMessage('');
//     }
//   };

//   return (
//     <div className="flex flex-1 h-screen max-w-screen-lg bg-gray-100 p-4">
//       <div className="flex space-x-4">
//         <div className="flex flex-col space-y-4">
//           <h2 className="text-xl font-bold mb-4">Proffessionals</h2>
//           {doctors.map((doctor) => (
//             <Link
//               key={doctor.id}
//               to={`chats/${doctor.id}`}
//               className={`p-2 border rounded cursor-pointer ${
//                 selectedDoctor && selectedDoctor.id === doctor.id
//                   ? 'bg-blue-200'
//                   : 'hover:bg-gray-200'
//               }`}
//               onClick={() => startChat(doctor)}
//             >
//               <p className="text-sm font-semibold">{doctor.name}</p>
//               <p className="text-xs text-gray-500">{doctor.profession}</p>
//               {doctor.online ? (
//                 <span className="text-xs text-green-500">Online</span>
//               ) : (
//                 <span className="text-xs text-red-500">Offline</span>
//               )}
//             </Link>
//           ))}
//         </div>

//         {/* Chat Area */}
//         <Routes>
//           <Route
//             path="/chats/:doctorId"
//             element={<ChatArea doctors={doctors} socket={socket} />}
//           />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default Chats;



// import React, { useState, useEffect } from 'react';
// import { Link, Route, Routes } from 'react-router-dom';
// import io from 'socket.io-client';
// import ChatArea from './ChatArea'; // Import the new ChatArea component

// const Chats = () => {
//   const [doctors, setDoctors] = useState([
//     { id: 1, name: 'Dr. Rachael', profession: 'Psychologist', online: true },
//     { id: 2, name: 'Dr. Johnson', profession: 'Counselor', online: false },
//     // Add more doctors as needed
//   ]);

//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const newSocket = io('http://localhost:5000'); // Replace with your backend server URL
//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect(); // Clean up on unmount
//     };
//   }, []);

//   const startChat = (doctor) => {
//     setSelectedDoctor(doctor);
//   };

//   return (
//     <div className="flex flex-1 h-screen max-w-screen-lg bg-gray-100 p-4">
//       <div className="flex space-x-4">
//         {/* Doctor List */}
//         <div className="flex flex-col space-y-4">
//           <h2 className="text-xl font-bold mb-4">Professionals</h2>
//           {doctors.map((doctor) => (
//             <Link
//               key={doctor.id}
//               to={`chats/${doctor.id}`} // Use doctor.id in the route
//               className={`p-2 border rounded cursor-pointer ${
//                 selectedDoctor && selectedDoctor.id === doctor.id
//                   ? 'bg-blue-200'
//                   : 'hover:bg-gray-200'
//               }`}
//               onClick={() => startChat(doctor)}
//             >
//               <p className="text-sm font-semibold">{doctor.name}</p>
//               <p className="text-xs text-gray-500">{doctor.profession}</p>
//               {doctor.online ? (
//                 <span className="text-xs text-green-500">Online</span>
//               ) : (
//                 <span className="text-xs text-red-500">Offline</span>
//               )}
//             </Link>
//           ))}
//         </div>

//         {/* Chat Area */}
//         <div className="flex-1 flex flex-col space-y-5">
//           <Routes>
//             <Route
//               path="/chats/:doctorId"
//               element={<ChatArea doctors={doctors} socket={socket} />}
//             />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chats;



// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import io from 'socket.io-client';

// const Chats = () => {
//   const [doctors, setDoctors] = useState([
//     { id: 1, name: 'Dr. Rachael', profession: 'Psychologist', online: true },
//     { id: 2, name: 'Dr. Johnson', profession: 'Counselor', online: false },
//     // Add more doctors as needed
//   ]);

//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [inputMessage, setInputMessage] = useState('');
//   const [messages, setMessages] = useState([]);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const newSocket = io('http://localhost:5000'); // Replace with your backend server URL
//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect(); // Clean up on unmount
//     };
//   }, []);

//   useEffect(() => {
//     if (socket) {
//       socket.on('message', (data) => {
//         // Handle received messages and update state
//         setMessages([...messages, data]);
//       });
//     }
//   }, [socket, messages]);

//   const startChat = (doctor) => {
//     setSelectedDoctor(doctor);
//     setMessages([]); // Clear previous chat messages
//   };

//   const sendMessage = () => {
//     if (inputMessage.trim() !== '' && socket) {
//       const newMessage = {
//         id: messages.length + 1,
//         sender: 'You', // Assuming the sender is the current user
//         text: inputMessage.trim(),
//       };

//       socket.emit('message', newMessage); // Emit the message to the server

//       setMessages([...messages, newMessage]);
//       setInputMessage('');
//     }
//   };

//   return (
//     <div className="flex flex-1 h-screen max-w-screen-lg bg-gray-100 p-4">
//       <div className="flex space-x-4">
//         {/* Doctor List */}
//         <div className="flex flex-col space-y-4">
//           <h2 className="text-xl font-bold mb-4">Proffessionals</h2>
//           {doctors.map((doctor) => (
//             <div
//               key={doctor.id}
//               className={`p-2 border rounded cursor-pointer ${
//                 selectedDoctor && selectedDoctor.id === doctor.id
//                   ? 'bg-blue-200'
//                   : 'hover:bg-gray-200'
//               }`}
//               onClick={() => startChat(doctor)}
//             >
//               <p className="text-sm font-semibold">{doctor.name}</p>
//               <p className="text-xs text-gray-500">{doctor.profession}</p>
//               {doctor.online ? (
//                 <span className="text-xs text-green-500">Online</span>
//               ) : (
//                 <span className="text-xs text-red-500">Offline</span>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Chat Area */}
//         <div className="flex-1 flex flex-col space-y-5">
//           <div className="flex flex-col space-y-5">
//             {messages.map((message) => (
//               <div key={message.id} className="flex flex-col">
//                 <span className="text-gray-500 text-sm">{message.sender}</span>
//                 <div className="bg-white p-3 rounded-lg shadow-md">
//                   <p>{message.text}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="mt-auto">
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 sendMessage();
//               }}
//             >
//               <div className="flex items-center">
//                 <input
//                   type="text"
//                   placeholder="Type a message..."
//                   className="flex-1 border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
//                   value={inputMessage}
//                   onChange={(e) => setInputMessage(e.target.value)}
//                 />
//                 <button
//                   type="submit"
//                   className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
//                 >
//                   Send
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chats;


// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const ChatArea = () => {
//   const [inputMessage, setInputMessage] = useState('');
//   const [messages, setMessages] = useState([
//     { id: 2, sender: 'Mahbub', text: 'Hi there!' },

//   ]);
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const newSocket = io('http://localhost:5000'); // Replace with your backend server URL
//     setSocket(newSocket);

//     return () => {
//       newSocket.disconnect(); // Clean up on unmount
//     };
//   }, []);

//   useEffect(() => {
//     if (socket) {
//       socket.on('message', (data) => {
//         // Handle received messages and update state
//         setMessages([...messages, data]);
//       });
//     }
//   }, [socket, messages]);

//   const sendMessage = () => {
//     if (inputMessage.trim() !== '' && socket) {
//       const newMessage = {
//         id: messages.length + 1,
//         sender: 'You', // Assuming the sender is the current user
//         text: inputMessage.trim(),
//       };

//       socket.emit('message', newMessage); // Emit the message to the server

//       setMessages([...messages, newMessage]);
//       setInputMessage('');
//     }
//   };

//   return (
//         <div className="flex  items-center justify-center flex-1 h-screen  overflow-y-auto bg-gray-100 p-4">
//       <div className="flex flex-col space-y-5">
//         {messages.map(message => (
//           <div key={message.id} className="flex flex-col">
//             <span className="text-gray-500 text-sm">{message.sender}</span>
//             <div className="bg-white p-3 rounded-lg shadow-md">
//               <p>{message.text}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="mt-auto">
//         <form
//           onSubmit={e => {
//             e.preventDefault();
//             sendMessage();
//           }}
//         >
//           <div className='h-150 '>
//           <input
//             type="text"
//             placeholder="Type a message..."
//             className="w-full border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
//             value={inputMessage}
//             onChange={e => setInputMessage(e.target.value)}
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-600 focus:outline-none"
//           >
//             Send
//           </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChatArea;