import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Image, TrendingUp } from 'lucide-react';

export function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/nfts', label: 'NFTs', icon: Image },
    { path: '/defi', label: 'DeFi', icon: TrendingUp },
  ];

  return (
    <div className="w-64 bg-dark-light/50 border-r border-glass h-screen sticky top-0 flex flex-col">
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(({ path, label, icon: Icon }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive(path)
                ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-500/30 text-cyan-300'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-glass">
        <p className="text-xs text-slate-500">Devnet</p>
        <p className="text-xs text-slate-400 mt-1">Connected to Sui Devnet</p>
      </div>
    </div>
  );
}
