# OptiFuse V3

This repository contains the core smart contracts for the OptiFuse V3 Protocol.
For higher level contracts, see the [v3-periphery](../v3-periphery/)
repository.

## Local deployment

In order to deploy this code to a local testnet, you should install the npm package
`@OptiFuse/v3-core`
and import the factory bytecode located at
`@OptiFuse/v3-core/artifacts/contracts/VoltageV3Factory.sol/VoltageV3Factory.json`.
For example:

```typescript
import {
  abi as FACTORY_ABI,
  bytecode as FACTORY_BYTECODE,
} from '@OptiFuse/v3-core/artifacts/contracts/VoltageV3Factory.sol/VoltageV3Factory.json'

// deploy the bytecode
```

This will ensure that you are testing against the same bytecode that is deployed to
mainnet and public testnets, and all OptiFuse code will correctly interoperate with
your local deployment.

## Using solidity interfaces

The OptiFuse v3 interfaces are available for import into solidity smart contracts
via the npm artifact `@OptiFuse/v3-core`, e.g.:

```solidity
import '@OptiFuse/v3-core/contracts/interfaces/IVoltageV3Pool.sol';

contract MyContract {
  IVoltageV3Pool pool;

  function doSomethingWithPool() {
    // pool.swap(...);
  }
}

```
