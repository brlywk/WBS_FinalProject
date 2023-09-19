import { useState } from 'react';

// Define a component for Notifications
const Notifications = ({notifications, onClick}) => {
  // notification icon & badge
  return (
    <div onClick={onClick}>
      Notifications: {notifications}
    </div>
  );
};

// Define a component for Profile
const Profile = () => {
  // profile icon 
  return (
    <div>
      Profile
    </div>
  );
};

export default function useHeader() {
  // Define state for menu open status
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Define state for notifications count
  const [notifications, setNotifications] = useState(3);
  
  return (
    <header>
      <Notifications 
        notifications={notifications}
        // Decrease notifications count on click
        onClick={() => setNotifications(prev => prev - 1)} 
      />

      <Profile />
    </header>
  );
}
