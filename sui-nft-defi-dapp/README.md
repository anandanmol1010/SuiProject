# Sui NFT + DeFi dApp

A complete, production-ready monorepo for building an NFT minting and DeFi lending dApp on the Sui blockchain. Includes Move smart contracts, a modern React frontend, and integrated wallet connectivity.

## Prerequisites

- **Node.js** >= 18 (with npm)
- **Git**
- **Sui CLI** (install via `cargo install --locked --git https://github.com/MystenLabs/sui.git --branch devnet sui`)
- **Sui Wallet Extension** (browser extension for signing transactions)

## Project Structure

```
sui-nft-defi-dapp/
├── contracts/
│   ├── nft/                    # NFT minting contract
│   │   ├── Move.toml
│   │   └── sources/
│   │       └── my_nft.move
│   └── defi_example/           # DeFi lending demo contract
│       ├── Move.toml
│       └── sources/
│           └── defi_demo.move
├── frontend/                   # React + Vite + Tailwind
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tsconfig.json
│   ├── tailwind.config.cjs
│   └── postcss.config.cjs
└── README.md
```

## Quick Start

### 1. Build and Publish Move Contracts

#### Build the NFT package:
```bash
cd contracts/nft
sui move build
```

#### Publish to devnet:
```bash
sui client publish --gas-budget 100000
```

This will output a transaction digest and the published package address. **Save the package address** — you'll need it in the next step.

Example output:
```
Transaction Digest: 0x1234...
Published Objects:
  - Package ID: 0xNFT_PACKAGE_ADDRESS_HERE
```

#### Repeat for DeFi package:
```bash
cd ../defi_example
sui move build
sui client publish --gas-budget 100000
```

### 2. Update Package Addresses in Frontend

After publishing, replace the placeholder addresses in:

**File: `frontend/src/lib/suiClient.ts`**
- Find: `0xNFT_PACKAGE`
- Replace with: your actual NFT package address

**File: `frontend/src/lib/defiApi.ts`**
- Find: `0xDEFI_PACKAGE`
- Replace with: your actual DeFi package address

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (or the next available port).

### 5. Test the Mint Flow

1. Open the app in your browser
2. Click **"Connect Wallet"** in the top-right and approve the connection
3. Navigate to **NFTs** page
4. Fill in the mint form:
   - **Name**: e.g., "My First NFT"
   - **Description**: e.g., "A test NFT"
   - **Image URI**: Use an IPFS URL or public image URL (see IPFS section below)
5. Click **Mint**
6. Approve the transaction in your Sui Wallet
7. View the transaction in the Sui Explorer link shown in the success toast

### 6. Test DeFi Features

1. Navigate to **DeFi** page
2. View mock asset data (SUI, USDC)
3. Click **Deposit**, **Borrow**, or **Repay** to open modals
4. Enter amounts and submit (currently shows simulated responses)

## Using IPFS for Metadata

To use real IPFS URIs for NFT images:

### Option A: Using Pinata (Easy)
1. Sign up at [pinata.cloud](https://pinata.cloud)
2. Upload your image file
3. Copy the IPFS hash (e.g., `QmXxxx...`)
4. Use URI format: `ipfs://QmXxxx...` or `https://gateway.pinata.cloud/ipfs/QmXxxx...`

### Option B: Using NFT.storage (Free)
1. Sign up at [nft.storage](https://nft.storage)
2. Upload your image
3. Copy the IPFS CID
4. Use URI: `ipfs://QmXxxx...`

### Option C: Using a Public IPFS Gateway
```bash
# Upload via curl
curl -X POST https://api.nft.storage/upload \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F file=@image.png
```

Then paste the returned IPFS URI into the mint form.

## Configuration

### Devnet RPC Endpoint

The frontend is configured to use the **Sui Devnet** RPC by default. To change:

**File: `frontend/src/lib/suiClient.ts`**
```typescript
// Change this line:
const RPC_URL = 'https://fullnode.devnet.sui.io:443';

// To your custom RPC (e.g., testnet or mainnet):
const RPC_URL = 'https://fullnode.testnet.sui.io:443';
```

Available endpoints:
- **Devnet**: `https://fullnode.devnet.sui.io:443`
- **Testnet**: `https://fullnode.testnet.sui.io:443`
- **Mainnet**: `https://fullnode.mainnet.sui.io:443`

## Integration Points

### Adding a Real DeFi Protocol

The DeFi module is currently a placeholder. To integrate a real protocol:

1. **Suilend Integration**:
   - Install: `npm install @suilend/sdk`
   - Update `frontend/src/lib/defiApi.ts` (marked with `TODO: Integrate Suilend SDK`)
   - Reference: [Suilend Docs](https://docs.suilend.fi)

2. **NAVI Integration**:
   - Install: `npm install navi-sdk`
   - Update `frontend/src/lib/defiApi.ts`
   - Reference: [NAVI Docs](https://docs.naviprotocol.io)

3. **Custom Protocol**:
   - Update the Move contract in `contracts/defi_example/sources/defi_demo.move`
   - Implement deposit, borrow, repay logic
   - Update `defiApi.ts` to call your contract functions

### Adding More NFT Features

- **Metadata Standard**: Update `my_nft.move` to follow [Sui NFT Standard](https://docs.sui.io/standards/nft)
- **Collections**: Add collection management in the Move contract
- **Royalties**: Implement royalty logic in the mint function
- **Marketplace**: Add trading functionality in the frontend

## Build for Production

```bash
cd frontend
npm run build
```

Output will be in `frontend/dist/`. Deploy to Vercel, Netlify, or your hosting provider.

## Troubleshooting

### "Wallet not connected"
- Ensure Sui Wallet extension is installed
- Click "Connect Wallet" and approve the connection
- Check browser console for errors

### "Transaction failed"
- Verify you have enough SUI for gas (at least 0.1 SUI on devnet)
- Check the error message in the toast notification
- View full transaction details in the Sui Explorer

### "Package not found"
- Ensure you've published the Move contracts
- Verify the package addresses in `frontend/src/lib/suiClient.ts` match your published packages
- Use `sui client objects` to list your published packages

### "RPC connection failed"
- Check your internet connection
- Verify the RPC endpoint in `frontend/src/lib/suiClient.ts` is correct
- Try switching to a different RPC endpoint

## Development Tips

### Hot Reload
The frontend uses Vite for fast hot module replacement. Changes to React components will reflect immediately in the browser.

### TypeScript Checking
```bash
cd frontend
npx tsc --noEmit
```

### Linting (optional)
```bash
npm install --save-dev eslint
npx eslint src/
```

## File Reference

| File | Purpose |
|------|---------|
| `contracts/nft/sources/my_nft.move` | NFT minting contract |
| `contracts/defi_example/sources/defi_demo.move` | DeFi lending demo contract |
| `frontend/src/lib/suiClient.ts` | Sui RPC client configuration |
| `frontend/src/lib/nftApi.ts` | NFT contract interaction functions |
| `frontend/src/lib/defiApi.ts` | DeFi contract interaction functions |
| `frontend/src/hooks/useWallet.ts` | Wallet connection hook |
| `frontend/src/hooks/useSuiTransaction.ts` | Transaction execution hook |
| `frontend/src/pages/NftPage.tsx` | NFT minting UI |
| `frontend/src/pages/DefiPage.tsx` | DeFi dashboard UI |

## Resources

- **Sui Docs**: https://docs.sui.io
- **Move Language**: https://move-language.github.io
- **Sui Explorer**: https://explorer.sui.io
- **Devnet Faucet**: https://faucet.devnet.sui.io

## License

MIT

## Support

For issues or questions:
1. Check the Troubleshooting section above
2. Review the Sui documentation
3. Check browser console for error messages
4. Inspect transactions in the Sui Explorer
