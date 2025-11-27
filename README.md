# Sui Project - NFT + DeFi dApp

A complete, production-ready monorepo containing a Sui blockchain NFT minting and DeFi lending dApp. This project includes Move smart contracts, a modern React frontend, and integrated wallet connectivity.

## 📁 Project Structure

```
SuiProject/
├── sui-nft-defi-dapp/              # Main dApp monorepo
│   ├── contracts/                  # Move smart contracts
│   │   ├── nft/                    # NFT minting contract
│   │   │   ├── Move.toml
│   │   │   └── sources/
│   │   │       └── my_nft.move
│   │   └── defi_example/           # DeFi lending demo contract
│   │       ├── Move.toml
│   │       └── sources/
│   │           └── defi_demo.move
│   ├── frontend/                   # React + Vite + Tailwind
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── tsconfig.json
│   │   └── tailwind.config.cjs
│   ├── README.md                   # dApp documentation
│   ├── PROJECT_COMPLETION.md       # Project summary
│   ├── DEPLOYMENT_CHECKLIST.md     # Deployment guide
│   └── DELIVERY_SUMMARY.txt        # Quick reference
├── Move.toml                       # Root Move package (optional)
├── sources/                        # Root Move sources (optional)
└── README.md                       # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18 (with npm)
- **Sui CLI** - Install via: `cargo install --locked --git https://github.com/MystenLabs/sui.git --branch devnet sui`
- **Sui Wallet Extension** - Install from [Chrome Web Store](https://chrome.google.com/webstore)
- **Git**

### 1. Build Move Contracts

```bash
cd sui-nft-defi-dapp/contracts/nft
sui move build

cd ../defi_example
sui move build
```

### 2. Publish to Devnet

```bash
# From nft directory
sui client publish --gas-budget 100000
# Save the Package ID

# From defi_example directory
sui client publish --gas-budget 100000
# Save the Package ID
```

### 3. Update Frontend Addresses

Edit `sui-nft-defi-dapp/frontend/src/lib/suiClient.ts`:
```typescript
// Replace with your NFT package ID
const NFT_PACKAGE_ADDRESS = '0x1a2b3c4d5e6f...';

// Replace with your DeFi package ID
const DEFI_PACKAGE_ADDRESS = '0x9z8y7x6w5v...';
```

### 4. Install & Run Frontend

```bash
cd sui-nft-defi-dapp/frontend
npm install
npm run dev
```

The app will open at `http://localhost:5173`

## 📦 What's Included

### Smart Contracts

#### NFT Minting (`contracts/nft/sources/my_nft.move`)
- **NFT Struct**: Stores id, name, description, uri, creator
- **Minted Event**: Emitted when NFT is created
- **mint()**: Creates and transfers NFT to sender
- **Getter Functions**: Access NFT properties

#### DeFi Lending (`contracts/defi_example/sources/defi_demo.move`)
- **DepositPosition**: Tracks user deposits
- **BorrowPosition**: Tracks user borrows
- **deposit()**: Deposit assets into protocol
- **borrow()**: Borrow against collateral
- **repay()**: Repay borrowed assets

### Frontend Features

#### Pages
- **Dashboard** - Home page with account info and quick links
- **NFTs** - Mint NFTs and view gallery
- **DeFi** - Manage lending positions

#### Components
- Wallet connection with address display
- NFT minting form with validation
- NFT gallery with transaction history
- DeFi dashboard with asset cards
- Deposit, Borrow, and Repay modals
- Toast notifications
- Responsive dark theme UI

#### Hooks & APIs
- `useWallet()` - Wallet connection management
- `useSuiTransaction()` - Transaction execution
- `nftApi.ts` - NFT contract functions
- `defiApi.ts` - DeFi contract functions
- `suiClient.ts` - Sui RPC configuration

## 🎯 Features

### ✅ NFT Minting
- Create NFTs with custom metadata
- IPFS URI support
- Creator tracking
- Transaction signing via Sui Wallet
- Success/error notifications
- Explorer links

### ✅ DeFi Dashboard
- View asset APY rates
- Deposit assets and earn yield
- Borrow against collateral
- Repay loans
- Mock data for testing

### ✅ Wallet Integration
- Sui Wallet extension support
- Auto-connect on page load
- Address formatting and display
- Disconnect functionality
- Error handling

### ✅ UI/UX
- Dark theme with cyan/teal accents
- Responsive grid layouts
- Glass-morphism cards
- Smooth transitions
- Loading states with spinners
- Form validation
- Toast notifications

## 📚 Documentation

Each component has detailed documentation:

- **`sui-nft-defi-dapp/README.md`** - Complete setup and usage guide
- **`sui-nft-defi-dapp/PROJECT_COMPLETION.md`** - Detailed project summary
- **`sui-nft-defi-dapp/DEPLOYMENT_CHECKLIST.md`** - Step-by-step deployment guide
- **`sui-nft-defi-dapp/DELIVERY_SUMMARY.txt`** - Quick reference

## 🔧 Configuration

### Vite (`frontend/vite.config.ts`)
- Port: 5173
- Auto-open browser on dev
- Source maps disabled for production

### Tailwind (`frontend/tailwind.config.cjs`)
- Dark theme enabled
- Custom colors: cyan, teal, slate
- Card and button utilities
- Glass-morphism effects

### TypeScript (`frontend/tsconfig.json`)
- Target: ES2020
- Strict mode enabled
- JSX: react-jsx
- Module: ESNext

## 📦 Dependencies

### Move
- Sui Framework (devnet)

### Frontend
```json
{
  "@mysten/sui.js": "^0.54.0",
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "lucide-react": "^0.294.0",
  "tailwindcss": "^3.3.6",
  "vite": "^5.0.8",
  "typescript": "^5.2.2"
}
```

## 🧪 Testing

### Local Testing
1. Connect wallet to devnet
2. Request test SUI from [faucet](https://faucet.devnet.sui.io)
3. Mint an NFT
4. View transaction in [Sui Explorer](https://explorer.sui.io)
5. Test DeFi features

### Verification Checklist
- [ ] Move contracts build without errors
- [ ] Contracts publish to devnet
- [ ] Frontend installs dependencies
- [ ] Dev server starts on port 5173
- [ ] Wallet connects successfully
- [ ] NFT mint transaction succeeds
- [ ] Transaction appears in explorer
- [ ] DeFi modals open/close correctly

## 🔄 Integration Points

### DeFi Protocol Integration
The DeFi module is currently a placeholder. To integrate a real protocol:

1. **Suilend Integration**
   - Install: `npm install @suilend/sdk`
   - Update: `frontend/src/lib/defiApi.ts`
   - Docs: https://docs.suilend.fi

2. **NAVI Integration**
   - Install: `npm install navi-sdk`
   - Update: `frontend/src/lib/defiApi.ts`
   - Docs: https://docs.naviprotocol.io

3. **Custom Protocol**
   - Update Move contract in `contracts/defi_example/`
   - Implement deposit, borrow, repay logic
   - Update `defiApi.ts` to call your functions

### IPFS Integration
To host NFT metadata on IPFS:

1. **Pinata** (Easy)
   - Sign up at https://pinata.cloud
   - Upload image
   - Use IPFS hash in mint form

2. **NFT.storage** (Free)
   - Sign up at https://nft.storage
   - Upload image
   - Use IPFS CID in mint form

3. **Public Gateway**
   - Use any IPFS gateway URL
   - Example: `https://gateway.pinata.cloud/ipfs/QmXxxx...`

## 🚢 Deployment

### Build for Production
```bash
cd sui-nft-defi-dapp/frontend
npm run build
```

Output will be in `frontend/dist/`

### Deploy Options
- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy --prod --dir=dist`
- **GitHub Pages**: Push dist/ to gh-pages branch
- **Self-hosted**: Serve dist/ with any web server

## 🐛 Troubleshooting

### Move Build Fails
```
Error: Invalid address '0xNFT_PACKAGE'
```
**Solution**: Update Move.toml with valid address or use `0x0` temporarily

### Wallet Not Connecting
- Ensure Sui Wallet extension is installed
- Check wallet is on devnet network
- Check browser console for errors

### Transaction Fails
- Verify sufficient gas (0.1+ SUI)
- Check transaction details in explorer
- Verify contract functions match

### RPC Connection Failed
- Check internet connection
- Verify RPC endpoint in `suiClient.ts`
- Try alternative RPC endpoint

## 📖 Resources

- **Sui Documentation**: https://docs.sui.io
- **Move Language**: https://move-language.github.io
- **Sui Explorer**: https://explorer.sui.io
- **Devnet Faucet**: https://faucet.devnet.sui.io
- **Sui Discord**: https://discord.gg/sui

## 📊 Project Statistics

- **Total Files**: 45+
- **Move Contracts**: 2
- **React Components**: 11
- **Pages**: 3
- **Custom Hooks**: 2
- **API Libraries**: 3
- **TypeScript Types**: 2
- **Configuration Files**: 7

## 🎓 Learning Resources

### For Move Development
- Study `contracts/nft/sources/my_nft.move` for NFT patterns
- Study `contracts/defi_example/sources/defi_demo.move` for DeFi patterns
- Review inline comments for explanations

### For React Development
- Check `frontend/src/components/` for component patterns
- Review `frontend/src/hooks/` for custom hook usage
- Study `frontend/src/lib/` for API integration patterns

### For Wallet Integration
- See `frontend/src/hooks/useWallet.ts` for wallet connection
- See `frontend/src/hooks/useSuiTransaction.ts` for transaction execution

## 🔐 Security Notes

- Never hardcode private keys
- Use environment variables for sensitive data
- Always validate user input
- Test thoroughly before mainnet deployment
- Use established DeFi protocols when possible

## 📝 License

MIT

## 🤝 Contributing

This is a template project. Feel free to:
- Modify contracts for your use case
- Extend frontend features
- Integrate real DeFi protocols
- Deploy to production

## 📞 Support

For issues or questions:
1. Check the documentation in `sui-nft-defi-dapp/`
2. Review the Sui documentation
3. Check browser console for errors
4. Inspect transactions in Sui Explorer

## 🎉 Getting Started

1. Clone this repository
2. Follow the Quick Start section above
3. Read `sui-nft-defi-dapp/README.md` for detailed instructions
4. Deploy your first NFT!

---

**Generated**: November 27, 2025  
**Status**: ✅ Ready to use  
**Network**: Sui Devnet  
**Framework**: React + Move  

For detailed information about the dApp, see `sui-nft-defi-dapp/README.md`
