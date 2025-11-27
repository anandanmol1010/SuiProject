import React, { useState } from 'react';
import { Wallet, LogOut } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { useToast } from './ToastProvider';

export function WalletConnectButton() {
  const { address, connected, connecting, connect, disconnect } = useWallet();
  const { addToast } = useToast();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleConnect = async () => {
    try {
      await connect();
      addToast('Wallet connected successfully', 'success');
    } catch (error) {
      addToast(
        error instanceof Error ? error.message : 'Failed to connect wallet',
        'error'
      );
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setShowDropdown(false);
    addToast('Wallet disconnected', 'info');
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (!connected) {
    return (
      <button
        onClick={handleConnect}
        disabled={connecting}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 disabled:opacity-50 rounded-lg font-medium transition-all"
      >
        <Wallet className="w-4 h-4" />
        {connecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium transition-all"
      >
        <Wallet className="w-4 h-4" />
        {formatAddress(address || '')}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-slate-700">
            <p className="text-xs text-slate-400">Connected Address</p>
            <p className="text-sm font-mono text-slate-200 break-all">{address}</p>
          </div>
          <button
            onClick={handleDisconnect}
            className="w-full flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
