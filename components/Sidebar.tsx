
import React, { useState } from 'react';
import { 
  Home, 
  Zap, 
  Settings,
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';
import { NavView, CompanyInfo } from '../types';

interface SidebarProps {
  activeView: NavView;
  onViewChange: (view: NavView) => void;
  company: CompanyInfo;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, company }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    { id: 'prospects', label: 'Prospects', icon: Home },
    { id: 'workflows', label: 'Workflows', icon: Zap },
  ];

  const renderItem = (item: any) => {
    const isActive = activeView === item.id;
    const Icon = item.icon;

    return (
      <button
        key={item.id}
        onClick={() => onViewChange(item.id as NavView)}
        className={`w-full flex items-center rounded-lg text-sm transition-all mb-1 group relative ${
          isCollapsed ? 'justify-center px-0 py-2.5' : 'space-x-3 px-3 py-2.5'
        } ${
          isActive 
            ? 'bg-[#f4f4f5] text-[#09090b] font-semibold shadow-sm border border-gray-100' 
            : 'text-[#71717a] hover:bg-gray-50 hover:text-gray-900'
        }`}
      >
        <Icon 
          size={20} 
          className={`${isActive ? 'text-[#09090b]' : 'text-[#a1a1aa]'} shrink-0`} 
          strokeWidth={isActive ? 2.5 : 2} 
        />
        {!isCollapsed && <span className="tracking-tight whitespace-nowrap">{item.label}</span>}
        
        {isCollapsed && (
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
            {item.label}
          </div>
        )}
      </button>
    );
  };

  return (
    <aside 
      className={`flex flex-col h-full bg-white border-r border-gray-200 py-6 transition-all duration-300 ease-in-out relative ${
        isCollapsed ? 'w-20 px-3' : 'w-[280px] px-4'
      }`}
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-900 shadow-sm z-50 transition-colors"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* App Logo */}
      <div 
        className={`flex items-center mb-8 cursor-pointer shrink-0 transition-all ${
          isCollapsed ? 'justify-center px-0' : 'space-x-2 px-2'
        }`} 
        onClick={() => onViewChange('prospects')}
      >
        <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-100 shrink-0">
            <div className="w-4 h-4 border-2 border-white rounded-sm rotate-45"></div>
        </div>
        {!isCollapsed && <span className="text-xl font-bold tracking-tight text-gray-900">EnableU</span>}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {!isCollapsed && (
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-2 mb-3">Workspace</div>
        )}
        <div className="space-y-1">
          {navItems.map(renderItem)}
        </div>
      </div>

      {/* Bottom Section */}
      <div className={`pt-4 border-t border-gray-100 shrink-0 ${isCollapsed ? 'space-y-2' : 'space-y-4'}`}>
        <button
          onClick={() => onViewChange('settings' as NavView)}
          className={`w-full flex items-center rounded-lg text-sm transition-all group relative ${
            isCollapsed ? 'justify-center px-0 py-2' : 'space-x-3 px-3 py-2'
          } ${
            activeView === 'settings' 
              ? 'bg-[#f4f4f5] text-[#09090b] font-semibold' 
              : 'text-[#71717a] hover:bg-gray-100'
          }`}
        >
          <Settings 
            size={20} 
            className="text-[#a1a1aa] shrink-0" 
            strokeWidth={activeView === 'settings' ? 2.5 : 2} 
          />
          {!isCollapsed && <span className="tracking-tight whitespace-nowrap">Settings</span>}
          
          {isCollapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
              Settings
            </div>
          )}
        </button>

        {/* Company Info Card */}
        {!isCollapsed ? (
          <div className="bg-[#fcfcfc] border border-gray-100 rounded-2xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:border-emerald-200 transition-colors group cursor-default">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-[#059669] rounded-xl flex items-center justify-center text-white text-[10px] font-black shrink-0 shadow-sm">
                {company.logo}
              </div>
              <div className="overflow-hidden">
                <h3 className="text-[15px] font-bold text-[#0f172a] truncate tracking-tight leading-tight mb-1">{company.name}</h3>
                <p className="text-[10px] font-bold text-[#10b981] truncate uppercase tracking-widest leading-none">
                  {company.industry}
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="inline-flex items-center text-[10px] font-bold text-[#4b5563] uppercase tracking-wider bg-[#f1f5f9] px-2 py-1 rounded-md">
                 {company.employeeCount} STAFF
              </div>
              <p className="text-[13px] text-[#64748b] leading-relaxed font-medium italic border-l-[3px] border-emerald-100 pl-3">
                "{company.description.length > 60 ? company.description.substring(0, 60) + '...' : company.description}"
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-2">
            <div className="w-10 h-10 bg-[#059669] rounded-xl flex items-center justify-center text-white text-[8px] font-black shrink-0 shadow-sm cursor-help group relative">
              {company.logo}
              <div className="absolute left-full ml-4 w-48 p-3 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
                <h4 className="text-xs font-bold text-gray-900 mb-1">{company.name}</h4>
                <p className="text-[10px] text-emerald-600 font-bold uppercase">{company.industry}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
