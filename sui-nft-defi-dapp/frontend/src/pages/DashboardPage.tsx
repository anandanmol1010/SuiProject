import React from 'react';
import { useWallet } from '../hooks/useWallet';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function DashboardPage() {
  const { address, connected } = useWallet();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Welcome to Sui NFT + DeFi</h1>
        <p className="text-slate-400">
          Create NFTs and manage your DeFi positions on the Sui blockchain
        </p>
      </div>

      {!connected ? (
        <div className="bg-card border border-glass rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Get Started</h2>
          <p className="text-slate-400 mb-6">
            Connect your Sui wallet to begin minting NFTs and managing DeFi positions
          </p>
          <p className="text-sm text-slate-500">
            Use the wallet button in the top-right corner to connect
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Account Info */}
          <div className="bg-card border border-glass rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Account</h2>
            <div className="bg-slate-800/50 rounded p-4">
              <p className="text-sm text-slate-400">Connected Address</p>
              <p className="text-lg font-mono text-cyan-300 break-all">{address}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/nfts"
              className="bg-card border border-glass hover:border-cyan-500/50 rounded-lg p-6 transition-all group"
            >
              <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-300 transition-colors">
                NFT Minting
              </h3>
              <p className="text-slate-400 mb-4">
                Create and mint unique NFTs on the Sui blockchain
              </p>
              <div className="flex items-center gap-2 text-cyan-400">
                Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/defi"
              className="bg-card border border-glass hover:border-cyan-500/50 rounded-lg p-6 transition-all group"
            >
              <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-300 transition-colors">
                DeFi Dashboard
              </h3>
              <p className="text-slate-400 mb-4">
                Deposit, borrow, and manage your DeFi positions
              </p>
              <div className="flex items-center gap-2 text-cyan-400">
                Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          {/* Features */}
          <div className="bg-card border border-glass rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Features</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                <span className="text-slate-300">Mint NFTs with custom metadata and IPFS URIs</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                <span className="text-slate-300">View your NFT gallery with transaction history</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                <span className="text-slate-300">Deposit assets and earn supply APY</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                <span className="text-slate-300">Borrow against your collateral</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                <span className="text-slate-300">Repay loans and manage positions</span>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-6">
            <h3 className="font-bold text-blue-300 mb-2">Network: Sui Devnet</h3>
            <p className="text-sm text-blue-200">
              This dApp is configured for the Sui Devnet. Make sure your wallet is connected to devnet.
              You can request test SUI from the <a href="https://faucet.devnet.sui.io" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-100">devnet faucet</a>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
