import React, { useState } from 'react';
import { DefiDashboard } from '../components/DefiDashboard';
import { DepositModal } from '../components/DepositModal';
import { BorrowModal } from '../components/BorrowModal';
import { RepayModal } from '../components/RepayModal';
import { getMockAssets } from '../lib/defiApi';
import { useWallet } from '../hooks/useWallet';
import { useToast } from '../components/ToastProvider';
import { DefiAsset } from '../types/defi';

export function DefiPage() {
  const { connected } = useWallet();
  const { addToast } = useToast();
  const [assets] = useState<DefiAsset[]>(getMockAssets());

  const [depositModal, setDepositModal] = useState<{ isOpen: boolean; assetId: string; assetName: string }>({
    isOpen: false,
    assetId: '',
    assetName: '',
  });

  const [borrowModal, setBorrowModal] = useState<{ isOpen: boolean; assetId: string; assetName: string }>({
    isOpen: false,
    assetId: '',
    assetName: '',
  });

  const [repayModal, setRepayModal] = useState<{ isOpen: boolean; assetId: string; assetName: string }>({
    isOpen: false,
    assetId: '',
    assetName: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleDeposit = (assetId: string) => {
    const asset = assets.find(a => a.id === assetId);
    if (asset) {
      setDepositModal({
        isOpen: true,
        assetId,
        assetName: asset.name,
      });
    }
  };

  const handleBorrow = (assetId: string) => {
    const asset = assets.find(a => a.id === assetId);
    if (asset) {
      setBorrowModal({
        isOpen: true,
        assetId,
        assetName: asset.name,
      });
    }
  };

  const handleRepay = (assetId: string) => {
    const asset = assets.find(a => a.id === assetId);
    if (asset) {
      setRepayModal({
        isOpen: true,
        assetId,
        assetName: asset.name,
      });
    }
  };

  const handleDepositSubmit = async (amount: string) => {
    setIsLoading(true);
    try {
      // TODO: Integrate with real DeFi protocol
      addToast(`Deposit of ${amount} ${depositModal.assetName} submitted (demo mode)`, 'info');
      setDepositModal({ isOpen: false, assetId: '', assetName: '' });
    } catch (error) {
      addToast('Deposit failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBorrowSubmit = async (amount: string) => {
    setIsLoading(true);
    try {
      // TODO: Integrate with real DeFi protocol
      addToast(`Borrow of ${amount} ${borrowModal.assetName} submitted (demo mode)`, 'info');
      setBorrowModal({ isOpen: false, assetId: '', assetName: '' });
    } catch (error) {
      addToast('Borrow failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRepaySubmit = async (amount: string) => {
    setIsLoading(true);
    try {
      // TODO: Integrate with real DeFi protocol
      addToast(`Repay of ${amount} ${repayModal.assetName} submitted (demo mode)`, 'info');
      setRepayModal({ isOpen: false, assetId: '', assetName: '' });
    } catch (error) {
      addToast('Repay failed', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">DeFi Dashboard</h1>
        <p className="text-slate-400">
          Manage your lending positions and earn yield
        </p>
      </div>

      {!connected ? (
        <div className="bg-card border border-glass rounded-lg p-8 text-center">
          <p className="text-slate-400">
            Please connect your wallet to access DeFi features
          </p>
        </div>
      ) : (
        <>
          <DefiDashboard
            assets={assets}
            onDeposit={handleDeposit}
            onBorrow={handleBorrow}
            onRepay={handleRepay}
          />

          {/* Info Section */}
          <div className="mt-12 bg-card border border-glass rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">About DeFi</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                This DeFi dashboard is currently in demo mode. The assets and APY rates shown are simulated.
              </p>
              <p>
                To integrate a real DeFi protocol, see the README for integration points with Suilend or NAVI.
              </p>
              <p className="text-sm text-slate-400">
                Current implementation: Placeholder contract at <code className="bg-slate-800 px-2 py-1 rounded">0xDEFI_PACKAGE</code>
              </p>
            </div>
          </div>
        </>
      )}

      {/* Modals */}
      <DepositModal
        assetId={depositModal.assetId}
        assetName={depositModal.assetName}
        isOpen={depositModal.isOpen}
        isLoading={isLoading}
        onClose={() => setDepositModal({ isOpen: false, assetId: '', assetName: '' })}
        onSubmit={handleDepositSubmit}
      />

      <BorrowModal
        assetId={borrowModal.assetId}
        assetName={borrowModal.assetName}
        isOpen={borrowModal.isOpen}
        isLoading={isLoading}
        onClose={() => setBorrowModal({ isOpen: false, assetId: '', assetName: '' })}
        onSubmit={handleBorrowSubmit}
      />

      <RepayModal
        assetId={repayModal.assetId}
        assetName={repayModal.assetName}
        isOpen={repayModal.isOpen}
        isLoading={isLoading}
        onClose={() => setRepayModal({ isOpen: false, assetId: '', assetName: '' })}
        onSubmit={handleRepaySubmit}
      />
    </div>
  );
}
