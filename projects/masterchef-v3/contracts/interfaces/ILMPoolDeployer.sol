// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./IOptiFuseV3Pool.sol";
import "./ILMPool.sol";

interface ILMPoolDeployer {
    function deploy(IOptiFuseV3Pool pool) external returns (ILMPool lmPool);
}
