// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
//
// Greeter deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
// CreateProjectToken deployed to: 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512

const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello world!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);

  const CreateProjectToken = await hre.ethers.getContractFactory(
    "CreateProjectToken"
  );
  const createProjectToken = await CreateProjectToken.deploy();

  await createProjectToken.deployed();
  console.log("CreateProjectToken deployed to:", createProjectToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
