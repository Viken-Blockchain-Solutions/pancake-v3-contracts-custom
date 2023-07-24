import { abi as POOL_ABI } from '@optifusedex/v3-core/artifacts/contracts/OptiFuseV3Pool.sol/OptiFuseV3Pool.json'
import { Contract, Wallet } from 'ethers'
import { IOptiFuseV3Pool } from '../../typechain-types'

export default function poolAtAddress(address: string, wallet: Wallet): IOptiFuseV3Pool {
  return new Contract(address, POOL_ABI, wallet) as IOptiFuseV3Pool
}
