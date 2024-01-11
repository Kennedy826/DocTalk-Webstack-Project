import React, { useState, useEffect } from 'react';

// Assuming you have functions to fetch registered doctors and active rooms from backend
// Fetch Registered Doctors Function
const fetchRegisteredDoctors = () => {
  // Fetch doctors data from backend (e.g., using Axios)
};

// Fetch Active Rooms Function
const fetchActiveRooms = () => {
  // Fetch active rooms data from backend (e.g., using Axios)
};

const Chatroom = () => {
  const [registeredDoctors, setRegisteredDoctors] = useState([]);
  const [activeRooms, setActiveRooms] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    // Fetch data when the component mounts
    fetchRegisteredDoctors().then((data) => {
      setRegisteredDoctors(data);
    });
    fetchActiveRooms().then((data) => {
      setActiveRooms(data);
    });
  }, []);

  const handleCreateRoom = () => {
    // Logic to create a room with selectedDoctor
    // This can involve backend API calls to create a new room
  };

  const handleJoinRoom = () => {
    // Logic to join the selectedRoom
    // This can involve backend API calls to join a room
  };

  const handleStartChat = () => {
    // Logic to start chatting in the selected room
    // This can involve fetching chat history or setting up sockets for real-time chat
  };

  const handleSendMessage = () => {
    // Logic to send a message in the chat
    // This can involve sending messages to the selected room through backend API or sockets
  };

  return (
    <div className="chatroom">
      <div className="sidebar">
        <h2>Create Room</h2>
        <select onChange={(e) => setSelectedDoctor(e.target.value)}>
          <option value="">Select Doctor</option>
          {registeredDoctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name} - {doctor.specialization}
            </option>
          ))}
        </select>
        <button onClick={handleCreateRoom}>Create Room</button>

        <h2>Join Room</h2>
        <select onChange={(e) => setSelectedRoom(e.target.value)}>
          <option value="">Select Room</option>
          {activeRooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>
        <button onClick={handleJoinRoom}>Join Room</button>
      </div>

      <div className="chat-area">
        {selectedRoom && (
          <div>
            {/* Render chat messages */}
            {chatMessages.map((message) => (
              <div key={message.id}>{message.text}</div>
            ))}
            <input
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        )}

        {!selectedRoom && !selectedDoctor && <div>Select a room or doctor to chat</div>}
        {selectedRoom && <button onClick={handleStartChat}>Start Chat</button>}
      </div>
    </div>
  );
};

export default Chatroom;
