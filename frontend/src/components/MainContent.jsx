import React, { memo, useState, useEffect } from 'react';
import LinkItem from '../components/LinkItem'; // Corrected the import path
import SubscriptionCard from '../components/SubscriptionCard';

// Dummy subscription data
const subscriptions = [
  {
    id: 1,
    title: "Netflix", 
    price: "$12.99/month",
    status: "Active",
    image: "/img/netflix.png" 
  },
  {
    id: 2, 
    title: "Spotify",
    price: "$9.99/month",
    status: "Inactive",
    image: "/img/spotify.png"
  },
  {
    id: 3,
    title: "Amazon Prime",
    price: "$14.99/month",
    status: "Active", 
    image: "/img/prime.png"
  },
  // etc
];

// MainContent component
const MainContent = memo(() => {

  // Assuming useMainContent is a custom hook, it should be imported at the top
  // const { sidebarLinks } = useMainContent();

  const [subscriptionData, setSubscriptionData] = useState(subscriptions);
  
  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/subscriptions');
      const data = await response.json();
      setSubscriptionData(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      {/* Sidebar links */}
      <div className="sidebar">
        {/* Assuming sidebarLinks is defined somewhere in the component */}
        {/* {sidebarLinks.map((link, index) => (
          <LinkItem key={index} {...link} />
        ))} */}
      </div>
      {/* Main content */}
      <main className="bg-white flex flex-col gap-y-6">
        <div className="subscription-cards">
          {subscriptionData.map(sub => (
            <SubscriptionCard 
              key={sub.id}
              title={sub.title}
              price={sub.price}
              status={sub.status} 
              image={sub.image}
            />
          ))}
        </div>
      </main>
    </div>
  );
}, 'MainContent'); // Added display name to the memo function

export default MainContent;

