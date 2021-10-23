// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract CappedToken is ERC20, ERC20Burnable {
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _cappedSupply,
        address _owner) ERC20(_name, _symbol) {
            _mint(_owner, _cappedSupply);
    }
}