import React, { useState, useEffect } from "react";
import useDashboardToggles from "../hooks/useDashboardToggles";
import useSidebar from "../hooks/useSidebar"; // Added useSidebar hook
import { SubscriptionsComponent } from "../components/Subscriptions";
import MainContent from "../components/MainContent";
import LinkItem from "../components/LinkItem"; // Import LinkItem component
import Stats from "../components/Stats"; // Import Stats component
import Sidebar from "../components/Sidebar";
import useTabsNav from '../hooks/useTabsNav';
import Logo from "/subzero_logo_icon.png";
import SubscriptionCard from '../components/SubscriptionCard';
import useSearch from '../hooks/useSearch';
import useSubscription from '../hooks/useSubscription'; // Import useSubscription hook
import { Dialog, Listbox } from '@headlessui/react'; // Import Dialog and Listbox from headlessui
import AddSubscriptionForm from '../components/AddSubscriptions'; // Import AddSubscriptionForm component
import SearchModal from '../components/SearchModal'; // Import SearchModal component

// Removed useHeader2 as it's not used in this component
// Removed useClickOutside, useHeader, useSidebar, useMainContent as they are not used in this component
// Removed import statements for SubscriptionCard, StatsCard as they are not used in this component
// Removed useState, useEffect as they are not used in this component
// Removed the fetch data from API code as we are now getting data from MainContent.jsx
function Dashboard() {
  useEffect(() => {
    document.body.classList.add('gradient-bg');

    return () => {
      document.body.classList.remove('gradient-bg');
    };
  }, []);

  // Usage in component
  const { isMenuOpen, toggleMenu } = useDashboardToggles();
  const { activeLink, links, setActiveLink } = useSidebar(); // Added useSidebar hook
  // Removed the useState for isMenuOpen as it's already defined in useDashboardToggles
  // Removed the toggleMenu function as it's already defined in useDashboardToggles
  const { activeTab, tabs, setActiveTab } = useTabsNav('All Subscriptions'); // Use useMainContent hook
  const [isOpen, setIsOpen] = useState(false); // State for controlling the visibility of the dialog
  const [isAddSubscriptionOpen, setIsAddSubscriptionOpen] = useState(false); // State for controlling the visibility of the AddSubscriptionForm modal
  const billingCycles = ['Monthly', 'Quarterly', 'Yearly']; // Billing cycles
  const [selectedBillingCycle, setSelectedBillingCycle] = useState(billingCycles[0]); // State for selected billing cycle in the Listbox
  const { createSubscription } = useSubscription(); // Hook for creating a subscription

  // Function for handling the addition of a subscription
  const handleAddSubscription = async (event) => {
    event.preventDefault();
    // Gather data from the form and create a subscription object
    const subscription = { /* ... */ };
    console.log("Attempting to create subscription with data: ", subscription); // Debug log
    try {
      const result = await createSubscription(subscription);
      console.log("Subscription creation result: ", result); // Debug log
      // Handle the result
      if (result.success) {
        setIsOpen(false); // Close the dialog if the subscription was successfully created
      }
    } catch (error) {
      console.error("Error while creating subscription: ", error); // Error log
    }
  };

  // Main return block for the Dashboard component
  return (
    // The main container with fixed positioning and semi-transparent background
    
    <div className="overlay-app">
                  {/* Search Modal */}
                  <SearchModal className="w-72" />
      <div className="flex justify-center">
        <div className=" inset-0 bg-gray-900/70 -z-10 backdrop-blur rounded-lg bg-white/25"></div>
        <div className="relative w-[1024px] h-[701.22px] rounded-lg border border-transparent bg-white/10 p-6 backdrop-blur light-mode">
          {/* Header */}
          {/* Header with flex layout, centered items, space between items, specific height, bottom border, and semi-transparent gray border color */}
          <header className="flex items-center justify-between h-16 border-b bo">
            {/* Dashboard title */}
            <h1 className="text-xl font-bold">DASHBOARD</h1> {/* Increased font size and weight for better legibility */}
            {/* Notifications */}
            {/* Notifications with relative positioning */}
            <div className="relative">
              {/* Placeholder for the notifications */}
              <div className="h-10 w-32 rounded-lg bg-gray-300"></div>
              {/* Container for the notification icon and count */}
              <div className="absolute right-14 top-0 flex flex-col items-start gap-y-1">
                {/* Notification icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  {/* SVG paths go here */}
                </svg>
                {/* Notification count */}
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600">
                  <p className="text-xs text-white">3</p>
                </div>
              </div>
            </div>

          </header>
          {/* Tabs */}
          {/* Navigation for the tabs */}
          <nav className="space-x-4 ml-40"> {/* Added margin-left to move the tabs to the right by 2cm */}
            {/* Map through the tabs and create a button for each one */}
            {tabs.map((tab) => (
              <button
                key={tab}
                // Apply different styles based on whether the tab is active or not
                // Increased padding to provide more space around the items in the tabs
                className={`py-4 px-6 border-b-2 ${activeTab === tab ? 'border-black' : 'border-transparent'}`}
                // Set the active tab when a tab button is clicked
                onClick={() => setActiveTab(tab)}
              >
                {/* Display the tab name */}
                {tab}
              </button>
            ))}
            {/* Add Subscription button */}
            <button 
  onClick={() => setIsAddSubscriptionOpen(true)}
  className="bg-black text-white rounded-full py-2 px-4"
>
  Add Subscription
</button>
          </nav>
          <div className="overflow-x-hidden"> {/* or overflow-auto */}
            {/* Tab content */}
            {/* Display different content based on the active tab */}
            {activeTab === 'Active' && 
              <div className="flex items-center border-b h-14 w-full px-8 whitespace-nowrap sm:px-4 bg-red-500">
                Active content
              </div>
            }
            {activeTab === 'Inactive' && 
              <div className="flex items-center border-b h-14 w-full px-8 whitespace-nowrap sm:px-4 bg-blue-500">
                Inactive content
              </div>
            }
            {activeTab === 'Usage' && 
              <div className="flex items-center border-b h-14 w-full px-8 whitespace-nowrap sm:px-4 bg-green-500">
                Usage content
              </div>
            }
            {activeTab === 'All Subscriptions' && 
              <>
                {/* Stats */}
                <Stats />
                {/* ...Main content here... */}
                <MainContent />
              </>
            }
            {/* Sidebar for sub navigation */}
            <div className="border-l overflow-auto h-[calc(100%-40px)] ml-40 mt-[-40px]">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
      <div>
        <img src={Logo} className="absolute left-6 top-6 h-7 w-7" alt="Logo" />
      </div>
      <AddSubscriptionForm open={isAddSubscriptionOpen} onClose={() => setIsAddSubscriptionOpen(false)} />
    </div>
  );
}

export default Dashboard;