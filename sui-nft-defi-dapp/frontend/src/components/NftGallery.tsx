import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Nft } from '../types/nft';
import { getExplorerUrl } from '../lib/suiClient';

interface NftGalleryProps {
  nfts: Nft[];
}

export function NftGallery({ nfts }: NftGalleryProps) {
  if (nfts.length === 0) {
    return (
      <div className="bg-card border border-glass rounded-lg p-12 text-center">
        <p className="text-slate-400">No NFTs minted yet. Create your first NFT above!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {nfts.map((nft, index) => (
        <div key={index} className="bg-card border border-glass rounded-lg overflow-hidden hover:border-cyan-500/50 transition-all">
          {/* Image */}
          <div className="aspect-square bg-slate-800 flex items-center justify-center overflow-hidden">
            {nft.uri && nft.uri.startsWith('http') ? (
              <img
                src={nft.uri}
                alt={nft.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            ) : null}
            {(!nft.uri || !nft.uri.startsWith('http')) && (
              <div className="text-slate-500 text-center">
                <p className="text-sm">IPFS/Metadata</p>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-bold text-lg text-cyan-300">{nft.name}</h3>
              <p className="text-sm text-slate-400 line-clamp-2">{nft.description}</p>
            </div>

            {nft.creator && (
              <div className="text-xs text-slate-500">
                <p>Creator: {nft.creator.slice(0, 10)}...</p>
              </div>
            )}

            {nft.tx && (
              <a
                href={getExplorerUrl(nft.tx)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                View Transaction
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
