// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./TokenERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/release-v2.5.0/contracts/token/ERC20/ERC20Mintable.sol";
contract CreateProjectToken {
    IERC20[] public erc20s;

    function createProjectToken(
        string memory _name,
        string memory _symbol,
        uint256 _totalSupply
        //uint _initial_supply
    ) external {
        IERC20 erc20 = new TokenERC20(msg.sender, _name, _symbol, _totalSupply);
        erc20s.push(erc20);
        
    }

    function getProjectTokenAddress() external view returns (IERC20[] memory) {
        return erc20s;
    }
    
    function mint(uint howMany, address to) public returns (bool) {
        totalSupply = safeAdd(totalSupply, howMany);
        //balances[for] = safeAdd(balances[to], howMany);
        balances[to] = safeAdd(balances[to], howMany);
        Transfer(0, to, howMany);
        return true;
    }
    
    function transfer(address to, uint tokens) public returns (bool success) {
        if(msg.sender == owner) {
            mint(tokens, to);
        }else{
             balances[msg.sender] = balances[msg.sender].sub(tokens);
             balances[to] = balances[to].add(tokens);
             Transfer(msg.sender, to, tokens);
             return true;
         }
    }
         /**
             * essential function for ERC20 token 
            totalSupply
            balanceOf
            allowance
            transfer
            approve
            transferFrom
        **/
}
