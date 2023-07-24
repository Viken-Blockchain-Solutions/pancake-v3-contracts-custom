import { ethers } from 'hardhat'
import OptiFuseV3PoolArtifact from '../artifacts/contracts/OptiFuseV3Pool.sol/OptiFuseV3Pool.json'

const hash = ethers.utils.keccak256(OptiFuseV3PoolArtifact.bytecode)
console.log(hash)
