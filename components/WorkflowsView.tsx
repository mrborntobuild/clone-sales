
import React from 'react';
import { Plus, Search, List, Grid, MoreHorizontal, Zap } from 'lucide-react';
import WorkflowCanvas from './WorkflowCanvas';

interface WorkflowsViewProps {
  workspaceName: string;
  isEditing: boolean;
  onToggleEdit: (isEditing: boolean) => void;
}

const WorkflowsView: React.FC<WorkflowsViewProps> = ({ workspaceName, isEditing, onToggleEdit }) => {
  const myWorkflows = [
    { id: 'w1', name: 'Inbound Enrichment', edited: '17 hours ago' },
    { id: 'w2', name: 'LinkedIn Lead Scan', edited: '2 days ago' },
    { id: 'w3', name: 'Daily Signal Monitor', edited: '3 days ago' },
  ];

  if (isEditing) {
    return <WorkflowCanvas onBack={() => onToggleEdit(false)} />;
  }

  return (
    <div className="flex flex-col h-full bg-white overflow-auto">
      {/* My Workflows Section */}
      <div className="px-8 pt-8 pb-12 flex-1">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-gray-900">My workflows</h2>
          <div className="flex items-center space-x-2">
            <div className="relative group">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/50 w-64 transition-all"
              />
            </div>
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-1">
              <button className="p-1.5 text-gray-400 hover:text-gray-900 transition-colors">
                <List size={18} />
              </button>
              <button className="p-1.5 text-gray-900 bg-white border border-gray-100 rounded-md shadow-sm">
                <Grid size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {/* Create New Card */}
          <div className="group cursor-pointer" onClick={() => onToggleEdit(true)}>
            <div className="aspect-[4/3] bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center space-y-3 group-hover:border-emerald-500/50 group-hover:bg-emerald-50/30 transition-all">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
                <Plus size={24} strokeWidth={2.5} />
              </div>
              <span className="text-xs font-bold text-gray-400 group-hover:text-emerald-600 transition-colors uppercase tracking-widest">New Workflow</span>
            </div>
          </div>

          {/* Workflow Cards */}
          {myWorkflows.map((workflow) => (
            <div key={workflow.id} className="group cursor-pointer" onClick={() => onToggleEdit(true)}>
              <div className="aspect-[4/3] bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-center mb-3 group-hover:border-emerald-500/30 group-hover:bg-white group-hover:shadow-lg group-hover:shadow-emerald-500/5 transition-all relative overflow-hidden">
                <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-emerald-500 shadow-sm group-hover:scale-110 transition-transform">
                  <Zap size={28} />
                </div>
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none p-6">
                  <div className="w-full h-full border-2 border-dashed border-gray-900 rounded-xl flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-gray-900 rounded-md rotate-45"></div>
                  </div>
                </div>
              </div>
              <div className="px-1 flex items-center justify-between">
                <div className="overflow-hidden">
                  <h3 className="text-sm font-bold text-gray-900 mb-0.5 truncate">{workflow.name}</h3>
                  <p className="text-[11px] text-gray-400 font-medium">Last edited {workflow.edited}</p>
                </div>
                <button className="p-1 text-gray-300 hover:text-gray-900 transition-colors shrink-0">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkflowsView;
