import { tryVerify } from '@optifusedex/common/verify'
import { ContractFactory } from 'ethers'
import { ethers, network } from 'hardhat'
import fs from 'fs'

type ContractJson = { abi: any; bytecode: string }
const artifacts: { [name: string]: ContractJson } = {
  // eslint-disable-next-line global-require
  OptiFuseV3PoolDeployer: require('../artifacts/contracts/OptiFuseV3PoolDeployer.sol/OptiFuseV3PoolDeployer.json'),
  // eslint-disable-next-line global-require
  OptiFuseV3Factory: require('../artifacts/contracts/OptiFuseV3Factory.sol/OptiFuseV3Factory.json'),
}

async function main() {
  const [owner] = await ethers.getSigners()
  const networkName = network.name
  console.log('owner', owner.address)

  let optiFuseV3PoolDeployer_address = ''
  let optiFuseV3PoolDeployer
  const OptiFuseV3PoolDeployer = new ContractFactory(
    artifacts.OptiFuseV3PoolDeployer.abi,
    artifacts.OptiFuseV3PoolDeployer.bytecode,
    owner
  )
  if (!optiFuseV3PoolDeployer_address) {
    optiFuseV3PoolDeployer = await OptiFuseV3PoolDeployer.deploy()

    optiFuseV3PoolDeployer_address = optiFuseV3PoolDeployer.address
    console.log('optiFuseV3PoolDeployer', optiFuseV3PoolDeployer_address)
  } else {
    optiFuseV3PoolDeployer = new ethers.Contract(
      optiFuseV3PoolDeployer_address,
      artifacts.OptiFuseV3PoolDeployer.abi,
      owner
    )
  }

  let optiFuseV3Factory_address = ''
  let optiFuseV3Factory
  if (!optiFuseV3Factory_address) {
    const OptiFuseV3Factory = new ContractFactory(
      artifacts.OptiFuseV3Factory.abi,
      artifacts.OptiFuseV3Factory.bytecode,
      owner
    )
    optiFuseV3Factory = await OptiFuseV3Factory.deploy(optiFuseV3PoolDeployer_address)

    optiFuseV3Factory_address = optiFuseV3Factory.address
    console.log('optiFuseV3Factory', optiFuseV3Factory_address)
  } else {
    optiFuseV3Factory = new ethers.Contract(optiFuseV3Factory_address, artifacts.OptiFuseV3Factory.abi, owner)
  }

  // Set FactoryAddress for optiFuseV3PoolDeployer.
  await optiFuseV3PoolDeployer.setFactoryAddress(optiFuseV3Factory_address);


  const contracts = {
    OptiFuseV3Factory: optiFuseV3Factory_address,
    OptiFuseV3PoolDeployer: optiFuseV3PoolDeployer_address,
  }

  fs.writeFileSync(`./deployments/${networkName}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
