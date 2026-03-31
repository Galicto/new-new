import React, { useState } from 'react';
import { useWallet } from '@txnlab/use-wallet-react';
import { ellipseAddress } from '../utils/ellipseAddress';
import { usePredX } from '../context/PredXContext';
import ConnectWallet from './ConnectWallet';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { activeAddress } = useWallet();
  const { currentPage, navigate } = usePredX();
  const [openWalletModal, setOpenWalletModal] = useState<boolean>(false);

  const toggleWalletModal = () => setOpenWalletModal(!openWalletModal);

  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'markets', label: 'Markets', icon: 'insert_chart' },
    { id: 'leaderboard', label: 'Leaderboard', icon: 'leaderboard' },
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', fill: true },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-8 h-16 md:h-20 bg-[#101419]/60 backdrop-blur-xl bg-gradient-to-b from-[#7C3AED]/5 to-transparent shadow-[0_20px_40px_rgba(0,255,163,0.08)]">
        <div className="flex items-center gap-6 md:gap-12">
          <div 
            className="text-2xl font-black text-[#00FFA3] tracking-tighter font-headline cursor-pointer"
            onClick={() => navigate('home')}
          >
            PredX
          </div>
          <nav className="hidden md:flex items-center gap-6 md:gap-8 font-headline text-sm tracking-wide">
            {navItems.map(item => (
              <a 
                key={item.id}
                className={currentPage === item.id 
                  ? "text-[#00FFA3] font-bold border-b-2 border-[#00FFA3] px-3 py-1 cursor-pointer" 
                  : "text-[#e0e2ea] opacity-70 hover:bg-[#31353b] hover:text-[#00FFA3] transition-all duration-300 px-3 py-1 rounded cursor-pointer"
                }
                onClick={() => navigate(item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/10">
            <span className="material-symbols-outlined text-on-surface-variant text-sm mr-2 opacity-50">search</span>
            <input className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm w-48 text-on-surface font-label placeholder:text-on-surface-variant/50" placeholder="Search markets..." type="text" />
          </div>
          
          {activeAddress && (
            <div className="hidden sm:flex items-center bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant/10 gap-2">
              <div className="w-2 h-2 rounded-full bg-primary-container pulse-dot"></div>
              <span className="text-on-surface-variant text-xs font-label">{ellipseAddress(activeAddress, 4)}</span>
            </div>
          )}
          
          <button
            className="bg-primary-container text-on-primary font-headline font-bold px-4 md:px-6 py-2 md:py-2.5 rounded-full scale-95 active:scale-90 transition-transform hover:shadow-[0_0_15px_rgba(0,255,163,0.4)] text-sm"
            onClick={toggleWalletModal}
          >
            {activeAddress ? 'Connected' : 'Connect'}
          </button>
        </div>
      </header>

      {/* SideNavBar */}
      <aside className="fixed left-0 top-16 md:top-20 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] w-64 bg-[#101419] border-r border-[#3a4a3f]/15 hidden lg:flex flex-col py-6 gap-2 font-body font-semibold text-sm">
        <div className="px-6 mb-6">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 rounded-lg bg-primary-container/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary-container text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
            </div>
            <div>
              <h2 className="text-sm font-bold font-headline text-on-surface leading-none">PredX Pro</h2>
              <p className="text-[10px] text-primary-container uppercase tracking-widest font-bold">Algorand Network</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="px-4 py-2 text-[10px] uppercase tracking-widest text-on-surface-variant font-bold opacity-50">Navigation</div>
          
          {navItems.map(item => (
            <a 
              key={item.id}
              className={currentPage === item.id
                ? "flex items-center gap-3 bg-[#181c21] text-[#00FFA3] rounded-full mx-2 px-4 py-3 border-l-4 border-[#00FFA3] font-body text-sm font-semibold cursor-pointer"
                : "flex items-center gap-3 text-[#e0e2ea]/50 mx-2 px-4 py-3 hover:bg-[#262a30] hover:text-[#e0e2ea] transition-colors duration-300 font-body text-sm font-semibold rounded-full cursor-pointer"
              }
              onClick={() => navigate(item.id)}
            >
              <span className="material-symbols-outlined" style={item.fill && currentPage === item.id ? { fontVariationSettings: "'FILL' 1" } : {}}>
                {item.icon}
              </span> 
              {item.label}
            </a>
          ))}
        </div>
        
        <div className="mt-auto space-y-1">
          <a className="flex items-center gap-3 text-[#e0e2ea]/50 mx-2 px-4 py-3 hover:bg-[#262a30] hover:text-[#e0e2ea] transition-colors duration-300 font-body text-sm font-semibold rounded-full cursor-pointer">
            <span className="material-symbols-outlined">settings</span> Settings
          </a>
          <a className="flex items-center gap-3 text-[#e0e2ea]/50 mx-2 px-4 py-3 hover:bg-[#262a30] hover:text-[#e0e2ea] transition-colors duration-300 font-body text-sm font-semibold rounded-full cursor-pointer">
            <span className="material-symbols-outlined">help_center</span> Support
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:ml-64 pt-16 md:pt-20">
        {children}
      </div>

      {/* Mobile NavBar */}
      <nav className="md:hidden fixed bottom-0 w-full bg-[#101419]/95 backdrop-blur-xl border-t border-outline-variant/10 flex justify-around items-center py-3 z-50">
        {navItems.map(item => (
          <a 
            key={item.id}
            className={`flex flex-col items-center gap-1 cursor-pointer ${currentPage === item.id ? 'text-[#00FFA3]' : 'text-on-surface-variant'}`}
            onClick={() => navigate(item.id)}
          >
            <span className="material-symbols-outlined" style={currentPage === item.id ? { fontVariationSettings: "'FILL' 1" } : {}}>
              {item.icon}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.id === 'dashboard' ? 'Dash' : item.label}</span>
          </a>
        ))}
      </nav>

      {/* Connect Wallet Modal globally available */}
      <ConnectWallet openModal={openWalletModal} closeModal={toggleWalletModal} />
      
      {/* Global Notification Toast */}
      {activeAddress && (
        <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-[100] max-w-[320px] md:max-w-sm w-full pointer-events-none">
          <div className="glass-panel p-3 md:p-4 rounded-xl border border-primary-container/20 shadow-2xl flex items-center gap-3 md:gap-4 pointer-events-auto">
            <div className="relative">
              <div className="w-10 md:w-12 h-10 md:h-12 rounded-full bg-surface-container-highest flex items-center justify-center">
                <span className="material-symbols-outlined text-primary-container text-sm md:text-base">wallet</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 md:w-4 h-3 md:h-4 bg-primary-container rounded-full border-2 border-surface flex items-center justify-center">
                <span className="material-symbols-outlined text-[6px] md:text-[8px] text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
              </div>
            </div>
            <div className="flex-1">
              <h5 className="text-xs font-bold text-[#00FFA3]">Wallet Connected</h5>
              <p className="text-[9px] md:text-[10px] text-on-surface-variant">Pera Wallet active on TestNet. {ellipseAddress(activeAddress, 4)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
