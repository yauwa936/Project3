// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract BurnableERC20 is ERC20, ERC20Burnable {
    constructor(
        address _owner, 
        string memory _name, 
        string memory _symbol, 
        uint256 _supply
    ) ERC20(_name, _symbol) {
        _mint(_owner, _supply);
    }

    // bytes32 public constant SNAPSHOT_ROLE = keccak256("SNAPSHOT_ROLE");
    // bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    // /// @custom:oz-upgrades-unsafe-allow constructor
    // constructor() initializer {}

    // function initialize() initializer public {
    //     __ERC20_init("MyToken", "MTK");
    //     __ERC20Burnable_init();
    //     __ERC20Snapshot_init();
    //     __AccessControl_init();
    //     __ERC20FlashMint_init();

    //     _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    //     _setupRole(SNAPSHOT_ROLE, msg.sender);
    //     _setupRole(MINTER_ROLE, msg.sender);
    // }

    // function snapshot() public onlyRole(SNAPSHOT_ROLE) {
    //     _snapshot();
    // }

    // function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
    //     _mint(to, amount);
    // }

    // // The following functions are overrides required by Solidity.

    // function _beforeTokenTransfer(address from, address to, uint256 amount)
    //     internal
    //     override(ERC20Upgradeable, ERC20SnapshotUpgradeable)
    // {
    //     super._beforeTokenTransfer(from, to, amount);
    // }
}