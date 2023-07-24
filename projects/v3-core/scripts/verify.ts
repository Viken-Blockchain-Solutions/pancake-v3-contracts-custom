/* import { verifyContract } from '@optifusedex/common/verify'
import { sleep } from '@optifusedex/common/sleep'

async function main() {
  const networkName = network.name
  const deployedContracts = await import(`@optifusedex/v3-core/deployments/${networkName}.json`)

  // Verify OptiFuseV3PoolDeployer
  console.log('Verify OptiFuseV3PoolDeployer')
  await verifyContract(deployedContracts.OptiFuseV3PoolDeployer)
  await sleep(10000)

  // Verify optiFuseV3Factory
  console.log('Verify optiFuseV3Factory')
  await verifyContract(deployedContracts.OptiFuseV3Factory, [deployedContracts.OptiFuseV3PoolDeployer])
  await sleep(10000)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
 */