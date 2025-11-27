import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ToastProvider } from './components/ToastProvider';
import { DashboardPage } from './pages/DashboardPage';
import { NftPage } from './pages/NftPage';
import { DefiPage } from './pages/DefiPage';
import './App.css';

function App() {
  return (
    <Router>
      <ToastProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/nfts" element={<NftPage />} />
            <Route path="/defi" element={<DefiPage />} />
          </Routes>
        </Layout>
      </ToastProvider>
    </Router>
  );
}

export default App;
