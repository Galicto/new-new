import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { usePredX, Market } from '../context/PredXContext';
import { useOraclePrice } from '../hooks/useOraclePrice';

const Markets: React.FC = () => {
  const { markets, navigate } = usePredX();
  const { algoPrice } = useOraclePrice();

  return (
    <DashboardLayout>
      <div className="px-6 pb-12">
        {/* Header Section */}
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-black font-headline text-on-surface tracking-tight leading-none mb-4">
              Market <span className="text-primary-container">Screener</span>
            </h1>
            <p className="text-on-surface-variant text-lg font-body leading-relaxed">
              Discover high-probability prediction markets powered by Algorand's high-frequency engine and AI-driven sentiment analysis.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-surface-container-low p-1 rounded-xl flex">
              <button className="bg-surface-container-highest text-primary-container px-4 py-2 rounded-lg text-sm font-bold">Grid</button>
              <button className="text-on-surface-variant px-4 py-2 rounded-lg text-sm font-bold hover:text-on-surface transition-colors">Table</button>
            </div>
            <button className="bg-surface-container-low text-on-surface p-2.5 rounded-xl border border-outline-variant/10">
              <span className="material-symbols-outlined">tune</span>
            </button>
          </div>
        </header>

        {/* Bento Highlights Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* AI Picks (Large) */}
          <div 
            className="md:col-span-2 bg-surface-container-low rounded-lg p-6 relative overflow-hidden group border border-outline-variant/5 cursor-pointer"
            onClick={() => navigate('terminal', { marketId: markets[0]?.id })}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="bg-primary-container/10 text-primary-container text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded">Top Recommendation</span>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                  <span className="text-[10px] text-primary-container font-bold uppercase tracking-widest">AI Pick</span>
                </div>
              </div>
              <h3 className="text-2xl font-headline font-bold text-on-surface mb-2 max-w-md">
                {markets[0]?.title || 'Loading top pick...'}
              </h3>
              <div className="flex items-center gap-6 mt-6">
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">AI Confidence</p>
                  <p className="text-xl font-headline font-bold text-primary-container">{markets[0]?.aiScore || 0}%</p>
                </div>
                <div className="h-10 w-px bg-outline-variant/20"></div>
                <div>
                  <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-widest mb-1">Sentiment Score</p>
                  <p className="text-xl font-headline font-bold text-secondary">Bullish</p>
                </div>
              </div>
            </div>
            <div className="absolute right-0 bottom-0 opacity-20 grayscale group-hover:grayscale-0 transition-all duration-700 w-1/2 h-full">
              <img className="w-full h-full object-cover" alt="AI Network" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJvrpmUilPh307606XMoLqEPxT29pUAj9clKq1JK0zTatXJfmo9TQT7G961Gd-MUAGxylCf1pNufQTtYgwxOZhg-YJqtA_XF6DeC2GI4-JCrQxdCQvfKS91ek90ezgluv_9ZNK11saoNWcjkJX_yuSOU7pvmA57qYYASYFx8Uq8ktbPSuDMjtgLxiOdF91B7np-Uy6Hs8kOjZorlikFfYh1q696eNEsQMumeYW9ar4rleNcH0oNWJkFEa8sYmLUTW200n_UVKU2bOd" />
              <div className="absolute inset-0 bg-gradient-to-l from-surface-container-low via-transparent to-transparent"></div>
            </div>
          </div>

          {/* Trending Box */}
          <div className="bg-surface-container-high rounded-lg p-6 border border-outline-variant/10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline font-bold text-sm uppercase tracking-widest">Trending</h3>
              <span className="material-symbols-outlined text-primary-container">local_fire_department</span>
            </div>
            <ul className="space-y-4">
              {markets.slice(1, 4).map((market, idx) => (
                <li key={market.id} className="flex items-center justify-between group cursor-pointer" onClick={() => navigate('terminal', { marketId: market.id })}>
                  <div>
                    <p className="text-xs font-bold text-on-surface group-hover:text-primary-container transition-colors truncate max-w-[150px]">{market.title}</p>
                    <p className="text-[10px] text-on-surface-variant">Ends {market.endDate}</p>
                  </div>
                  <span className="text-xs font-headline font-bold text-primary-container">{market.probabilityYes}%</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Main High-Density Market Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4">
              <h2 className="font-headline font-bold text-xl">Active Markets</h2>
              <div className="hidden md:flex gap-2">
                <span className="px-3 py-1 bg-surface-container-low rounded-full text-[11px] font-bold text-on-surface-variant">Crypto</span>
                <span className="px-3 py-1 bg-surface-container-low rounded-full text-[11px] font-bold text-on-surface-variant">Sports</span>
                <span className="px-3 py-1 bg-surface-container-low rounded-full text-[11px] font-bold text-on-surface-variant">Politics</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              Live Updates Active
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {markets.map((market: Market) => (
              <div 
                key={market.id} 
                className="bg-surface-container p-5 rounded-lg border border-outline-variant/10 hover:border-primary-container/30 transition-all duration-300 cursor-pointer"
                onClick={() => navigate('terminal', { marketId: market.id })}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden">
                    <img className="w-full h-full object-cover" alt={market.category} src={market.image} />
                  </div>
                  <span className="text-[10px] font-bold text-on-surface-variant opacity-60">
                    Vol: ${(market.volume / 1000).toFixed(1)}K
                  </span>
                </div>
                <h4 className="font-headline font-bold text-on-surface mb-4 line-clamp-2 h-12">{market.title}</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[11px] font-bold mb-1.5">
                      <span className="text-primary-container">YES {market.probabilityYes}%</span>
                      <span className="text-on-surface-variant">NO {market.probabilityNo}%</span>
                    </div>
                    <div className="flex h-1.5 w-full bg-surface-container-lowest rounded-full overflow-hidden">
                      <div className="bg-primary-container" style={{ width: `${market.probabilityYes}%` }}></div>
                      <div className="bg-surface-container-highest" style={{ width: `${market.probabilityNo}%` }}></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[14px] text-primary-container">monitoring</span>
                      <span className="text-[10px] font-bold text-on-surface-variant">AI SCORE: {market.aiScore}</span>
                    </div>
                    <button className="bg-surface-container-highest hover:bg-primary-container hover:text-on-primary transition-all px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                      Trade
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Ticker Footer */}
        <footer className="mt-20 border-t border-outline-variant/10 pt-8 flex flex-wrap gap-8 justify-between opacity-80">
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-1">Total Volume</p>
              <p className="text-xl font-headline font-bold">
                ${(markets.reduce((sum, m) => sum + m.volume, 0)).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-1">Active Traders</p>
              <p className="text-xl font-headline font-bold">
                {(markets.reduce((sum, m) => sum + m.participants, 0)).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-1">Settled Contracts</p>
              <p className="text-xl font-headline font-bold">1,053,220</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant mb-1">ALGO Price</p>
              <p className="text-xl font-headline font-bold text-primary-container">${algoPrice?.toFixed(4) ?? '...'}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-primary-container/10 text-primary-container text-[11px] font-bold rounded-full">Algorand TestNet</span>
            <span className="text-on-surface-variant text-xs">© 2024 PredX Terminal. Real-time data sync active.</span>
          </div>
        </footer>
      </div>
    </DashboardLayout>
  );
};

export default Markets;
