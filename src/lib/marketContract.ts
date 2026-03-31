/**
 * marketContract.ts — Smart contract interaction functions for PredX.
 * Uses AlgorandClient from @algorandfoundation/algokit-utils and
 * transactionSigner from @txnlab/use-wallet-react.
 *
 * ABI method signatures match the deployed PredictionMarket contract exactly.
 */
import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import algosdk from 'algosdk'

// ABI method signatures — must match the contract exactly
const PLACE_BET_METHOD = new algosdk.ABIMethod({
  name: 'place_bet',
  args: [
    { name: 'market_id', type: 'uint64' },
    { name: 'outcome', type: 'uint64' },
    { name: 'payment', type: 'pay' },
  ],
  returns: { type: 'void' },
})

const CLAIM_WINNINGS_METHOD = new algosdk.ABIMethod({
  name: 'claim_winnings',
  args: [{ name: 'market_id', type: 'uint64' }],
  returns: { type: 'void' },
})

const GET_MARKET_INFO_METHOD = new algosdk.ABIMethod({
  name: 'get_market_info',
  args: [{ name: 'market_id', type: 'uint64' }],
  returns: { type: 'uint64[]' },
})

/**
 * Place a bet on a prediction market.
 * Sends an atomic group: payment txn + app call.
 * @param amountAlgo - Amount in ALGO (will be converted to microALGO × 1,000,000)
 * @returns Transaction ID
 */
export async function placeBet(
  algorand: AlgorandClient,
  activeAddress: string,
  transactionSigner: algosdk.TransactionSigner,
  appId: number,
  marketId: number,
  outcomeIndex: number, // 0 = YES, 1 = NO
  amountAlgo: number
): Promise<string> {
  const algodClient = algorand.client.algod
  const sp = await algodClient.getTransactionParams().do()

  const appAddress = algosdk.getApplicationAddress(BigInt(appId))
  const amountMicroAlgos = Math.round(amountAlgo * 1_000_000)

  // Box references for puyapy:
  //   - market box: prefix "m" + market_id as 8-byte big-endian
  //   - bet box: prefix "b" + market_id (8 bytes) + sender address (32 bytes)
  const marketIdBytes = algosdk.bigIntToBytes(BigInt(marketId), 8)
  const senderBytes = algosdk.decodeAddress(activeAddress).publicKey
  const marketBoxName = new Uint8Array([...new TextEncoder().encode('m'), ...marketIdBytes])
  const betBoxName = new Uint8Array([...new TextEncoder().encode('b'), ...marketIdBytes, ...senderBytes])

  // 1. Payment transaction to send ALGO to the contract
  const payTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    sender: activeAddress,
    receiver: appAddress,
    amount: amountMicroAlgos,
    suggestedParams: sp,
  })

  // 2. App call with ABI method
  const atc = new algosdk.AtomicTransactionComposer()
  atc.addMethodCall({
    appID: appId,
    method: PLACE_BET_METHOD,
    sender: activeAddress,
    suggestedParams: { ...sp, fee: 2000, flatFee: true }, // cover both txn fees
    signer: transactionSigner,
    methodArgs: [marketId, outcomeIndex, { txn: payTxn, signer: transactionSigner }],
    boxes: [
      { appIndex: appId, name: marketBoxName },
      { appIndex: appId, name: betBoxName },
    ],
  })

  const result = await atc.execute(algodClient, 4)
  return result.txIDs[0]
}

/**
 * Claim winnings from a resolved market.
 * @returns Transaction ID
 */
export async function claimWinnings(
  algorand: AlgorandClient,
  activeAddress: string,
  transactionSigner: algosdk.TransactionSigner,
  appId: number,
  marketId: number
): Promise<string> {
  const algodClient = algorand.client.algod
  const sp = await algodClient.getTransactionParams().do()

  const marketIdBytes = algosdk.bigIntToBytes(BigInt(marketId), 8)
  const senderBytes = algosdk.decodeAddress(activeAddress).publicKey
  const marketBoxName = new Uint8Array([...new TextEncoder().encode('m'), ...marketIdBytes])
  const betBoxName = new Uint8Array([...new TextEncoder().encode('b'), ...marketIdBytes, ...senderBytes])

  const atc = new algosdk.AtomicTransactionComposer()
  atc.addMethodCall({
    appID: appId,
    method: CLAIM_WINNINGS_METHOD,
    sender: activeAddress,
    suggestedParams: { ...sp, fee: 2000, flatFee: true }, // cover inner txn fee
    signer: transactionSigner,
    methodArgs: [marketId],
    boxes: [
      { appIndex: appId, name: marketBoxName },
      { appIndex: appId, name: betBoxName },
    ],
  })

  const result = await atc.execute(algodClient, 4)
  return result.txIDs[0]
}

/**
 * Get market info from the contract (readonly).
 * Returns: { totalYes, totalNo, status, winningOutcome, endTime }
 * totalYes and totalNo are in ALGO (divided by 1,000,000).
 */
export async function getMarketInfo(
  algorand: AlgorandClient,
  appId: number,
  marketId: number
): Promise<{
  totalYes: number
  totalNo: number
  status: number // 0 = active, 1 = resolved
  winningOutcome: number
  endTime: number
}> {
  const algodClient = algorand.client.algod
  const sp = await algodClient.getTransactionParams().do()

  const marketIdBytes = algosdk.bigIntToBytes(BigInt(marketId), 8)
  const marketBoxName = new Uint8Array([...new TextEncoder().encode('m'), ...marketIdBytes])

  const atc = new algosdk.AtomicTransactionComposer()
  atc.addMethodCall({
    appID: appId,
    method: GET_MARKET_INFO_METHOD,
    sender: algosdk.getApplicationAddress(BigInt(appId)), // simulate from app address
    suggestedParams: sp,
    signer: algosdk.makeEmptyTransactionSigner(),
    methodArgs: [marketId],
    boxes: [{ appIndex: appId, name: marketBoxName }],
  })

  const result = await atc.simulate(algodClient)
  const returnValue = result.methodResults[0].returnValue as bigint[]

  return {
    totalYes: Number(returnValue[0]) / 1_000_000,   // microALGO → ALGO
    totalNo: Number(returnValue[1]) / 1_000_000,     // microALGO → ALGO
    status: Number(returnValue[2]),                    // 0 = active, 1 = resolved
    winningOutcome: Number(returnValue[3]),            // 0 = YES, 1 = NO
    endTime: Number(returnValue[4]),                   // unix timestamp
  }
}
