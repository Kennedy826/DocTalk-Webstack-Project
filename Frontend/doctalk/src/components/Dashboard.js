
import React from 'react';
import { Routes, Route, useLocation, useParams } from 'react-router-dom';
import Profile from './Profile';
import NotificationBar from './NotificationBar';
import Chats from './Chats'
import Sidebar from './Sidebar';
import Chatroom from './Chatroom';
import { ChannelsHome, ChannelsDetails } from './Channels';

const Dashboard = () => {
  // Get the current location using useLocation hook from react-router-dom
  const location = useLocation();
  const isHomePage = location.pathname === '/'; // Check if it's the home page

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col flex-grow overflow-hidden">
          <NotificationBar />
          <div className="flex">
            {/* Content Area */}
            <Routes>
              <Route path="/profile" element={<Profile />} />
              {/* Channels - Nested routes */}
              <Route path="channels/*" element={<ChannelContent />} />
              <Route path="/Chatroom" element={<Chatroom />} />
              <Route path="/chats/*" element={<Chats />} />
            </Routes>
          </div>
          <Chats />
        </div>
      </div>
    </div>
  );
};

const ChannelContent = () => {
  const { id } = useParams(); // Fetch the channel ID from the URL
//   // Use the ID to render specific channel content
  return id ? <ChannelsDetails channelId={id} /> : <ChannelsHome />;
};

export default Dashboard;