import React from 'react';
import { usePredX } from '../context/PredXContext';
import Home from './Home';
import Markets from './Markets';
import Leaderboard from './Leaderboard';
import BettingTerminal from './BettingTerminal';

const AppRouter: React.FC = () => {
  const { currentPage } = usePredX();

  switch (currentPage) {
    case 'home':
    case 'dashboard':
      return <Home />;
    case 'markets':
      return <Markets />;
    case 'leaderboard':
      return <Leaderboard />;
    case 'terminal':
      return <BettingTerminal />;
    default:
      return <Home />;
  }
};

export default AppRouter;
