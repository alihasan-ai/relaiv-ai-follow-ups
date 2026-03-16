import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, FileText, BarChart3, Megaphone, ScrollText, LogOut, ShieldCheck } from 'lucide-react';

const adminNav = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/customers', icon: Users, label: 'Customers' },
  { to: '/admin/templates', icon: FileText, label: 'AI Templates' },
  { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/admin/broadcast', icon: Megaphone, label: 'Broadcast' },
  { to: '/admin/logs', icon: ScrollText, label: 'System Logs' },
];

const AdminLayout = () => {
  const { adminLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <aside className="hidden md:flex w-60 flex-col bg-slate-900 border-r border-slate-800 fixed inset-y-0 left-0 z-40">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span className="font-bold text-base text-slate-100">Relaiv Admin</span>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {adminNav.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive ? 'bg-primary/10 text-primary font-medium' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`
              }
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-800">
          <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-slate-200" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </aside>
      <main className="flex-1 md:ml-60 text-slate-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
