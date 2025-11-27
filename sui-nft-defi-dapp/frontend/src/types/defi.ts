export interface DefiAsset {
  id: string;
  name: string;
  symbol: string;
  supplyApy: number;
  borrowApy: number;
  supplied: number;
  borrowed: number;
  icon?: string;
}

export interface DefiPosition {
  assetId: string;
  type: 'deposit' | 'borrow';
  amount: number;
  apy: number;
}

export interface TxResult {
  digest: string;
  effects?: unknown;
  error?: string;
}
