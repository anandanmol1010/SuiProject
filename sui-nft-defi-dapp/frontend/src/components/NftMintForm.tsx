import React, { useState } from 'react';
import { Loader, Send } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { useSuiTransaction } from '../hooks/useSuiTransaction';
import { useToast } from './ToastProvider';
import { buildMintTransaction } from '../lib/nftApi';
import { getExplorerUrl } from '../lib/suiClient';
import { MintFormData } from '../types/nft';

interface NftMintFormProps {
  onMintSuccess?: (digest: string) => void;
}

export function NftMintForm({ onMintSuccess }: NftMintFormProps) {
  const { address, connected } = useWallet();
  const { runMoveCall, loading, error } = useSuiTransaction();
  const { addToast } = useToast();

  const [formData, setFormData] = useState<MintFormData>({
    name: '',
    description: '',
    uri: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!connected) {
      addToast('Please connect your wallet first', 'error');
      return;
    }

    if (!formData.name || !formData.description || !formData.uri) {
      addToast('Please fill in all fields', 'error');
      return;
    }

    try {
      // Build the transaction
      const tx = buildMintTransaction(formData);

      // Get signer from wallet
      const wallet = (window as any).sui;
      if (!wallet) {
        addToast('Wallet not available', 'error');
        return;
      }

      // Sign and execute
      const result = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
        options: {
          showEffects: true,
          showEvents: true,
        },
      });

      const digest = result.digest;

      // Show success toast with explorer link
      addToast('NFT minted successfully!', 'success', 0, {
        label: 'View on Explorer',
        onClick: () => window.open(getExplorerUrl(digest), '_blank'),
      });

      // Reset form
      setFormData({
        name: '',
        description: '',
        uri: '',
      });

      // Call callback
      onMintSuccess?.(digest);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to mint NFT';
      addToast(errorMsg, 'error');
      console.error('Mint error:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-glass rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Mint NFT</h2>

      {address && (
        <div className="bg-slate-800/50 border border-slate-700 rounded p-3">
          <p className="text-xs text-slate-400">Creator Address</p>
          <p className="text-sm font-mono text-cyan-300">{address}</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-2">NFT Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., My First NFT"
          className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your NFT..."
          rows={3}
          className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          disabled={loading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Image/Metadata URI</label>
        <input
          type="text"
          name="uri"
          value={formData.uri}
          onChange={handleChange}
          placeholder="https://... or ipfs://..."
          className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          disabled={loading}
        />
        <p className="text-xs text-slate-400 mt-2">
          Use an IPFS URL (ipfs://...) or public image URL. See README for IPFS hosting options.
        </p>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-700 rounded p-3">
          <p className="text-sm text-red-200">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !connected}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-medium transition-all"
      >
        {loading ? (
          <>
            <Loader className="w-4 h-4 animate-spin" />
            Minting...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Mint NFT
          </>
        )}
      </button>

      {!connected && (
        <p className="text-sm text-yellow-400 text-center">
          Please connect your wallet to mint NFTs
        </p>
      )}
    </form>
  );
}
