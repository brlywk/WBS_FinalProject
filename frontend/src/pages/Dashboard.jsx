import React from "react";
import useDashboardToggles from "../hooks/useDashboardToggles";
import useSidebar from "../hooks/useSidebar"; // Added useSidebar hook
import { SubscriptionsComponent } from "../components/Subscriptions";
import MainContent from "../components/MainContent";
import LinkItem from "../components/LinkItem"; // Import LinkItem component
import Stats from "../components/Stats"; // Import Stats component
import Sidebar from "../components/Sidebar";

// Removed useHeader2 as it's not used in this component
// Removed useClickOutside, useHeader, useSidebar, useMainContent as they are not used in this component
// Removed import statements for SubscriptionCard, StatsCard as they are not used in this component
// Removed useState, useEffect as they are not used in this component
// Removed the fetch data from API code as we are now getting data from MainContent.jsx
function Dashboard() {
  // Usage in component
  const { isMenuOpen, toggleMenu } = useDashboardToggles();
  const { activeLink, links, setActiveLink } = useSidebar(); // Added useSidebar hook
  // Removed the useState for isMenuOpen as it's already defined in useDashboardToggles
  // Removed the toggleMenu function as it's already defined in useDashboardToggles

  // Main return block for the Dashboard component
  return (
    <div className="dashboard flex w-full justify-center bg-transparent">
      <div className="dashboard-wrapper h-[701.22px] w-[1024px]">
        <div className="overlap-wrapper-2">
          <div className="overlap-2 relative h-[701px] w-[1024px]">
            {/*Navbar*/}
            <div className="flex flex-col gap-y-8">
              {/*Header*/}
              <header className="flex h-16 items-center justify-between border-b border-gray-300/40 bg-white/40 px-12 backdrop-blur-sm">
                <h1 className="text-xl font-medium">DASHBOARD</h1>
                {/*Notifications*/}
                <div className="relative">
                  <div className="h-10 w-32 rounded-lg bg-gray-300"></div>
                  <div className="absolute right-14 top-0 flex flex-col items-start gap-y-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 a24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600">
                      <p className="text-xs text-white">3</p>
                    </div>
                  </div>
                </div>
              </header>
              {/*Profile*/}
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-6 w-6"
                >
                  {/* SVG paths go here */}
                </svg>
              </div>
            </div>
            {/* Stats */}
            <Stats />
            {/* ...Main content here... */}
            <MainContent />
          </div>
          <Sidebar />
          {/* <div className="absolute top-0 left-0 w-[200px] h-full sidebar"> */}
          {/*   <ul className="flex gap-y-4 flex-col justify-start items-center"> */}
          {/*     {links.map((link, index) => ( */}
          {/*       <li key={index}> */}
          {/*         <LinkItem {...link} /> */}
          {/*       </li> */}
          {/*     ))} */}
          {/*   </ul> */}
          {/* </div> */}
        </div>
      </div>
      {/* Logo Placeholder */}
      <svg className="absolute left-6 top-6 h-14 w-14">
        {/* SVG paths go here */}
      </svg>
    </div>
  );
}

export default Dashboard;
