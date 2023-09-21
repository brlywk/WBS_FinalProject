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
  {
    id: 4,
    title: "Ocado",
    price: "$99.99/year",
    status: "Active", 
    image: "/img/grocery.png"
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
    <div className="flex justify-end"> {/* Added justify-end to move the cards to the right */}
      <main className="bg-transparent flex flex-row flex-wrap ml-2"> {/* Removed gap-0 to remove the gap between the cards */}
        <div className="subscription-cards flex flex-row flex-wrap"> {/* No changes needed here */}
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
});

MainContent.displayName = 'MainContent';
  
export default MainContent;
