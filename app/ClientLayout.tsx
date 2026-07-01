'use client';

import { useState } from 'react';
import Sidebar from './components/Sidebar';
import { UserRole } from './lib/data';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>('mahasiswa');

  return (
    <div className="flex min-h-screen">
      <Sidebar role={role} onRoleToggle={() => setRole(r => r === 'mahasiswa' ? 'staf' : 'mahasiswa')} />
      <main className="flex-1 ml-64 min-h-screen" style={{ background: '#0f0e17' }}>
        {children}
      </main>
    </div>
  );
}
