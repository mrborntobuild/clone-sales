
import React from 'react';
import { Building2, Users, MapPin, Globe, Edit3, MoreHorizontal } from 'lucide-react';
import { CompanyInfo } from '../types';

interface CompanyViewProps {
  company: CompanyInfo;
}

const CompanyView: React.FC<CompanyViewProps> = ({ company }) => {
  return (
    <div className="flex flex-col h-full bg-white overflow-auto">
      {/* Profile Header Background */}
      <div className="h-48 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 shrink-0 border-b border-gray-100 relative">
        <div className="absolute -bottom-12 left-10 p-1 bg-white rounded-2xl border border-gray-100 shadow-xl">
           <div className="w-24 h-24 bg-emerald-600 rounded-xl flex items-center justify-center text-white text-3xl font-black tracking-tighter">
              {company.logo}
           </div>
        </div>
      </div>

      <div className="px-10 pt-16 pb-10 flex flex-col space-y-8">
        {/* Basic Info */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">{company.name}</h1>
            <div className="flex items-center space-x-4 text-sm font-semibold text-gray-500">
              <div className="flex items-center space-x-1.5">
                <Building2 size={16} className="text-emerald-500" />
                <span>{company.industry}</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <div className="flex items-center space-x-1.5">
                <Users size={16} className="text-blue-500" />
                <span>{company.employeeCount}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all">
              <Edit3 size={16} />
              <span>Edit Profile</span>
            </button>
            <button className="p-2 border border-gray-200 rounded-xl text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Detailed Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 space-y-4">
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">About the Company</h2>
              <p className="text-gray-700 leading-relaxed font-medium">
                {company.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                 <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Location</h3>
                 <div className="flex items-center space-x-3">
                    <MapPin size={20} className="text-emerald-500" />
                    <span className="text-sm font-bold text-gray-900">London, United Kingdom</span>
                 </div>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                 <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Website</h3>
                 <div className="flex items-center space-x-3">
                    <Globe size={20} className="text-blue-500" />
                    <span className="text-sm font-bold text-blue-600 underline underline-offset-4 decoration-blue-200">henrygrowth.io</span>
                 </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
             <div className="bg-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-100">
                <h3 className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest mb-4">Account Status</h3>
                <div className="space-y-4">
                   <div>
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                         <span>Credits Usage</span>
                         <span>82%</span>
                      </div>
                      <div className="w-full bg-emerald-800/40 rounded-full h-1.5 overflow-hidden">
                         <div className="bg-white h-full w-[82%]"></div>
                      </div>
                   </div>
                   <p className="text-[11px] font-medium text-emerald-100 leading-relaxed">
                      Your company is currently on the Pro plan with active AI enrichment enabled.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyView;
