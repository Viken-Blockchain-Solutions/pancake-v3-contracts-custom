import { ethers, network } from 'hardhat'
import { configs } from '@optifusedex/common/config'
import { tryVerify } from '@optifusedex/common/verify'
import fs from 'fs'
import { abi } from '@optifusedex/v3-core/artifacts/contracts/OptiFuseV3Factory.sol/OptiFuseV3Factory.json'

import { parseEther } from 'ethers/lib/utils'
const currentNetwork = network.name

async function main() {
  const [owner] = await ethers.getSigners()
  // Remember to update the init code hash in SC for different chains before deploying
  const networkName = network.name
  const config = configs[networkName as keyof typeof configs]
  if (!config) {
    throw new Error(`No config found for network ${networkName}`)
  }

  const v3DeployedContracts = await import(`@optifusedex/v3-core/deployments/${networkName}.json`)
  const mcV3DeployedContracts = await import(`@optifusedex/masterchef-v3/deployments/${networkName}.json`)

  const optiFuseV3Factory_address = v3DeployedContracts.OptiFuseV3Factory

  const OptiFuseV3LmPoolDeployer = await ethers.getContractFactory('OptiFuseV3LmPoolDeployer')
  const optiFuseV3LmPoolDeployer = await OptiFuseV3LmPoolDeployer.deploy(mcV3DeployedContracts.MasterChefV3)

  console.log('optiFuseV3LmPoolDeployer deployed to:', optiFuseV3LmPoolDeployer.address)

  const optiFuseV3Factory = new ethers.Contract(optiFuseV3Factory_address, abi, owner)

  await optiFuseV3Factory.setLmPoolDeployer(optiFuseV3LmPoolDeployer.address)

  const contracts = {
    OptiFuseV3LmPoolDeployer: optiFuseV3LmPoolDeployer.address,
  }
  fs.writeFileSync(`./deployments/${networkName}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
