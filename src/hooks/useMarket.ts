/**
 * useMarket hook — wraps marketContract.ts functions.
 * Reads appId from VITE_CONTRACT_APP_ID env var.
 * Uses useWallet() for activeAddress and transactionSigner.
 * Returns simplified functions that only need (marketId, outcomeIndex, amountAlgo).
 */
import { useState, useCallback } from 'react'
import { useWallet } from '@txnlab/use-wallet-react'
import algorandClient from '../lib/algorandClient'
import {
  placeBet as placeBetContract,
  claimWinnings as claimWinningsContract,
  getMarketInfo as getMarketInfoContract,
} from '../lib/marketContract'

const appId = Number(import.meta.env.VITE_CONTRACT_APP_ID ?? 0)

export function useMarket() {
  const { activeAddress, transactionSigner } = useWallet()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const placeBet = useCallback(
    async (marketId: number, outcomeIndex: number, amountAlgo: number): Promise<string> => {
      if (!activeAddress || !transactionSigner) {
        throw new Error('Wallet not connected')
      }
      setLoading(true)
      setError(null)
      try {
        algorandClient.setDefaultSigner(transactionSigner)
        const txId = await placeBetContract(
          algorandClient,
          activeAddress,
          transactionSigner,
          appId,
          marketId,
          outcomeIndex,
          amountAlgo
        )
        return txId
      } catch (err: any) {
        setError(err.message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [activeAddress, transactionSigner]
  )

  const claimWinnings = useCallback(
    async (marketId: number): Promise<string> => {
      if (!activeAddress || !transactionSigner) {
        throw new Error('Wallet not connected')
      }
      setLoading(true)
      setError(null)
      try {
        algorandClient.setDefaultSigner(transactionSigner)
        const txId = await claimWinningsContract(
          algorandClient,
          activeAddress,
          transactionSigner,
          appId,
          marketId
        )
        return txId
      } catch (err: any) {
        setError(err.message)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [activeAddress, transactionSigner]
  )

  const getMarketInfo = useCallback(
    async (marketId: number) => {
      try {
        return await getMarketInfoContract(algorandClient, appId, marketId)
      } catch (err: any) {
        setError(err.message)
        throw err
      }
    },
    []
  )

  return { placeBet, claimWinnings, getMarketInfo, loading, error }
}
