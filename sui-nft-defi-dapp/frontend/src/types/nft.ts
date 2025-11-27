export interface Nft {
  id?: string;
  name: string;
  description: string;
  uri: string;
  tx?: string;
  creator?: string;
}

export interface MintFormData {
  name: string;
  description: string;
  uri: string;
}
