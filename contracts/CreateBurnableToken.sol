// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./BurnableERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract CreateBurnableToken {
    IERC20[] public erc20s;

    function createBurnableToken(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply,
        uint256 _burnAmount
    ) external {
        IERC20 erc20 = new BurnableERC20(msg.sender, _name, _symbol, _totalSupply);
        IERC20 erc20 = new ERC20Burnable.burn(_burnAmount);
        erc20s.push(erc20);
        
    }
    function getBurnableTokenAddress() external view returns (IERC20[] memory) {
        return erc20s;
    }
}