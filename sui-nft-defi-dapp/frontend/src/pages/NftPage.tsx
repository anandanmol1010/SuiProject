import React, { useState } from 'react';
import { NftMintForm } from '../components/NftMintForm';
import { NftGallery } from '../components/NftGallery';
import { Nft } from '../types/nft';
import { useWallet } from '../hooks/useWallet';

export function NftPage() {
  const { connected } = useWallet();
  const [nfts, setNfts] = useState<Nft[]>([]);

  const handleMintSuccess = (digest: string) => {
    // In a real app, you would fetch the minted NFT from the blockchain
    // For now, we'll add a placeholder to the gallery
    const newNft: Nft = {
      name: 'Recently Minted',
      description: 'View details in the Sui Explorer',
      uri: '',
      tx: digest,
    };
    setNfts(prev => [newNft, ...prev]);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">NFT Minting</h1>
        <p className="text-slate-400">
          Create and mint unique NFTs on the Sui blockchain
        </p>
      </div>

      {!connected ? (
        <div className="bg-card border border-glass rounded-lg p-8 text-center">
          <p className="text-slate-400">
            Please connect your wallet to mint NFTs
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mint Form */}
          <div className="lg:col-span-1">
            <NftMintForm onMintSuccess={handleMintSuccess} />
          </div>

          {/* Gallery */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">Your NFTs</h2>
              <p className="text-slate-400 text-sm">
                {nfts.length} NFT{nfts.length !== 1 ? 's' : ''} minted
              </p>
            </div>
            <NftGallery nfts={nfts} />
          </div>
        </div>
      )}

      {/* Info Section */}
      <div className="mt-12 bg-card border border-glass rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">How to Mint NFTs</h2>
        <div className="space-y-4 text-slate-300">
          <div>
            <h3 className="font-bold text-cyan-300 mb-2">1. Prepare Your Metadata</h3>
            <p className="text-sm">
              Host your NFT image on IPFS or use a public image URL. See the README for IPFS hosting options.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-cyan-300 mb-2">2. Fill the Form</h3>
            <p className="text-sm">
              Enter your NFT name, description, and the image URI (IPFS or HTTP URL).
            </p>
          </div>
          <div>
            <h3 className="font-bold text-cyan-300 mb-2">3. Click Mint</h3>
            <p className="text-sm">
              Click the Mint button and approve the transaction in your Sui Wallet.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-cyan-300 mb-2">4. View on Explorer</h3>
            <p className="text-sm">
              Once minted, view your NFT transaction on the Sui Explorer using the provided link.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
