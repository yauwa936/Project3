// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./tokenERC20.sol";

contract CreateProjectToken {
    IERC20[] public erc20s;
    GnosisSafe public safe; 

    function createProjectToken(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply
    ) external {
        IERC20 erc20 = new TokenERC20(msg.sender, _name, _symbol, _totalSupply);
        erc20s.push(erc20);
        
    }

    function getProjectTokenAddress() external view returns (IERC20[] memory) {
        return erc20s;
    }
}