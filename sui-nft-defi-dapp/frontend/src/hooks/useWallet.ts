import { useState, useEffect, useCallback } from 'react';
import { RawSigner, JsonRpcProvider } from '@mysten/sui.js';
import suiClient from '../lib/suiClient';

interface WalletState {
  address: string | null;
  connected: boolean;
  connecting: boolean;
}

interface UseWalletReturn extends WalletState {
  connect: () => Promise<void>;
  disconnect: () => void;
  getSigner: () => RawSigner | null;
}

/**
 * Hook for managing Sui wallet connection
 * 
 * Supports the browser Sui Wallet extension via window.sui
 * 
 * Example usage:
 * ```tsx
 * const { address, connected, connect, disconnect } = useWallet();
 * 
 * if (connected) {
 *   return <div>Connected: {address}</div>;
 * }
 * 
 * return <button onClick={connect}>Connect Wallet</button>;
 * ```
 * 
 * For custom wallet adapters, replace the window.sui logic with your adapter
 */
export function useWallet(): UseWalletReturn {
  const [state, setState] = useState<WalletState>({
    address: null,
    connected: false,
    connecting: false,
  });

  const [signer, setSigner] = useState<RawSigner | null>(null);

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Check if Sui Wallet extension is available
        if (typeof window !== 'undefined' && (window as any).sui) {
          const wallet = (window as any).sui;
          
          // Try to get connected accounts
          const accounts = await wallet.getAccounts();
          if (accounts && accounts.length > 0) {
            const address = accounts[0];
            setState({
              address,
              connected: true,
              connecting: false,
            });

            // Create signer from wallet
            const newSigner = new RawSigner(
              await wallet.getPublicKey(),
              suiClient
            );
            setSigner(newSigner);
          }
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    };

    checkConnection();
  }, []);

  const connect = useCallback(async () => {
    setState(prev => ({ ...prev, connecting: true }));
    
    try {
      if (typeof window === 'undefined' || !(window as any).sui) {
        throw new Error('Sui Wallet extension not found. Please install it from https://chrome.google.com/webstore');
      }

      const wallet = (window as any).sui;
      
      // Request connection
      const result = await wallet.requestPermissions();
      
      if (result.accounts && result.accounts.length > 0) {
        const address = result.accounts[0];
        setState({
          address,
          connected: true,
          connecting: false,
        });

        // Create signer from wallet
        const publicKey = await wallet.getPublicKey();
        const newSigner = new RawSigner(publicKey, suiClient);
        setSigner(newSigner);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setState(prev => ({
        ...prev,
        connecting: false,
      }));
      throw error;
    }
  }, []);

  const disconnect = useCallback(() => {
    setState({
      address: null,
      connected: false,
      connecting: false,
    });
    setSigner(null);
  }, []);

  const getSigner = useCallback((): RawSigner | null => {
    return signer;
  }, [signer]);

  return {
    ...state,
    connect,
    disconnect,
    getSigner,
  };
}
