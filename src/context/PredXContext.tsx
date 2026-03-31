import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useMarket } from '../hooks/useMarket';

// Types
export interface Market {
  id: string;
  id_onchain: number;
  title: string;
  volume: number;
  liquidity: number;
  participants: number;
  aiScore: number;
  probabilityYes: number;
  probabilityNo: number;
  image: string;
  endDate: string;
  category: string;
  status: 'active' | 'resolved';
}

export interface Better {
  id: string;
  name: string;
  address: string;
  accuracy: number;
  volume: number;
  profit: number;
  avatar: string;
  tier: string;
  rank: number;
}

export interface Position {
  id: string;
  marketId: string;
  outcome: 'YES' | 'NO';
  amount: number;
  potential: number;
  status: 'running' | 'won' | 'lost';
}

interface PredXContextType {
  markets: Market[];
  leaderboard: Better[];
  myPositions: Position[];
  currentPage: string;
  navigate: (page: string, props?: any) => void;
  pageProps: any;
  placePrediction: (marketId: string, outcome: 'YES' | 'NO', amount: number) => void;
  appId: number;
  resolveMarket: (marketId: number, winningOutcome: number) => void;
}

const PredXContext = createContext<PredXContextType | undefined>(undefined);

// Initial Mock Data
const MOCK_MARKETS: Market[] = [
  {
    id: 'm1',
    id_onchain: 1,
    title: 'Will ALGO reach $0.50 by end of next month?',
    volume: 4200000,
    liquidity: 480290,
    participants: 8241,
    aiScore: 78,
    probabilityYes: 64,
    probabilityNo: 36,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0TeU--cYm7_gBB6oycrNX9kENJEjaKW5Vvb98XNTYXbwqHpHsqPCnitPneL61QBuDGcb1ayJkKAiX50VPlYnzKatiIPYE2UJwRPs-EvqHnquyEup6mIYNecNPYn43EYxPAfimIMlffLEGlKE8Tdtbgf3yg33aZaTmt3Z6uKwFYrhd3qDmPZhKGApFnuIk0BTeFbqcoW2SHcppRlRrXnUUmzf5YW5XqnoVX49Qot0qDM6XXR5qLVZYnzL6U1N5bEyXOIsrFFShmDss',
    endDate: 'Apr 30, 2026',
    category: 'Crypto',
    status: 'active'
  },
  {
    id: 'm2',
    id_onchain: 2,
    title: 'NVIDIA earnings to beat estimates by >15%?',
    volume: 1800000,
    liquidity: 250000,
    participants: 4120,
    aiScore: 92,
    probabilityYes: 21,
    probabilityNo: 79,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYS76Pq8XiORg7dokFitcfhGa7bASd518fK7HM0RKnN3Y-mxQTM9_oNX7FIzl4zcwidqCPFYFqJgjZrWsA9AIzYP9wOtG9geqQ--IBGbgwV-yVRFK0199CXjZQGKycKrR3CZP7I6kS4Hm4DvM57aPGKHu24z7XwOyq6vjt2odj2yrz8Gs3lc0Nc2lOc5z7k12tMgIn44MOLP1Ruj4lNjubK7lK2fK2tgeEM9NjDt7XVyrW6SJGjjTJqFbsT8g0mnbJz7LB6nOgqvua',
    endDate: 'Apr 15, 2026',
    category: 'Finance',
    status: 'active'
  },
  {
    id: 'm3',
    id_onchain: 3,
    title: 'Who will win the upcoming European Championship?',
    volume: 840000,
    liquidity: 120000,
    participants: 2100,
    aiScore: 45,
    probabilityYes: 35,
    probabilityNo: 65,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfjq107jpgMQbsLlgI9C33z1GmQAYRB57z75bDm2JEDNK4DphRFF4VvZ5SowsVpro_-ORH2Vf2edfm3VHq8WjHsFdGy4qpHHeG5hMQNXNnpFv2zE1_EwxBOB_YezSO70uOGuWd26ce3aMiNUBc8L_J8_bcD1rWM-_-xJ6xCZmVbELq97022B1yUez8_xbg7WI9xIju18KJR16zkd-FgQfAsIHFdqYUYGeAWXON8FSrizzvjuv5odMij4TpPCyUyzZ3NWAIxv5lDPfx',
    endDate: 'Jun 29, 2026',
    category: 'Sports',
    status: 'active'
  }
];

const MOCK_LEADERBOARD: Better[] = [
  { id: 'b1', name: 'Cryptic_Whale', address: '0x1A4...2c9', accuracy: 94.2, volume: 4200000, profit: 84921, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByOLkjiOVuEXza02JLXYCkpZdhZp1cLxIjgy99EOo8hhgt9NkYBaET6frLF2PQqnupnjeuVGk9d1RC-gho_GtlQz9BSkRTsgx2MAFTpjIYHrCx-68IS-XXQMqeYVegucS5B6QqpjEuG3RKYbgtqIRdWoQL3YGDqx4orrK-cp4CaGpL1-cAkuNNELwy6IvkpDguReZiAuiF1zM9VY5GksO81yrpSuDqNoCqoXF4GQHk0HsrkUr4_nyLynEkZNwAw81YO1rUTaprcRDh', tier: 'Global Elite', rank: 1 },
  { id: 'b2', name: 'OxAlpha_Prophet', address: '0x3F2...8a1', accuracy: 88.4, volume: 3100000, profit: 12402, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLrCzFsACbnQ238GNNuXeE_5q5ICGLrO4u2uM5B59C6TdwECKTK3dkjvEsOMa8mHu9wrfi0zAvgWP-tD0WCWoQ7qg39GLkRnOUFbOJGkOSGV-upRPP2bJjMMLwp420yinohZKBNr7aEpO5E0JBKj_SXPnSP7vN-LIfuYNOCIW7rV0Vrhl7ADlB8KOq-WLe-y9p-QQab1AvJCK-uW0Ie5WtonCTp418tOYQmmQYNQQVKpkL3auRan7nHilae3wTr_OekmNMqYQtX4zE', tier: 'Prophet Tier', rank: 2 },
  { id: 'b3', name: 'Void_Trader', address: '0x9B1...4d2', accuracy: 84.1, volume: 2800000, profit: 9112, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpJRd8e9E-NFqf3aPCBKDnMv2DRl_05rSWTD9TXdnf2cK-TeSl7H1Q_zfT61NF5NweUaDckvF8xJd-pZV3lL4p5FdrMSvTS5bZT8YpA0IqnYDZZV3dfYi4ZhPphqDhYsihIrW24sqhX2h9fdnH_myun5AFLXERu8Ix_IEQgm2s_PSC49uaiiY4Kraorefv2XNz1VtERJIq3xcqe_XVQm7AJSTLMdFPPGWMvBbywlz5e4_WUOKbGM0r-415J7xmESbVLBXfg20psYVN', tier: 'Veteran', rank: 3 },
  { id: 'b4', name: 'Ether_Ghost', address: '0x4C5...1e3', accuracy: 82.5, volume: 840200, profit: 6432, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCZvkjmNqidJVsBCfdsN3UUWFx03AhBirfdTzbvOiAV4gLrRln10AGskU4RUwtOwFBKqwPtB5_D0JB5f5W5zExyIwQYWX853QUZsa66jdT-A0cIk-wgbC8Mtwdhm3ALZWhjTHLc_pDjapEJef0VMVkyFI6wjyQvrxy_X3TRiXZMwFyBFOIw202ySsVnf8hHIeJvmnws60ujvg4VDim9tgyYvQy17E-1pAFRCzNCwg15BB-KGSFmTNV15wALg4Ln5AlaMznDS_0lNvK', tier: 'Pro', rank: 4 },
];

const appId = Number(import.meta.env.VITE_CONTRACT_APP_ID ?? 0);

export const PredXProvider: React.FC<{ children: ReactNode; initialPage?: string }> = ({ children, initialPage = 'home' }) => {
  const [markets, setMarkets] = useState<Market[]>(MOCK_MARKETS);
  const [leaderboard] = useState<Better[]>(MOCK_LEADERBOARD);
  const [myPositions, setMyPositions] = useState<Position[]>([]);
  
  // Custom router state
  const [currentPage, setCurrentPage] = useState<string>(initialPage);
  const [pageProps, setPageProps] = useState<any>({});
  
  // Real-time on-chain data sync
  const { getMarketInfo } = useMarket();

  useEffect(() => {
    const fetchLiveMarkets = async () => {
      try {
        let hasChanges = false;
        const updatedMarkets = await Promise.all(
          markets.map(async (m) => {
            try {
              const info = await getMarketInfo(m.id_onchain);
              
              const totalYes = info.totalYes;
              const totalNo = info.totalNo;
              const totalVolume = totalYes + totalNo;

              let probYes = m.probabilityYes;
              let probNo = m.probabilityNo;
              
              if (totalVolume > 0) {
                probYes = Math.round((totalYes / totalVolume) * 100);
                probNo = Math.max(0, 100 - probYes); // ensure it's not negative
              }

              const newStatus: 'resolved' | 'active' = info.status === 1 ? 'resolved' : 'active';
              
              // Only update if there is actual on-chain data overriding the mock
              if (totalVolume > 0 || info.status === 1) {
                  hasChanges = true;
                  return {
                    ...m,
                    volume: m.volume + totalVolume, // Add on-chain vol to mock base vol
                    probabilityYes: probYes,
                    probabilityNo: probNo,
                    status: newStatus,
                  };
              }
              return m;
            } catch (e) {
              console.error(`Failed to fetch market ${m.id_onchain}:`, e);
              return m;
            }
          })
        );
        
        if (hasChanges) {
           setMarkets(updatedMarkets);
        }
      } catch (err) {
        console.error("Failed to sync live markets overall:", err);
      }
    };

    fetchLiveMarkets();
    const intervalId = setInterval(fetchLiveMarkets, 15000); // refresh every 15s
    return () => clearInterval(intervalId);
  }, [getMarketInfo]); // getMarketInfo is stable from useCallback


  const navigate = (page: string, props: any = {}) => {
    setCurrentPage(page);
    setPageProps(props);
    window.scrollTo(0, 0);
  };

  const placePrediction = (marketId: string, outcome: 'YES' | 'NO', amount: number) => {
    const market = markets.find(m => m.id === marketId);
    if (!market) return;

    // Simulate placing a bet
    const newPosition: Position = {
      id: Math.random().toString(36).substr(2, 9),
      marketId,
      outcome,
      amount,
      potential: outcome === 'YES' ? amount * (100 / market.probabilityYes) : amount * (100 / market.probabilityNo),
      status: 'running'
    };

    setMyPositions(prev => [newPosition, ...prev]);

    // Update market volume
    setMarkets(prev => prev.map(m => {
      if (m.id === marketId) {
        return {
          ...m,
          volume: m.volume + amount,
          participants: m.participants + 1
        };
      }
      return m;
    }));
  };

  const resolveMarket = (marketId: number, winningOutcome: number) => {
    console.log('Admin resolve:', marketId, winningOutcome);
  };

  return (
    <PredXContext.Provider value={{
      markets,
      leaderboard,
      myPositions,
      currentPage,
      navigate,
      pageProps,
      placePrediction,
      appId,
      resolveMarket
    }}>
      {children}
    </PredXContext.Provider>
  );
};

export const usePredX = () => {
  const context = useContext(PredXContext);
  if (context === undefined) {
    throw new Error('usePredX must be used within a PredXProvider');
  }
  return context;
};
