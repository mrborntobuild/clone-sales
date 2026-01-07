
import React from 'react';
import { 
  Zap, 
  HelpCircle, 
  Bell, 
  Database 
} from 'lucide-react';
import { UserProfile } from '../types';

interface TopNavProps {
  user: UserProfile;
}

const TopNav: React.FC<TopNavProps> = ({ user }) => {
  return (
    <header className="h-[60px] border-b border-gray-200 bg-[#f8f9fa] flex items-center justify-between px-6 shrink-0">
      <div className="flex-1">
        {/* Breadcrumb or Search could go here, left empty as per image */}
      </div>

      <div className="flex items-center space-x-4">
        {/* Upgrade Button */}
        <button className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors">
          <Zap size={14} />
          <span>Upgrade your plan</span>
        </button>

        {/* Credits */}
        <div className="flex items-center space-x-1.5 text-gray-600 hover:bg-gray-100 px-2 py-1.5 rounded-md transition-colors cursor-pointer">
          <Database size={16} className="text-emerald-500" />
          <span className="text-xs font-medium">Credits</span>
        </div>

        {/* Help */}
        <button className="text-gray-500 hover:text-gray-900 p-1.5 rounded-md hover:bg-gray-100 transition-colors">
          <HelpCircle size={18} />
        </button>

        {/* Notifications */}
        <button className="text-gray-500 hover:text-gray-900 p-1.5 rounded-md hover:bg-gray-100 transition-colors">
          <Bell size={18} />
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-2 pl-2 cursor-pointer group">
          <div className="flex flex-col items-end mr-1">
            <span className="text-xs font-semibold text-gray-800 leading-tight">{user.name}</span>
            <span className="text-[10px] text-gray-400 font-medium leading-tight">{user.workspace}</span>
          </div>
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ring-white shadow-sm">
            {user.initials}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
