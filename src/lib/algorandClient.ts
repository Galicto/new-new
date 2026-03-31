/**
 * Shared AlgorandClient instance — reads from existing VITE_ env vars.
 * Uses @algorandfoundation/algokit-utils AlgorandClient.
 */
import { AlgorandClient } from '@algorandfoundation/algokit-utils'
import { getAlgodConfigFromViteEnvironment } from '../utils/network/getAlgoClientConfigs'

const algodConfig = getAlgodConfigFromViteEnvironment()

const algorandClient = AlgorandClient.fromConfig({ algodConfig })

export default algorandClient
