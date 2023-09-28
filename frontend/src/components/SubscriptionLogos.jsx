import { FaSpotify, FaAmazon, FaYoutube, FaPlaystation, FaXbox } from 'react-icons/fa';
const icons = {
  'spotify': <FaSpotify />,
  'amazon prime': <FaAmazon />,
  'youtube premium': <FaYoutube />,
  'xboxlive gold': <FaXbox />,
  'playstation plus': <FaPlaystation />,
};

export default function SubscriptionLogo({ subscriptionName }) {
  // Convert the subscription name to lowercase to handle different capitalizations
  const normalizedSubscriptionName = subscriptionName.toLowerCase();
  // Replace all spaces with no space to handle typos in the name
  const formattedSubscriptionName = normalizedSubscriptionName.replace(/\s+/g, '');
  return icons[formattedSubscriptionName] || null;
}