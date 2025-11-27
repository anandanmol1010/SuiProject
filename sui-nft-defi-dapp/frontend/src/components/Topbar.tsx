import React from 'react';
import { WalletConnectButton } from './WalletConnectButton';

export function Topbar() {
  return (
    <div className="sticky top-0 z-40 bg-dark-light/80 backdrop-blur border-b border-glass">
      <div className="h-16 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
            Sui NFT + DeFi
          </h1>
        </div>
        <WalletConnectButton />
      </div>
    </div>
  );
}
