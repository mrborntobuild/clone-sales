
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Share2, 
  Download, 
  MoreVertical, 
  Link as LinkIcon, 
  Sparkles, 
  Building2, 
  Users, 
  MapPin, 
  Zap,
  UserCheck,
  ClipboardList,
  Target,
  BarChart3,
  Linkedin,
  ChevronDown,
  Globe,
  X
} from 'lucide-react';
import { TableRow } from '../types';
import CompanyDetailPanel from './CompanyDetailPanel';

interface TableViewProps {
  title?: string;
}

const TableView: React.FC<TableViewProps> = ({ title = "Prospects" }) => {
  const [selectedRow, setSelectedRow] = useState<TableRow | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: '', website: '' });
  
  const [rows, setRows] = useState<TableRow[]>([
    { 
      id: '1', 
      company: 'Acme Corp', 
      website: 'acme.com', 
      linkedin: 'linkedin.com/acme', 
      status: 'Completed', 
      buyerRole: 'VP of Sales',
      accountAnalysis: 'Aggressive growth in EMEA; high churn in mid-market.',
      buyerRoleAnalysis: 'Prioritizes sales velocity and quota attainment tools.',
      industryAnalysis: 'SaaS market consolidating; shift toward AI automation.',
      industry: 'Software',
      size: '1,000+',
      location: 'New York, US',
      signals: 'Series C funding'
    },
    { 
      id: '2', 
      company: 'Globex', 
      website: 'globex.co', 
      linkedin: 'linkedin.com/globex', 
      status: 'Syncing', 
      buyerRole: 'Head of Growth',
      accountAnalysis: 'Focusing on PLG motion; strong engineering culture.',
      buyerRoleAnalysis: 'Needs scalable enrichment for automated outreach.',
      industryAnalysis: 'Manufacturing digital transformation is accelerating.',
      industry: 'Manufacturing',
      size: '500-1,000',
      location: 'Tokyo, JP',
      signals: 'Expansion to EU'
    },
    { 
      id: '3', 
      company: 'Soylent Corp', 
      website: 'soylent.io', 
      linkedin: 'linkedin.com/soylent', 
      status: 'Completed', 
      buyerRole: 'CTO',
      accountAnalysis: 'Technical debt is high; looking for efficiency.',
      buyerRoleAnalysis: 'Security-first buyer; values data privacy compliance.',
      industryAnalysis: 'Biotech funding remains stable but selective.',
      industry: 'Biotech',
      size: '50-200',
      location: 'San Francisco, US',
      signals: 'New Patent Filed'
    },
    { 
      id: '4', 
      company: 'Initech', 
      website: 'initech.com', 
      linkedin: 'linkedin.com/initech', 
      status: 'Draft', 
      buyerRole: 'Product Manager',
      accountAnalysis: 'Product-led growth focus; heavy user research.',
      buyerRoleAnalysis: 'Data-driven; obsessed with conversion metrics.',
      industryAnalysis: 'Enterprise software moving toward modularity.',
      industry: 'Enterprise Software',
      size: '150-500',
      location: 'Austin, US',
      signals: 'Mass Hiring'
    }
  ]);

  const columns = [
    { key: 'company', label: 'Company', icon: <Building2 size={12} className="text-gray-400" />, width: '220px' },
    { key: 'buyerRole', label: 'Buyer Role', icon: <UserCheck size={12} className="text-indigo-400" />, width: '180px' },
    { key: 'accountAnalysis', label: 'Account Analysis', icon: <ClipboardList size={12} className="text-emerald-400" />, width: '280px' },
    { key: 'buyerRoleAnalysis', label: 'Buyer Role Analysis', icon: <Target size={12} className="text-rose-400" />, width: '280px' },
    { key: 'industryAnalysis', label: 'Industry Analysis', icon: <BarChart3 size={12} className="text-blue-400" />, width: '280px' },
    { key: 'industry', label: 'Industry', icon: <Building2 size={12} className="text-gray-400" />, width: '150px' },
    { key: 'size', label: 'Size', icon: <Users size={12} className="text-gray-400" />, width: '120px' },
    { key: 'location', label: 'Location', icon: <MapPin size={12} className="text-gray-400" />, width: '150px' },
    { key: 'signals', label: 'Deal Signals', icon: <Zap size={12} className="text-amber-500" />, width: '180px' },
    { key: 'linkedin', label: 'LinkedIn', icon: <Linkedin size={12} className="text-blue-600" />, width: '200px' },
    { key: 'website', label: 'Website', icon: <Globe size={12} className="text-blue-400" />, width: '180px' },
  ];

  const handleBuyerRoleChange = (id: string, newRole: string) => {
    setRows(prev => prev.map(row => {
      if (row.id === id) {
        const analysisMap: Record<string, string> = {
          'VP of Sales': 'Prioritizes sales velocity and quota attainment tools.',
          'CTO': 'Security-first buyer; values data privacy compliance.',
          'CEO': 'Strategic thinker; focused on long-term ROI and vision.',
          'Head of Growth': 'Needs scalable enrichment for automated outreach.',
          'Product Manager': 'Data-driven; obsessed with conversion metrics.'
        };
        return { 
          ...row, 
          buyerRole: newRole,
          buyerRoleAnalysis: analysisMap[newRole] || `Personalized insights for ${newRole}...`
        };
      }
      return row;
    }));
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Table Header Controls */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
        <div className="flex items-center space-x-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-none">{title}</h2>
            <p className="text-[10px] text-gray-400 mt-1.5 uppercase font-bold tracking-widest">{rows.length} Records Total</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative mr-2">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500/20 focus:outline-none w-56 placeholder:text-gray-400" />
          </div>
          <button className="flex items-center space-x-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter size={14} />
            <span>Filter</span>
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center space-x-1.5 px-4 py-1.5 bg-[#111827] text-white rounded-lg text-xs font-semibold hover:bg-gray-800 shadow-sm transition-all active:scale-95"
          >
            <Plus size={14} strokeWidth={3} />
            <span>Add Company</span>
          </button>
          <div className="h-6 w-px bg-gray-100 mx-2"></div>
          <button className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
            <Share2 size={18} />
          </button>
          <button className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* Spreadsheet Component */}
      <div className="flex-1 overflow-auto relative custom-scrollbar">
        <table className="w-full border-separate border-spacing-0">
          <thead className="sticky top-0 z-20 bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-12 border-b border-r border-gray-200 bg-gray-50 text-[10px] font-bold text-gray-400 text-center uppercase tracking-widest py-3">#</th>
              {columns.map((col) => (
                <th key={col.key} className="px-4 py-3 border-b border-r border-gray-200 text-left bg-gray-50" style={{ minWidth: col.width }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {col.icon}
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{col.label}</span>
                    </div>
                    <MoreVertical size={14} className="text-gray-300 cursor-pointer hover:text-gray-500" />
                  </div>
                </th>
              ))}
              <th className="border-b border-gray-200 bg-gray-50 p-3 w-12 text-center">
                <Plus 
                  size={14} 
                  className="text-gray-400 mx-auto hover:text-emerald-500 cursor-pointer transition-colors" 
                  onClick={() => setIsAddModalOpen(true)}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr 
                key={row.id} 
                className={`group transition-colors cursor-pointer ${selectedRow?.id === row.id ? 'bg-emerald-50' : 'hover:bg-emerald-50/20'}`}
                onClick={() => setSelectedRow(row)}
              >
                <td className="border-b border-r border-gray-100 bg-gray-50/50 text-[10px] font-bold text-gray-400 text-center py-4">{idx + 1}</td>
                
                {/* Company */}
                <td className="px-4 py-4 border-b border-r border-gray-100 text-sm font-semibold text-gray-900">{row.company}</td>
                
                {/* Buyer Role Dropdown */}
                <td className="px-4 py-4 border-b border-r border-gray-100 text-sm">
                  <div className="relative group/select">
                    <select 
                      value={row.buyerRole} 
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleBuyerRoleChange(row.id, e.target.value);
                      }}
                      className="appearance-none w-full bg-indigo-50/50 text-indigo-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-indigo-100/50 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all cursor-pointer hover:bg-indigo-100"
                    >
                      <option>VP of Sales</option>
                      <option>CTO</option>
                      <option>CEO</option>
                      <option>Head of Growth</option>
                      <option>Product Manager</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none group-hover/select:text-indigo-600 transition-colors" />
                  </div>
                </td>

                {/* Account Analysis */}
                <td className="px-4 py-4 border-b border-r border-gray-100 text-sm text-gray-700 italic font-medium leading-tight">{row.accountAnalysis}</td>
                
                {/* Buyer Role Analysis */}
                <td className="px-4 py-4 border-b border-r border-gray-100 text-sm">
                  <div className="flex items-start space-x-2">
                    <Sparkles size={14} className="text-rose-400 shrink-0 mt-0.5" />
                    <span className="text-gray-900 font-bold leading-tight">{row.buyerRoleAnalysis}</span>
                  </div>
                </td>

                {/* Industry Analysis */}
                <td className="px-4 py-4 border-b border-r border-gray-100 text-sm text-gray-600 leading-snug">{row.industryAnalysis}</td>

                {/* Industry */}
                <td className="px-4 py-4 border-b border-r border-gray-100 text-sm font-medium text-gray-700">{row.industry}</td>

                {/* Size */}
                <td className="px-4 py-4 border-b border-r border-gray-100 text-sm font-medium text-gray-500">{row.size}</td>

                {/* Location */}
                <td className="px-4 py-4 border-b border-r border-gray-100 text-sm">
                  <div className="flex items-center space-x-1.5 text-gray-600 font-medium">
                    <MapPin size={12} className="text-gray-400" />
                    <span>{row.location}</span>
                  </div>
                </td>

                {/* Signals */}
                <td className="px-4 py-4 border-b border-r border-gray-100 text-sm">
                   <span className="px-2 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-md border border-amber-100 whitespace-nowrap">
                     {row.signals}
                   </span>
                </td>

                {/* LinkedIn */}
                <td className="px-4 py-4 border-b border-r border-gray-100 text-sm">
                   <a 
                     href={`https://${row.linkedin}`} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     onClick={(e) => e.stopPropagation()}
                     className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                   >
                     <Linkedin size={14} className="shrink-0" />
                     <span className="truncate font-medium underline underline-offset-4 decoration-blue-200">{row.linkedin}</span>
                   </a>
                </td>

                {/* Website */}
                <td className="px-4 py-4 border-b border-r border-gray-100 text-sm text-blue-600 font-medium underline underline-offset-4 decoration-blue-100">{row.website}</td>
                
                <td className="border-b border-gray-100 bg-white group-hover:bg-emerald-50/20 transition-colors"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Company Modal Overlay */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 px-4">
           <div className="bg-white w-full max-w-[640px] rounded-[32px] shadow-2xl p-10 relative animate-in zoom-in-95 duration-200">
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="absolute right-8 top-8 p-1 text-gray-400 hover:text-gray-900 transition-colors"
              >
                <X size={20} />
              </button>

              <div className="space-y-2 mb-10">
                <h2 className="text-[28px] font-bold text-gray-900 tracking-tight">Add New Account</h2>
                <p className="text-[17px] text-gray-500 leading-relaxed max-w-lg">
                  Add a new company account to your sales pipeline. This will enable analysis and tracking.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-2.5">
                  <label className="text-[15px] font-bold text-gray-900">Company Name *</label>
                  <input 
                    type="text" 
                    placeholder="TechCorp Solutions"
                    autoFocus
                    className="w-full px-5 py-4 bg-white border-2 border-sky-400 rounded-2xl text-[17px] font-medium text-gray-900 focus:outline-none ring-4 ring-sky-500/10 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[15px] font-bold text-gray-900">Website *</label>
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="techcorp.com, www.techcorp.io, or ht"
                      className="w-full px-5 py-4 bg-white border border-gray-200 rounded-2xl text-[17px] font-medium text-gray-900 focus:outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-500/10 transition-all shadow-sm"
                    />
                    <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
                      Enter any format: domain.com, www.domain.com, https://domain.com, or subdomain.domain.co
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3">
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-8 py-3.5 border border-gray-200 rounded-xl text-[15px] font-bold text-gray-900 hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button 
                  className="px-8 py-3.5 bg-[#10b981] hover:bg-[#059669] text-white rounded-xl text-[15px] font-bold transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  Find Account
                </button>
              </div>
           </div>
        </div>
      )}

      {/* Footer / Status Bar */}
      <div className="h-10 border-t border-gray-100 bg-[#fafafa] px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-1.5 text-[10px] font-bold text-emerald-600 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            <span>Account Intelligence Active</span>
          </div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Record Enrichment Mode</span>
        </div>
        <div className="flex items-center space-x-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <span className="text-indigo-600">Dynamic UI enabled</span>
          <span className="w-px h-3 bg-gray-200"></span>
          <span>{rows.length} Rows Visible</span>
        </div>
      </div>

      {/* Company Detail Panel Slide-over */}
      {selectedRow && (
        <CompanyDetailPanel 
          row={selectedRow} 
          onClose={() => setSelectedRow(null)} 
        />
      )}
    </div>
  );
};

export default TableView;
