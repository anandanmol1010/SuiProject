import { JsonRpcProvider, devnetConnection } from '@mysten/sui.js';

// REPLACE_ME: Update this to your actual devnet RPC endpoint or custom RPC
const RPC_URL = 'https://fullnode.devnet.sui.io:443';

export const suiClient = new JsonRpcProvider(devnetConnection);

/**
 * Get the Sui Explorer URL for a transaction digest
 * @param digest - Transaction digest
 * @returns Full explorer URL
 */
export function getExplorerUrl(digest: string): string {
  // REPLACE_ME: Change 'devnet' to 'testnet' or 'mainnet' if needed
  return `https://explorer.sui.io/txblock/${digest}?network=devnet`;
}

/**
 * Get the Sui Explorer URL for an object ID
 * @param objectId - Object ID
 * @returns Full explorer URL
 */
export function getObjectExplorerUrl(objectId: string): string {
  return `https://explorer.sui.io/object/${objectId}?network=devnet`;
}

export default suiClient;
