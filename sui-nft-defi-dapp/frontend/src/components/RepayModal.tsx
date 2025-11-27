import React, { useState } from 'react';
import { X, Loader } from 'lucide-react';
import { useToast } from './ToastProvider';

interface RepayModalProps {
  assetId: string;
  assetName: string;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onSubmit: (amount: string) => Promise<void>;
}

export function RepayModal({
  assetId,
  assetName,
  isOpen,
  isLoading = false,
  onClose,
  onSubmit,
}: RepayModalProps) {
  const [amount, setAmount] = useState('');
  const { addToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) <= 0) {
      addToast('Please enter a valid amount', 'error');
      return;
    }

    try {
      await onSubmit(amount);
      setAmount('');
      onClose();
    } catch (error) {
      console.error('Repay error:', error);
    }
  };

  const handleMaxClick = () => {
    // TODO: Fetch user's borrow balance and set to max
    setAmount('500');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-glass rounded-lg p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Repay {assetName}</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Amount to Repay</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="flex-1 bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={handleMaxClick}
                disabled={isLoading}
                className="px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded font-medium text-sm disabled:opacity-50"
              >
                Max
              </button>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded p-3 text-sm text-slate-400">
            <p>Repaying your loan will reduce your borrow balance and interest accrual</p>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !amount}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 rounded font-medium"
            >
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Repaying...
                </>
              ) : (
                'Repay'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
