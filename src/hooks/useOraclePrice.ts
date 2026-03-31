/**
 * useOraclePrice hook — Fetches live ALGO and BTC prices from CoinGecko.
 * Auto-refreshes every 30 seconds.
 * Returns: { algoPrice, btcPrice, loading }
 */
import { useState, useEffect, useCallback } from 'react'

const COINGECKO_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=algorand,bitcoin&vs_currencies=usd'

export function useOraclePrice() {
  const [algoPrice, setAlgoPrice] = useState<number>(0)
  const [btcPrice, setBtcPrice] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  const fetchPrices = useCallback(async () => {
    try {
      const res = await fetch(COINGECKO_URL)
      if (!res.ok) throw new Error('CoinGecko API error')
      const data = await res.json()
      setAlgoPrice(data.algorand?.usd ?? 0)
      setBtcPrice(data.bitcoin?.usd ?? 0)
    } catch (err) {
      console.error('Oracle price fetch failed:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPrices()
    const interval = setInterval(fetchPrices, 30_000) // refresh every 30s
    return () => clearInterval(interval)
  }, [fetchPrices])

  return { algoPrice, btcPrice, loading }
}
