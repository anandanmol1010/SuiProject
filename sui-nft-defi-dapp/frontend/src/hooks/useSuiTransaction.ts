import { useState, useCallback } from 'react';
import { TransactionBlock, RawSigner } from '@mysten/sui.js';

export interface TransactionOptions {
  target: string;
  args: (string | number | boolean)[];
  typeArguments?: string[];
  gasBudget?: number;
}

export interface TransactionState {
  loading: boolean;
  error: string | null;
  digest: string | null;
}

interface UseTransactionReturn extends TransactionState {
  runMoveCall: (options: TransactionOptions, signer: RawSigner | null) => Promise<string | null>;
  reset: () => void;
}

/**
 * Hook for executing Sui Move transactions
 * 
 * Handles transaction building, signing, and execution with error handling
 * 
 * Example usage:
 * ```tsx
 * const { runMoveCall, loading, error, digest } = useSuiTransaction();
 * 
 * const handleMint = async () => {
 *   const txDigest = await runMoveCall({
 *     target: '0xPackage::module::function',
 *     args: [name, description, uri],
 *     gasBudget: 100000,
 *   }, signer);
 * };
 * ```
 */
export function useSuiTransaction(): UseTransactionReturn {
  const [state, setState] = useState<TransactionState>({
    loading: false,
    error: null,
    digest: null,
  });

  const runMoveCall = useCallback(
    async (options: TransactionOptions, signer: RawSigner | null): Promise<string | null> => {
      if (!signer) {
        setState(prev => ({
          ...prev,
          error: 'Wallet not connected',
        }));
        return null;
      }

      setState({
        loading: true,
        error: null,
        digest: null,
      });

      try {
        // Build transaction
        const tx = new TransactionBlock();

        // Convert args to pure values
        const txArgs = options.args.map(arg => tx.pure(arg));

        // Call the move function
        tx.moveCall({
          target: options.target,
          arguments: txArgs,
          typeArguments: options.typeArguments,
        });

        // Set gas budget if provided
        if (options.gasBudget) {
          tx.setGasBudget(options.gasBudget);
        } else {
          tx.setGasBudget(100000); // Default gas budget
        }

        // Sign and execute
        const result = await signer.signAndExecuteTransactionBlock({
          transactionBlock: tx,
          options: {
            showEffects: true,
            showEvents: true,
          },
        });

        const txDigest = result.digest;

        setState({
          loading: false,
          error: null,
          digest: txDigest,
        });

        return txDigest;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        
        setState({
          loading: false,
          error: errorMessage,
          digest: null,
        });

        console.error('Transaction error:', error);
        return null;
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({
      loading: false,
      error: null,
      digest: null,
    });
  }, []);

  return {
    ...state,
    runMoveCall,
    reset,
  };
}
