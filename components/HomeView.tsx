
import React from 'react';
import { Plus, Search, Filter, MoreHorizontal, Table as TableIcon } from 'lucide-react';

interface HomeViewProps {
  onTableClick?: (id: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onTableClick }) => {
  const mockTables = [
    { id: '1', name: 'SaaS Leads - UK', records: '1,240', status: 'COMPLETED', date: '2h ago' },
    { id: '2', name: 'YC W24 Founders', records: '450', status: 'SYNCING', date: '5h ago' },
    { id: '3', name: 'LinkedIn Outreach Export', records: '3,200', status: 'COMPLETED', date: '1d ago' },
    { id: '4', name: 'Potential Partners - Q4', records: '125', status: 'DRAFT', date: '2d ago' },
  ];

  return (
    <div className="p-10 h-full flex flex-col bg-white overflow-auto">
      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Home</h1>
          <p className="text-base text-gray-500 mt-1">Start a new list or manage your existing tables.</p>
        </div>
        <button className="flex items-center space-x-2 bg-[#111827] hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-md active:scale-95">
          <Plus size={20} className="stroke-[3px]" />
          <span>New Table</span>
        </button>
      </div>

      {/* Stats Cards - Matching Reference */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-1">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em] mb-3">Total Contacts</div>
          <div className="text-4xl font-bold text-gray-900 tracking-tighter">12,482</div>
          <div className="mt-3 text-sm text-emerald-600 font-semibold">+12% from last month</div>
        </div>
        <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-1">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em] mb-3">Active Campaigns</div>
          <div className="text-4xl font-bold text-gray-900 tracking-tighter">8</div>
          <div className="mt-3 text-sm text-blue-600 font-semibold">3 running currently</div>
        </div>
        <div className="bg-white border border-gray-200 p-8 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-1">
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.1em] mb-3">Credits Used</div>
          <div className="text-4xl font-bold text-gray-900 tracking-tighter">4,120</div>
          <div className="mt-3 text-sm text-amber-600 font-semibold">Renewing in 14 days</div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Tables</h2>
            <div className="flex items-center space-x-3">
                <div className="relative">
                    <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                        type="text" 
                        placeholder="Search tables..." 
                        className="pl-11 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:outline-none transition-all w-72 placeholder:text-gray-400"
                    />
                </div>
                <button className="p-2.5 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition-colors">
                    <Filter size={20} />
                </button>
            </div>
        </div>

        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Name</th>
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Records</th>
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Last Activity</th>
                <th className="px-8 py-5 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockTables.map((table) => (
                <tr 
                  key={table.id} 
                  className="hover:bg-gray-50/80 transition-all cursor-pointer group"
                  onClick={() => onTableClick?.(table.id)}
                >
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                            <TableIcon size={20} />
                        </div>
                        <span className="text-base font-semibold text-gray-900">{table.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className="text-base text-gray-600 font-medium">{table.records}</span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider ${
                      table.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 
                      table.status === 'SYNCING' ? 'bg-blue-50 text-blue-700 border border-blue-100' : 
                      'bg-gray-50 text-gray-500 border border-gray-100'
                    }`}>
                      {table.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-base text-gray-400">
                    {table.date}
                  </td>
                  <td className="px-8 py-5 whitespace-nowrap text-right">
                    <button className="p-2 text-gray-300 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all">
                      <MoreHorizontal size={22} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-6 border-t border-gray-100 flex justify-center">
            <button className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors">
                View all tables
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
