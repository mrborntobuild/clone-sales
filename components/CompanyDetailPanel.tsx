
import React, { useState } from 'react';
import { 
  X, 
  Maximize2, 
  Minimize2,
  PlusCircle, 
  ExternalLink, 
  Building2, 
  Globe, 
  Users, 
  MapPin, 
  ChevronUp, 
  MoreHorizontal,
  Sparkles,
  ClipboardList,
  Target,
  BarChart3
} from 'lucide-react';
import { TableRow } from '../types';

interface CompanyDetailPanelProps {
  row: TableRow;
  onClose: () => void;
}

const CompanyDetailPanel: React.FC<CompanyDetailPanelProps> = ({ row, onClose }) => {
  const [isEnlarged, setIsEnlarged] = useState(false);

  return (
    <div 
      className={`absolute inset-y-0 right-0 ${isEnlarged ? 'w-[950px]' : 'w-[600px]'} bg-[#f8f9fa] border-l border-gray-200 shadow-2xl z-50 flex flex-col transition-all duration-300 ease-in-out animate-in slide-in-from-right`}
    >
      {/* Header */}
      <div className="px-6 py-4 bg-[#1e293b] text-white flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center font-bold shadow-lg">
            {row.company.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold tracking-tight">{row.company}</h2>
              <Building2 size={16} className="text-slate-400" />
            </div>
            <p className="text-xs text-slate-400 font-medium">{row.industry} • {row.location}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border border-slate-700">
            <PlusCircle size={14} />
            <span>Add to list</span>
          </button>
          <button className="flex items-center space-x-2 bg-amber-400 hover:bg-amber-500 text-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm">
            <Globe size={14} />
            <span>Access website</span>
          </button>
          <div className="flex items-center space-x-1 ml-2">
            <button 
              onClick={() => setIsEnlarged(!isEnlarged)}
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              title={isEnlarged ? "Collapse" : "Enlarge"}
            >
              {isEnlarged ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Main Info Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                   <div className="w-6 h-6 bg-indigo-100 rounded flex items-center justify-center">
                      <Target size={12} className="text-indigo-600" />
                   </div>
                   <span className="text-xs font-bold text-gray-800">Targeting Strategy: {row.buyerRole}</span>
                </div>
                <div className="flex items-center space-x-2">
                   <MoreHorizontal size={14} className="text-gray-400" />
                   <ChevronUp size={16} className="text-gray-400" />
                </div>
             </div>
             <div className="p-6">
                <div className="flex items-center space-x-6 border-b border-gray-100 mb-6">
                  <button className="pb-3 text-xs font-bold text-gray-900 border-b-2 border-gray-900 uppercase tracking-widest">Account Analysis</button>
                </div>
                
                <p className="text-sm text-gray-600 leading-relaxed mb-8 font-medium italic">
                  "{row.accountAnalysis}"
                </p>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Industry</span>
                      <p className="text-sm font-bold text-gray-900">{row.industry}</p>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Buyer Role</span>
                      <div className="flex items-center space-x-1.5">
                         <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{row.buyerRole}</span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</span>
                      <div className="flex items-center space-x-1.5">
                         <MapPin size={14} className="text-gray-400" />
                         <p className="text-sm font-bold text-gray-900">{row.location}</p>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Deal Signal</span>
                      <div className="flex items-center space-x-1.5">
                         <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
                         <p className="text-sm font-bold text-gray-900">{row.signals}</p>
                      </div>
                    </div>
                  </div>
                </div>
             </div>
          </div>
          
          {/* AI Insights Section */}
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl">
              <div className="flex items-center space-x-2 mb-3">
                <ClipboardList size={14} className="text-emerald-600" />
                <h4 className="text-[10px] font-bold text-emerald-900 uppercase tracking-widest">Detailed Account Analysis</h4>
              </div>
              <p className="text-sm text-emerald-800 leading-relaxed font-medium">
                {row.accountAnalysis} This account shows high potential due to recent expansion signals.
              </p>
            </div>

            <div className="bg-rose-50 border border-rose-100 p-5 rounded-2xl">
              <div className="flex items-center space-x-2 mb-3">
                <Sparkles size={14} className="text-rose-600" />
                <h4 className="text-[10px] font-bold text-rose-900 uppercase tracking-widest">Buyer Role Analysis</h4>
              </div>
              <p className="text-sm text-rose-800 leading-relaxed font-bold">
                {row.buyerRoleAnalysis}
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-5 rounded-2xl">
              <div className="flex items-center space-x-2 mb-3">
                <BarChart3 size={14} className="text-blue-600" />
                <h4 className="text-[10px] font-bold text-blue-900 uppercase tracking-widest">Industry Landscape</h4>
              </div>
              <p className="text-sm text-blue-800 leading-relaxed font-medium">
                {row.industryAnalysis}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailPanel;
