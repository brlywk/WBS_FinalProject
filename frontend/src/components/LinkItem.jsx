// components/LinkItem.jsx
import React from 'react';

const LinkItem = ({ title, icon, notifications }) => (
  <div className="flex gap-x-4 rounded-lg py-4 px-6 hover:bg-gray-100">
    {icon}
    <p className="flex-1">{title}</p>
    {notifications && (
      <div className="relative">
        <div className="flex items-center justify-center rounded-full bg-blue-600 w-6 h-6">
          <p className="text-xs text-white">{notifications}</p>
        </div>
      </div>
    )}
  </div>
);

export default LinkItem;