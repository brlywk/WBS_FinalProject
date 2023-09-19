// useMainContent.js

import { useState } from 'react';
import useSidebar from '../usesiderbar';

export default function useMainContent() {

  const [activeTab, setActiveTab] = useState('');

  const tabs = [
    'Active', 'Inactive', 'Usage' 
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

// The following components are not being used and causing linter errors. 
// If you plan to use them in the future, you can uncomment them.
// Otherwise, it's better to remove them to keep the code clean.

// const TabGroup = ({children}) => (
//   <nav>
//     {children} 
//   </nav>
// );

// const Tab = ({title}) => {
//   // tab link  
//   return (
//     <div>
//       {title}
//     </div>
//   );
// };

