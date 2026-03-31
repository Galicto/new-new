import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { usePredX, Better } from '../context/PredXContext';

const Leaderboard: React.FC = () => {
  const { leaderboard } = usePredX();

  return (
    <DashboardLayout>
      <div className="px-4 md:px-12 pb-24">
        {/* Hero Section */}
        <div className="mb-16 mt-8">
          <h1 className="font-headline text-5xl md:text-7xl font-black text-on-surface tracking-tighter leading-none mb-4">
            THE <span className="text-primary-container">ELITE</span> PULSE
          </h1>
          <p className="font-body text-lg text-on-surface-variant max-w-2xl opacity-80">
            Tracking the world's most accurate predictors. Stake, predict, and climb the synthetic hierarchy of PredX.
          </p>
        </div>

        {/* Global Elite: Top 3 Bento */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20">
          {/* Rank 2 */}
          {leaderboard[1] && (
            <div className="lg:order-1 order-2 mt-8 lg:mt-12 bg-surface-container-low rounded-lg p-8 relative overflow-hidden group border border-outline-variant/10">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary-container/10 rounded-full blur-3xl"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <img alt={leaderboard[1].name} className="w-24 h-24 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src={leaderboard[1].avatar} />
                  <div className="absolute -bottom-2 -right-2 bg-secondary text-on-secondary w-8 h-8 rounded-full flex items-center justify-center font-bold font-headline border-4 border-surface-container-low">2</div>
                </div>
                <h3 className="font-headline text-xl font-bold mb-1">{leaderboard[1].name}</h3>
                <div className="flex items-center gap-1 text-primary-fixed-dim mb-4">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                  <span className="text-xs font-label font-bold tracking-widest uppercase">{leaderboard[1].tier}</span>
                </div>
                <div className="w-full space-y-3">
                  <div className="flex justify-between text-xs font-label opacity-60"><span>Accuracy</span> <span className="text-on-surface">{leaderboard[1].accuracy}%</span></div>
                  <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                    <div className="bg-secondary h-full" style={{ width: `${leaderboard[1].accuracy}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs font-label"><span>Profit</span> <span className="text-primary-container font-bold">+{leaderboard[1].profit.toLocaleString()} ALGO</span></div>
                </div>
              </div>
            </div>
          )}

          {/* Rank 1: The King */}
          {leaderboard[0] && (
            <div className="lg:order-2 order-1 bg-surface-container-high rounded-lg p-10 relative overflow-hidden ring-1 ring-primary-container/20 shadow-[0_30px_60px_rgba(0,255,163,0.12)]">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-container to-transparent"></div>
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary-container/10 rounded-full blur-[100px]"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <div className="absolute inset-0 rounded-full bg-primary-container blur-md opacity-20 scale-110"></div>
                  <img alt={leaderboard[0].name} className="w-32 h-32 rounded-full object-cover border-2 border-primary-container p-1 bg-surface-container-high relative z-10" src={leaderboard[0].avatar} />
                  <div className="absolute -bottom-2 -right-2 bg-primary-container text-on-primary w-10 h-10 rounded-full flex items-center justify-center font-bold font-headline border-4 border-surface-container-high shadow-lg">1</div>
                </div>
                <h3 className="font-headline text-3xl font-black mb-1">{leaderboard[0].name}</h3>
                <div className="flex items-center gap-1 text-primary-container mb-6">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                  <span className="text-xs font-label font-bold tracking-[0.2em] uppercase">{leaderboard[0].tier}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-surface-container-lowest p-4 rounded-xl">
                    <p className="text-[10px] font-label text-on-surface-variant uppercase mb-1">Accuracy</p>
                    <p className="text-xl font-headline font-bold">{leaderboard[0].accuracy}%</p>
                  </div>
                  <div className="bg-surface-container-lowest p-4 rounded-xl">
                    <p className="text-[10px] font-label text-on-surface-variant uppercase mb-1">Volume</p>
                    <p className="text-xl font-headline font-bold">{(leaderboard[0].volume / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-2">
                  <span className="text-xs font-label text-on-surface-variant uppercase">Total Profit:</span>
                  <span className="text-xl font-headline font-black text-primary-container">+{leaderboard[0].profit.toLocaleString()} ALGO</span>
                </div>
              </div>
            </div>
          )}

          {/* Rank 3 */}
          {leaderboard[2] && (
            <div className="lg:order-3 order-3 mt-8 lg:mt-12 bg-surface-container-low rounded-lg p-8 relative overflow-hidden group border border-outline-variant/10">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary-container/5 rounded-full blur-3xl"></div>
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <img alt={leaderboard[2].name} className="w-24 h-24 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" src={leaderboard[2].avatar} />
                  <div className="absolute -bottom-2 -right-2 bg-[#3e495d] text-secondary-fixed w-8 h-8 rounded-full flex items-center justify-center font-bold font-headline border-4 border-surface-container-low">3</div>
                </div>
                <h3 className="font-headline text-xl font-bold mb-1">{leaderboard[2].name}</h3>
                <div className="flex items-center gap-1 text-on-surface-variant/60 mb-4">
                  <span className="material-symbols-outlined text-sm">shield</span>
                  <span className="text-xs font-label font-bold tracking-widest uppercase">{leaderboard[2].tier}</span>
                </div>
                <div className="w-full space-y-3">
                  <div className="flex justify-between text-xs font-label opacity-60"><span>Accuracy</span> <span className="text-on-surface">{leaderboard[2].accuracy}%</span></div>
                  <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
                    <div className="bg-outline-variant h-full" style={{ width: `${leaderboard[2].accuracy}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs font-label"><span>Profit</span> <span className="text-primary-container font-bold">+{leaderboard[2].profit.toLocaleString()} ALGO</span></div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Main Ranking Table */}
        <section className="bg-surface-container-low rounded-lg overflow-hidden mb-20 border border-outline-variant/10">
          <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center">
            <h2 className="font-headline text-2xl font-bold">Main Ranking</h2>
            <div className="flex gap-4">
              <button className="bg-surface-container-highest px-4 py-2 rounded-full text-xs font-label hover:text-primary-container transition-colors hidden sm:block">Daily</button>
              <button className="bg-surface-container-highest px-4 py-2 rounded-full text-xs font-label text-primary-container border border-primary-container/20">All Time</button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest border-b border-outline-variant/10">
                  <th className="px-8 py-6 font-medium">Rank</th>
                  <th className="px-8 py-6 font-medium">Predictor</th>
                  <th className="px-8 py-6 font-medium">Accuracy (%)</th>
                  <th className="px-8 py-6 font-medium hidden md:table-cell">Volume (ALGO)</th>
                  <th className="px-8 py-6 font-medium text-right">Total Profit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/5">
                {leaderboard.slice(3).map((better: Better) => (
                  <tr key={better.id} className="hover:bg-surface-container-high transition-colors group">
                    <td className="px-8 py-6 font-headline font-bold text-on-surface-variant group-hover:text-primary-container transition-colors">0{better.rank}</td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden">
                          <img alt={better.name} className="w-full h-full object-cover" src={better.avatar} />
                        </div>
                        <span className="font-body font-bold text-sm">{better.name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <span className="font-label text-sm font-semibold">{better.accuracy}%</span>
                        <div className="w-20 bg-surface-container-highest h-1 rounded-full hidden sm:block">
                          <div className="bg-primary-container h-full opacity-60" style={{ width: `${better.accuracy}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 font-label text-sm hidden md:table-cell">{(better.volume / 1000).toFixed(1)}K</td>
                    <td className="px-8 py-6 text-right font-headline font-bold text-primary-fixed-dim">+{better.profit.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 bg-surface-container-lowest/50 text-center border-t border-outline-variant/10">
            <button className="font-label text-xs uppercase tracking-[0.3em] text-on-surface-variant hover:text-primary-container transition-all">Load More Rankings</button>
          </div>
        </section>

        {/* Elite Achievement Badges */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-outline-variant/20"></div>
            <h2 className="font-headline text-sm font-black tracking-widest uppercase text-on-surface-variant text-center">Elite Achievement Badges</h2>
            <div className="h-px flex-1 bg-outline-variant/20"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <div className="bg-surface-container-high p-6 rounded-lg text-center border border-outline-variant/5 hover:border-primary-container/30 transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-tr from-primary-container/20 to-transparent rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
              </div>
              <p className="font-headline font-bold text-xs">Shockwave</p>
              <p className="text-[10px] font-label text-on-surface-variant mt-1">10 Wins in 24h</p>
            </div>
            
            <div className="bg-surface-container-high p-6 rounded-lg text-center border border-outline-variant/5 hover:border-primary-container/30 transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-tr from-[#7C3AED]/20 to-transparent rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-tertiary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>diamond</span>
              </div>
              <p className="font-headline font-bold text-xs">Oracle Hand</p>
              <p className="text-[10px] font-label text-on-surface-variant mt-1">90%+ Accuracy</p>
            </div>
            
            <div className="bg-surface-container-high p-6 rounded-lg text-center border border-outline-variant/5 hover:border-primary-container/30 transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-tr from-[#FFB4AB]/20 to-transparent rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
              </div>
              <p className="font-headline font-bold text-xs">Unstoppable</p>
              <p className="text-[10px] font-label text-on-surface-variant mt-1">50 Win Streak</p>
            </div>
            
            <div className="bg-surface-container-high p-6 rounded-lg text-center border border-outline-variant/5 hover:border-primary-container/30 transition-all opacity-40 grayscale">
              <div className="w-16 h-16 mx-auto mb-4 bg-surface-container-highest rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant">lock</span>
              </div>
              <p className="font-headline font-bold text-xs">Whale Status</p>
              <p className="text-[10px] font-label text-on-surface-variant mt-1">10M Vol Reached</p>
            </div>

            <div className="bg-surface-container-high p-6 rounded-lg text-center border border-outline-variant/5 hover:border-primary-container/30 transition-all opacity-40 grayscale">
              <div className="w-16 h-16 mx-auto mb-4 bg-surface-container-highest rounded-full flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface-variant">lock</span>
              </div>
              <p className="font-headline font-bold text-xs">Alpha Prime</p>
              <p className="text-[10px] font-label text-on-surface-variant mt-1">Reach Top 10</p>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Leaderboard;
