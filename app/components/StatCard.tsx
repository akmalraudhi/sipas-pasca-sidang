'use client';

import { LucideIcon, TrendingUp } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: string;
  trend?: string;
}

export default function StatCard({ title, value, subtitle, icon: Icon, color, trend }: StatCardProps) {
  return (
    <div className="rounded-2xl p-5 card-hover" style={{ background: '#0d1526', border: '1px solid #1e3a5f' }}>
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${color}20`, border: `1px solid ${color}40` }}
        >
          <Icon size={18} style={{ color }} />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-xs" style={{ color: '#10b981' }}>
            <TrendingUp size={12} />
            <span>{trend}</span>
          </div>
        )}
      </div>
      <div className="text-2xl font-bold mb-1" style={{ color: '#e0f2fe' }}>{value}</div>
      <div className="text-sm font-medium mb-0.5" style={{ color: '#e0f2fe' }}>{title}</div>
      {subtitle && <div className="text-xs" style={{ color: '#94a3b8' }}>{subtitle}</div>}
    </div>
  );
}
