// ChatArea.js
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ChatArea = ({
  selectedDoctor,
  setSelectedDoctor,
  messages,
  setMessages,
  inputMessage,
  sendMessage,
  setInputMessage,
  doctors,
}) => {
  const { doctorId } = useParams();

  useEffect(() => {
    if (!selectedDoctor || !doctors || !doctors.length) {
      return;
    }

    // If the selectedDoctor is not set or the doctorId in the URL doesn't match, set the selectedDoctor
    if (!selectedDoctor || selectedDoctor.id !== parseInt(doctorId, 10)) {
      // Fetch the doctor with the corresponding ID
      const doctor = doctors.find((doctor) => doctor.id === parseInt(doctorId, 10));
      if (doctor) {
        setSelectedDoctor(doctor);
        setMessages([]); // Clear previous chat messages
      }
    }
  }, [doctorId, selectedDoctor, setSelectedDoctor, setMessages, doctors]);

  return (
    <div className="flex-1 flex flex-col space-y-5">
      <div className="flex flex-col space-y-5">
        {/* Doctor Info */}
        <div className="flex flex-col">
          <h2 className="text-xl font-bold mb-4">
         {selectedDoctor && selectedDoctor.name}
          </h2>
          {selectedDoctor && (
            <div className="p-2 border rounded">
              <p className="text-sm font-semibold">{selectedDoctor.name}</p>
              <p className="text-xs text-gray-500">{selectedDoctor.profession}</p>
              {selectedDoctor.online ? (
                <span className="text-xs text-green-500">Online</span>
              ) : (
                <span className="text-xs text-red-500">Offline</span>
              )}
            </div>
          )}
        </div>

        {/* Chat Messages */}
        {messages.map((message) => (
          <div key={message.id} className="flex flex-col">
            <span className="text-gray-500 text-sm">{message.sender}</span>
            <div className="bg-white p-3 rounded-lg shadow-md">
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="mt-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <div className="flex items-center w-full">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button
              type="submit"
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;




