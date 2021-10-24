import { ethers } from "ethers";
import { EthersAdapter } from "@gnosis.pm/safe-core-sdk";
import { Safe, SafeFactory, SafeAccountConfig } from "@gnosis.pm/safe-code-sdk";
import { SafeTransactionDataPartial } from "@gnosis.pm/safe-core-sdk";

// Setup the SDK

async function setupAdapter() {
  await requestAccount();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const owner1 = provider.getSigner(0);
  const ethAdapterOwner1 = new EthersAdapter({ ethers, signer: owner1 });
}

// Deploy a New Gnosis Safe

async function deploySafe() {
  await setupAdapter();
  const safeFactory = await SafeFactory.create({ ethAdapter });
  const owners = [
    "0xf1aB283Cee61e95Ddd58722aBE195ec8a34D0C5d",
    "0x4c6b1f30641982C9B935b95AC85D09f239b922Cd",
  ];
  const threshold = 2;
  const safeAccountConfig: SafeAccountConfig = { owners, threshold };
  const safeSdk: Safe = await safeFactory.deploySafe(safeAccountConfig);
  const newSafeAddress = safeSdk.getAddress();
  console.log(newSafeAddress);
}

// Create a Safe Transaction

async function createSafeTransaction() {
  const transactions: SafeTransactionDataPartial[] = [
    {
      to: "0x<address>",
      value: "<eth_value_in_wei>",
      data: "0x<data>",
    },
  ];
  const safeTransaction = await safeSdk.createTransaction(...transactions);
}
