'use client';

import { TrendingUp } from 'lucide-react';

export default function StatCard({ title, value, subtitle, icon: Icon, color, trend }) {
  return (
    <div className="rounded-2xl p-6 bg-white border border-gray-100 shadow-md shadow-gray-100/50 hover:scale-[1.01] hover:border-blue-100 transition-all duration-200">
      <div className="flex items-start justify-between mb-5">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform"
          style={{ backgroundColor: `${color}10`, border: `1px solid ${color}30` }}
        >
          <Icon size={20} style={{ color: color }} />
        </div>
        
        {trend && (
          <div className="flex items-center gap-1 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wide text-green-700 uppercase">
            <TrendingUp size={12} />
            <span>{trend}</span>
          </div>
        )}
      </div>

      <div className="space-y-0.5">
        <div className="text-2xl sm:text-3xl font-black tracking-tight text-[#1E293B]">
          {value}
        </div>
        <div className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider">
          {title}
        </div>
        {subtitle && (
          <div className="text-xs text-gray-400 font-medium pt-1 leading-relaxed">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
