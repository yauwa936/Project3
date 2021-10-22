// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { GnosisSafe } from '@gnosis.pm/safe-contracts/contracts/GnosisSafe.sol';
import { GnosisSafeProxy } from '@gnosis.pm/safe-contracts/contracts/proxies/GnosisSafeProxy.sol';
import { GnosisSafeProxyFactory } from '@gnosis.pm/safe-contracts/contracts/proxies/GnosisSafeProxyFactory.sol';

// ! Note it won't work in local network, as external contracts are required to create Gnosis Safe
contract CreateSafe {
  event ProxyCreation(GnosisSafeProxy proxy);

    // official safe proxy factory contract address is "0x76E2cFc1F5Fa8F6a5b3fC4c8F4788F0116861F9B"
  GnosisSafeProxyFactory public constant proxyFactory = GnosisSafeProxyFactory(0x76E2cFc1F5Fa8F6a5b3fC4c8F4788F0116861F9B);

    // official mastercopy contract address is "0x34CfAC646f301356fAa8B21e94227e3583Fe3F5F"
    function createSafe(address owner1, address owner2, uint saltNonce) public {
        address singleton = 0x34CfAC646f301356fAa8B21e94227e3583Fe3F5F;
        address[] memory owners = new address[](1);
        owners[0] = owner1;
        owners[1] = owner2;
        bytes memory setupData = abi.encodeWithSelector(
            GnosisSafe.setup.selector,
            owners, // address[] calldata _owners,
            uint256(1), // uint256 _threshold,
            address(0), // address to,
            "", // bytes calldata data,
            address(0xd5D82B6aDDc9027B22dCA772Aa68D5d74cdBdF44), // address fallbackHandler,
            address(0), // address paymentToken,
            uint256(0), // uint256 payment,
            address(0) // address payable paymentReceiver
        );
        proxyFactory.createProxyWithNonce(singleton, setupData, saltNonce);
    }
}
