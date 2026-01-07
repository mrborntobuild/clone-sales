
import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { LucideIcon } from 'lucide-react';

interface N8NNodeData {
  label: string;
  subtitle?: string;
  icon: LucideIcon;
  color: string;
  type: 'trigger' | 'action' | 'utility';
}

const N8NNode = ({ data, selected }: NodeProps<N8NNodeData>) => {
  const Icon = data.icon;

  return (
    <div className={`
      relative min-w-[240px] bg-white rounded-xl shadow-lg border-2 transition-all duration-200
      ${selected ? 'border-emerald-500 ring-4 ring-emerald-500/10' : 'border-gray-100'}
      hover:shadow-xl hover:border-gray-200
    `}>
      {/* Inputs */}
      {data.type !== 'trigger' && (
        <Handle
          type="target"
          position={Position.Left}
          className="!w-3 !h-3 !bg-white !border-2 !border-gray-300 hover:!border-emerald-500 transition-colors !-left-1.5"
        />
      )}

      <div className="flex items-center p-3">
        {/* Icon Container */}
        <div className={`
          w-12 h-12 rounded-lg flex items-center justify-center shrink-0 shadow-sm
          ${data.color} text-white
        `}>
          {Icon ? <Icon size={24} strokeWidth={2.5} /> : <div className="w-6 h-6 border-2 border-white/20 rounded-full" />}
        </div>

        {/* Content */}
        <div className="ml-3 overflow-hidden">
          <div className="text-[13px] font-bold text-gray-900 truncate leading-tight">
            {data.label}
          </div>
          <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 truncate">
            {data.subtitle || 'Ready to configure'}
          </div>
        </div>
      </div>

      {/* Progress/Status Bar */}
      <div className="h-1 bg-gray-50 rounded-b-xl overflow-hidden">
        <div className={`h-full ${data.type === 'trigger' ? 'bg-emerald-500' : 'bg-indigo-500'} opacity-30`} style={{ width: '100%' }}></div>
      </div>

      {/* Outputs */}
      <Handle
        type="source"
        position={Position.Right}
        className="!w-3 !h-3 !bg-white !border-2 !border-gray-300 hover:!border-emerald-500 transition-colors !-right-1.5"
      />
    </div>
  );
};

export default memo(N8NNode);
