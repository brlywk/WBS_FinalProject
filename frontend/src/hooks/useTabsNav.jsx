// useMainContent.js

import { useState } from 'react';
import useSidebar from './useSidebar';

export default function useMainContent() {

  const [activeTab, setActiveTab] = useState('');

  const tabs = [
    'All Subscriptions', 'Active', 'Inactive', 'Usage' // Added 'All Subscriptions' tab
  ];

  const getSidebarLinks = () => {
    // Get the list of sidebar links from the useSidebar hook
    const { links } = useSidebar();

    return links;
  }

  const sidebarLinks = getSidebarLinks();

  return {
    activeTab,
    tabs,
    setActiveTab,
    sidebarLinks
  };
}