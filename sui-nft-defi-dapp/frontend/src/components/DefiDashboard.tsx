import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { DefiAsset } from '../types/defi';

interface DefiDashboardProps {
  assets: DefiAsset[];
  onDeposit: (assetId: string) => void;
  onBorrow: (assetId: string) => void;
  onRepay: (assetId: string) => void;
}

export function DefiDashboard({
  assets,
  onDeposit,
  onBorrow,
  onRepay,
}: DefiDashboardProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    }
    if (num >= 1000) {
      return `$${(num / 1000).toFixed(2)}K`;
    }
    return `$${num.toFixed(2)}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {assets.map(asset => (
        <div key={asset.id} className="bg-card border border-glass rounded-lg p-6 space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-cyan-300">{asset.name}</h3>
              <p className="text-sm text-slate-400">{asset.symbol}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded p-3">
              <p className="text-xs text-slate-400 mb-1">Supply APY</p>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <p className="text-lg font-bold text-green-400">{asset.supplyApy}%</p>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded p-3">
              <p className="text-xs text-slate-400 mb-1">Borrow APY</p>
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-400" />
                <p className="text-lg font-bold text-red-400">{asset.borrowApy}%</p>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded p-3">
              <p className="text-xs text-slate-400 mb-1">Total Supplied</p>
              <p className="text-lg font-bold text-slate-200">{formatNumber(asset.supplied)}</p>
            </div>

            <div className="bg-slate-800/50 rounded p-3">
              <p className="text-xs text-slate-400 mb-1">Total Borrowed</p>
              <p className="text-lg font-bold text-slate-200">{formatNumber(asset.borrowed)}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onDeposit(asset.id)}
              className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-sm font-medium transition-colors"
            >
              Deposit
            </button>
            <button
              onClick={() => onBorrow(asset.id)}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors"
            >
              Borrow
            </button>
            <button
              onClick={() => onRepay(asset.id)}
              className="px-3 py-2 bg-orange-600 hover:bg-orange-700 rounded text-sm font-medium transition-colors"
            >
              Repay
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
