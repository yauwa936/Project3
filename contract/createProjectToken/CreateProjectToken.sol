// SPDX-License-Identifier: MIT
/**
 * essential function for ERC20 token 
totalSupply
balanceOf
allowance
transfer
approve
transferFrom
**/

pragma solidity ^0.8.0;
import "./TokenERC20.sol";

contract CreateProjectToken {
    IERC20[] public erc20s;

    function createProjectToken(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply,
        uint initial_supply
    ) external {
        IERC20 erc20 = new TokenERC20(msg.sender, _name, _symbol, _totalSupply);
        erc20s.push(erc20);
        mint(msg.sender, initial_supply);
    }

    function getProjectTokenAddress() external view returns (IERC20[] memory) {
        return erc20s;
    }
}
