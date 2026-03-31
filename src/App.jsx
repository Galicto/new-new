import React, { useState, useEffect } from 'react'
import { WalletId, WalletManager, WalletProvider } from '@txnlab/use-wallet-react'
import { SnackbarProvider } from 'notistack'
import { PredXProvider, usePredX } from './context/PredXContext'
import AppRouter from './pages/AppRouter'
import { Canvas } from '@react-three/fiber'
import { ParticleBackground } from './components/ThreeElements'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Footer from './components/Footer'
import './index.css'
import './styles/main.css'

// Algorand Wallet Config
const algodConfig = {
  server: import.meta.env.VITE_ALGOD_SERVER ?? 'https://testnet-api.algonode.cloud',
  port: import.meta.env.VITE_ALGOD_PORT ?? 443,
  token: import.meta.env.VITE_ALGOD_TOKEN ?? '',
  network: import.meta.env.VITE_ALGOD_NETWORK ?? 'testnet',
}

const supportedWallets = [
  { id: WalletId.DEFLY },
  { id: WalletId.PERA },
  { id: WalletId.EXODUS },
  { id: WalletId.LUTE },
]

const walletManager = new WalletManager({
  wallets: supportedWallets,
  defaultNetwork: algodConfig.network,
  networks: {
    [algodConfig.network]: {
      algod: {
        baseServer: algodConfig.server,
        port: algodConfig.port,
        token: String(algodConfig.token),
      },
    },
  },
  options: { resetNetwork: true },
})

// Landing Page Component (our premium marketing page)
function LandingPage({ theme, toggleTheme, onLaunchApp }) {
  return (
    <div className="wrapper">
      <div className="canvas-bg">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleBackground />
        </Canvas>
      </div>
      <Navbar theme={theme} toggleTheme={toggleTheme} onLaunchApp={onLaunchApp} />
      <Hero onLaunchApp={onLaunchApp} />
      <Features />
      <Footer />
    </div>
  )
}

// Inner app: decides between landing page vs dApp based on PredX context
function InnerApp({ theme, toggleTheme }) {
  const { currentPage, navigate } = usePredX()

  const handleLaunchApp = () => navigate('home')
  const handleGoLanding = () => navigate('landing')

  if (currentPage === 'landing') {
    return (
      <LandingPage
        theme={theme}
        toggleTheme={toggleTheme}
        onLaunchApp={handleLaunchApp}
      />
    )
  }

  return <AppRouter />
}

export default function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'light'
    setTheme(currentTheme)
    if (currentTheme === 'light') {
      document.body.classList.add('light-mode')
    } else {
      document.body.classList.remove('light-mode')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.body.classList.toggle('light-mode')
  }

  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <WalletProvider manager={walletManager}>
        <PredXProvider initialPage="landing">
          <InnerApp theme={theme} toggleTheme={toggleTheme} />
        </PredXProvider>
      </WalletProvider>
    </SnackbarProvider>
  )
}
