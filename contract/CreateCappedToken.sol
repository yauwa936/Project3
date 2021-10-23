// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CappedToken.sol";

contract CreateCappedToken {
    IERC20[] public erc20s;

    function createCappedToken(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply
    ) external {
        IERC20 erc20 = new CappedToken(_name, _symbol, _totalSupply, msg.sender);
        erc20s.push(erc20);
        
    }

    function getCappedTokenAddress() external view returns (IERC20[] memory) {
        return erc20s;
    }
}