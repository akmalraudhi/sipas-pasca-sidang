'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Search,
  Clock,
  LogOut,
  ChevronRight,
  Bell,
  User,
  Shield,
} from 'lucide-react';

interface SidebarProps {
  role: 'mahasiswa' | 'staf';
  onRoleToggle: () => void;
}

const mahasiswaMenus = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/pengajuan', label: 'Pengajuan Dokumen', icon: FileText },
  { href: '/riwayat', label: 'Riwayat & Status', icon: Clock },
];

const stafMenus = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/monitoring', label: 'Monitoring & Verifikasi', icon: Search },
  { href: '/riwayat', label: 'Riwayat Pengajuan', icon: Clock },
];

export default function Sidebar({ role, onRoleToggle }: SidebarProps) {
  const pathname = usePathname();
  const menus = role === 'mahasiswa' ? mahasiswaMenus : stafMenus;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col z-40" style={{ background: '#13122a', borderRight: '1px solid #2e2b45' }}>
      {/* Logo + Brand */}
      <div className="p-5 pb-4">
        <div className="flex items-center gap-3 mb-1">
          {/* Logo image */}
          <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #0ea5e9, #2563eb)', padding: '2px' }}>
            <Image
              src="/logo-sipas.jpeg"
              alt="SIPAS Logo"
              width={36}
              height={36}
              className="rounded-lg object-cover"
            />
          </div>
          <div>
            <div className="font-extrabold text-base tracking-tight" style={{ color: '#e0f2fe' }}>SIPAS</div>
            <div className="text-xs leading-tight" style={{ color: '#7dd3fc' }}>Sistem Informasi Pasca-Sidang</div>
          </div>
        </div>
        {/* Thin divider */}
        <div className="mt-4 h-px" style={{ background: 'linear-gradient(90deg, #2563eb44, #0ea5e944, transparent)' }} />
      </div>

      {/* Role Switcher */}
      <div className="px-4 mb-4">
        <button
          onClick={onRoleToggle}
          className="w-full flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all"
          style={{ background: 'rgba(14, 165, 233, 0.1)', border: '1px solid rgba(14, 165, 233, 0.25)' }}
        >
          <div className="flex items-center gap-2">
            {role === 'mahasiswa'
              ? <User size={14} style={{ color: '#38bdf8' }} />
              : <Shield size={14} style={{ color: '#38bdf8' }} />}
            <span className="text-xs font-semibold" style={{ color: '#7dd3fc' }}>
              {role === 'mahasiswa' ? 'Mahasiswa' : 'Staf PTSP'}
            </span>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full font-semibold"
            style={{ background: 'rgba(14,165,233,0.25)', color: '#bae6fd' }}>
            Ganti
          </span>
        </button>
      </div>

      {/* Nav Label */}
      <div className="px-5 mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#4a5568' }}>Menu</span>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-3 space-y-1">
        {menus.map((menu) => {
          const Icon = menu.icon;
          const isActive = pathname === menu.href;
          return (
            <Link key={menu.href} href={menu.href}>
              <div
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all"
                style={{
                  background: isActive ? 'rgba(14,165,233,0.18)' : 'transparent',
                  borderLeft: isActive ? '3px solid #38bdf8' : '3px solid transparent',
                  color: isActive ? '#bae6fd' : '#94a3b8',
                }}
              >
                <Icon size={17} />
                <span className="text-sm font-medium">{menu.label}</span>
                {isActive && <ChevronRight size={14} className="ml-auto" style={{ color: '#38bdf8' }} />}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Notification */}
      <div className="px-4 mb-3">
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer"
          style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
          <Bell size={15} style={{ color: '#f59e0b' }} />
          <span className="text-xs" style={{ color: '#fbbf24' }}>3 notifikasi baru</span>
          <span className="ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full"
            style={{ background: '#f59e0b', color: '#000' }}>3</span>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 pt-0">
        <div className="flex items-center gap-3 p-3 rounded-xl" style={{ background: '#1a1929', border: '1px solid #2e2b45' }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #0ea5e9, #2563eb)', color: '#fff' }}>
            {role === 'mahasiswa' ? 'AR' : 'ST'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold truncate" style={{ color: '#f0eeff' }}>
              {role === 'mahasiswa' ? 'Ahmad Rizki Pratama' : 'Staf PTSP Admin'}
            </div>
            <div className="text-xs truncate" style={{ color: '#6b6894' }}>
              {role === 'mahasiswa' ? '202010370311001' : 'ptsp@paramadina.ac.id'}
            </div>
          </div>
          <LogOut size={14} style={{ color: '#6b6894', cursor: 'pointer' }} />
        </div>
      </div>
    </aside>
  );
}
