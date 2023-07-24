// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

import './pool/IOptiFuseV3PoolImmutables.sol';
import './pool/IOptiFuseV3PoolState.sol';
import './pool/IOptiFuseV3PoolDerivedState.sol';
import './pool/IOptiFuseV3PoolActions.sol';
import './pool/IOptiFuseV3PoolOwnerActions.sol';
import './pool/IOptiFuseV3PoolEvents.sol';

/// @title The interface for a OptiFuseDEX  V3 Pool
/// @notice A OptiFuseDEX  pool facilitates swapping and automated market making between any two assets that strictly conform
/// to the ERC20 specification
/// @dev The pool interface is broken up into many smaller pieces
interface IOptiFuseV3Pool is
    IOptiFuseV3PoolImmutables,
    IOptiFuseV3PoolState,
    IOptiFuseV3PoolDerivedState,
    IOptiFuseV3PoolActions,
    IOptiFuseV3PoolOwnerActions,
    IOptiFuseV3PoolEvents
{

}
