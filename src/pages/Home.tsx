import { useWallet } from '@txnlab/use-wallet-react'
import React, { useState } from 'react'
import SendAlgo from '../components/SendAlgo'
import MintNFT from '../components/MintNFT'
import CreateASA from '../components/CreateASA'
import AssetOptIn from '../components/AssetOptIn'
import AppCalls from '../components/AppCalls'
import Bank from '../components/Bank'
import DashboardLayout from '../components/DashboardLayout'
import { usePredX } from '../context/PredXContext'

const Home: React.FC = () => {
  const [appCallsDemoModal, setAppCallsDemoModal] = useState<boolean>(false)
  const [sendAlgoModal, setSendAlgoModal] = useState<boolean>(false)
  const [mintNftModal, setMintNftModal] = useState<boolean>(false)
  const [createAsaModal, setCreateAsaModal] = useState<boolean>(false)
  const [assetOptInModal, setAssetOptInModal] = useState<boolean>(false)
  const [bankModal, setBankModal] = useState<boolean>(false)
  
  const { activeAddress } = useWallet()
  const { navigate } = usePredX()

  return (
    <DashboardLayout>
      <div className="px-4 md:px-8 pb-12 md:pb-8 pt-4">
        {/* Hero Metrics Grid — from stitch, wired to operations */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 mb-8">
          {/* Send Algo */}
          <div
            className="bg-surface-container-high p-6 md:p-8 rounded-lg flex flex-col justify-between border border-primary-container/5 relative overflow-hidden group cursor-pointer"
            onClick={() => activeAddress && setSendAlgoModal(true)}
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary-container/5 rounded-full blur-3xl group-hover:bg-primary-container/10 transition-colors"></div>
            <div>
              <span className="text-on-surface-variant font-label text-xs uppercase tracking-widest">Send Algo</span>
              <div className="flex items-baseline gap-2 mt-2">
                <h2 className="text-3xl md:text-4xl font-headline font-black text-on-surface">
                  <span className="material-symbols-outlined text-2xl md:text-3xl align-middle mr-2">send</span>
                  Pay
                </h2>
                <span className="text-[#00FFA3] font-headline font-bold">ALGO</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-6 text-sm text-primary-fixed-dim">
              <span className="material-symbols-outlined text-sm">payments</span>
              <span className="text-xs md:text-sm">Send payment tx</span>
            </div>
          </div>

          {/* Counter Contract */}
          <div
            className="bg-surface-container-high p-6 md:p-8 rounded-lg border border-outline-variant/5 cursor-pointer"
            onClick={() => activeAddress && setAppCallsDemoModal(true)}
          >
            <span className="text-on-surface-variant font-label text-xs uppercase tracking-widest">Counter Contract</span>
            <div className="flex justify-between items-end mt-2 mb-4">
              <h2 className="text-3xl md:text-4xl font-headline font-black text-on-surface">
                <span className="material-symbols-outlined text-2xl md:text-3xl align-middle mr-2">calculate</span>
              </h2>
              <div className="text-right">
                <span className="block text-[10px] text-on-surface-variant uppercase">App ID</span>
                <span className="text-[#00FFA3] font-bold text-xs md:text-sm">747652603</span>
              </div>
            </div>
            <div className="w-full h-3 bg-surface-container-lowest rounded-full overflow-hidden flex">
              <div className="h-full bg-primary-container neon-glow" style={{ width: '68%' }}></div>
              <div className="h-full bg-error-container" style={{ width: '32%' }}></div>
            </div>
            <div className="flex justify-between mt-2 font-label text-[10px] text-on-surface-variant">
              <span>INCREMENT</span>
              <span>ON-CHAIN</span>
            </div>
          </div>

          {/* Mint NFT */}
          <div
            className="bg-surface-container-high p-6 md:p-8 rounded-lg border border-outline-variant/5 cursor-pointer"
            onClick={() => activeAddress && setMintNftModal(true)}
          >
            <span className="text-on-surface-variant font-label text-xs uppercase tracking-widest">Mint NFT (ARC-3)</span>
            <div className="flex items-center gap-4 mt-2">
              <h2 className="text-3xl md:text-4xl font-headline font-black text-on-surface">
                <span className="material-symbols-outlined text-2xl md:text-3xl align-middle">palette</span>
              </h2>
              <div className="flex -space-x-2">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-surface-container-high bg-tertiary-container flex items-center justify-center text-[8px] md:text-[10px] text-on-tertiary font-bold">IMG</div>
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-surface-container-high bg-secondary-container flex items-center justify-center text-[8px] md:text-[10px] text-on-secondary font-bold">PIN</div>
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-surface-container-high bg-surface-container-highest flex items-center justify-center text-[8px] md:text-[10px] text-on-surface font-bold">NFT</div>
              </div>
            </div>
            <button className="mt-6 text-primary-container text-xs font-bold flex items-center gap-1 hover:underline">
              Upload & Mint <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </button>
          </div>

          {/* Create Token CTA */}
          <div
            className="bg-primary-container p-6 md:p-8 rounded-lg flex flex-col justify-between group cursor-pointer hover:shadow-[0_0_30px_rgba(0,255,163,0.2)] transition-all"
            onClick={() => activeAddress && setCreateAsaModal(true)}
          >
            <div className="flex justify-between items-start">
              <h3 className="font-headline font-black text-on-primary text-xl md:text-2xl leading-tight">
                Create a custom<br/>fungible token
              </h3>
              <span className="material-symbols-outlined text-on-primary text-2xl md:text-3xl group-hover:translate-x-2 transition-transform">bolt</span>
            </div>
            <div className="bg-on-primary text-primary-container font-bold py-2 md:py-3 px-4 md:px-6 rounded-full inline-block text-center mt-4 text-xs md:text-sm">
              Create ASA
            </div>
          </div>
        </section>

        {/* Bottom Bento Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
          <div className="xl:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline font-bold text-lg md:text-xl">Active Operations</h3>
              <span className="bg-primary-container/10 text-primary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                {activeAddress ? 'Available' : 'Connect Wallet'}
              </span>
            </div>
            
            <div className="grid gap-4">
              {/* Operation: Asset Opt-In */}
              <div
                className="bg-surface-container p-4 md:p-6 rounded-lg flex items-center justify-between border-l-4 border-primary-container hover:bg-surface-container-high transition-colors group cursor-pointer"
                onClick={() => activeAddress && setAssetOptInModal(true)}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-surface-container-highest rounded-full flex items-center justify-center text-primary-container">
                    <span className="material-symbols-outlined text-xl md:text-2xl">add_circle</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface text-sm md:text-base">Asset Opt-In</h4>
                    <p className="text-[10px] md:text-xs text-on-surface-variant">Action: <span className="text-[#00FFA3] font-bold">Opt-in to any ASA</span></p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs md:text-sm font-headline font-bold text-on-surface">Receive Tokens</div>
                  <div className="text-[10px] md:text-xs text-on-surface-variant">Enter ASA ID</div>
                </div>
              </div>

              {/* Operation: Bank */}
              <div
                className="bg-surface-container p-4 md:p-6 rounded-lg flex items-center justify-between border-l-4 border-primary-container hover:bg-surface-container-high transition-colors group cursor-pointer"
                onClick={() => activeAddress && setBankModal(true)}
              >
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-surface-container-highest rounded-full flex items-center justify-center text-primary-container">
                    <span className="material-symbols-outlined text-xl md:text-2xl">account_balance</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-on-surface text-sm md:text-base">Bank Contract</h4>
                    <p className="text-[10px] md:text-xs text-on-surface-variant">Action: <span className="text-[#00FFA3] font-bold">Deposit & Withdraw</span></p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs md:text-sm font-headline font-bold text-on-surface">DeFi Banking</div>
                  <div className="text-[10px] md:text-xs text-on-surface-variant">Deploy · Deposit</div>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-1">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline font-bold text-lg md:text-xl">Quick Actions</h3>
            </div>
            
            <div className="bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/5">
              <div className="p-4 md:p-6 bg-surface-container-highest/20 cursor-pointer hover:bg-surface-container-highest transition-colors flex items-center justify-between border-b border-outline-variant/10" onClick={() => navigate('markets')}>
                <div>
                  <h4 className="font-bold text-on-surface text-sm">Explore Markets</h4>
                  <p className="text-xs text-on-surface-variant mt-1">View active prediction markets</p>
                </div>
                <span className="material-symbols-outlined text-primary-container">arrow_forward</span>
              </div>
              <div className="p-4 md:p-6 bg-surface-container-highest/20 cursor-pointer hover:bg-surface-container-highest transition-colors flex items-center justify-between" onClick={() => navigate('leaderboard')}>
                <div>
                  <h4 className="font-bold text-on-surface text-sm">Leaderboard</h4>
                  <p className="text-xs text-on-surface-variant mt-1">See top ranked predictors</p>
                </div>
                <span className="material-symbols-outlined text-primary-container">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AppCalls openModal={appCallsDemoModal} setModalState={setAppCallsDemoModal} />
      <SendAlgo openModal={sendAlgoModal} closeModal={() => setSendAlgoModal(false)} />
      <MintNFT openModal={mintNftModal} closeModal={() => setMintNftModal(false)} />
      <CreateASA openModal={createAsaModal} closeModal={() => setCreateAsaModal(false)} />
      <AssetOptIn openModal={assetOptInModal} closeModal={() => setAssetOptInModal(false)} />
      <Bank openModal={bankModal} closeModal={() => setBankModal(false)} />
    </DashboardLayout>
  )
}

export default Home
