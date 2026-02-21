import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Truck, LayoutDashboard, Car, Navigation, Wrench, Fuel, Users, BarChart3, LogOut, Menu, X } from 'lucide-react';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Vehicles', icon: Car, path: '/vehicles' },
    { name: 'Drivers', icon: Users, path: '/drivers' },
    { name: 'Trips', icon: Navigation, path: '/trips' },
    { name: 'Maintenance', icon: Wrench, path: '/maintenance' },
    { name: 'Fuel & Expenses', icon: Fuel, path: '/fuel-expenses' },
    { name: 'Analytics', icon: BarChart3, path: '/analytics' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const routeBackgrounds = {
    '/dashboard': '/assets/backgrounds/fleet_bg.svg',
    '/vehicles': '/assets/backgrounds/fleet_bg.svg',
    '/drivers': '/assets/backgrounds/network_bg.svg',
    '/trips': '/assets/backgrounds/network_bg.svg',
    '/maintenance': '/assets/backgrounds/maintenance_bg.svg',
    '/fuel-expenses': '/assets/backgrounds/maintenance_bg.svg',
    '/analytics': '/assets/backgrounds/network_bg.svg',
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-[#0f172a] text-white transition-all duration-300 flex flex-col shadow-xl z-20`}>
        {/* ... existing sidebar code ... */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          {sidebarOpen && (
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Truck className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold font-heading tracking-tight text-white">FleetFlow</h1>
                <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-semibold">Logistics Pro</p>
              </div>
            </div>
          )}
          {!sidebarOpen && (
            <div className="p-2 bg-primary/10 rounded-lg mx-auto">
              <Truck className="w-8 h-8 text-primary" />
            </div>
          )}
          <button
            data-testid="sidebar-toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 hover:bg-slate-800 rounded-md transition-colors text-slate-400 hover:text-white"
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                data-testid={`nav-link-${item.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive
                  ? 'bg-primary text-white shadow-md shadow-primary/20'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                  }`}
              >
                <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                {sidebarOpen && <span className="text-sm font-semibold">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-slate-800">
          {sidebarOpen ? (
            <div className="space-y-3">
              <div className="px-4 py-3 bg-slate-800/40 border border-slate-700/50 rounded-xl">
                <p className="text-xs font-bold text-white truncate">{user?.name}</p>
                <p className="text-[10px] text-slate-500 truncate mb-1">{user?.email}</p>
                <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary/10 text-[10px] text-primary font-bold uppercase tracking-wider">
                  {user?.role}
                </div>
              </div>
              <button
                data-testid="logout-btn"
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-red-500/10 hover:text-red-500 text-slate-400 rounded-lg transition-all duration-200 text-xs font-bold border border-transparent hover:border-red-500/20"
              >
                <LogOut size={14} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
            >
              <LogOut size={18} className="mx-auto" />
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-background relative">
        {/* Subtle Background Pattern Layer */}
        <div
          className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none"
          style={{
            backgroundImage: `url(${routeBackgrounds[location.pathname] || '/assets/backgrounds/network_bg.svg'})`,
            backgroundSize: '600px',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat'
          }}
        />

        {/* Content Layer */}
        <div className="relative z-10 min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;