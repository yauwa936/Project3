import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import { hasEthereum } from "../utils/ethereum";
import CreateProjectToken from "../src/artifacts/contracts/CreateProjectToken.sol/CreateProjectToken.json";
import CreateBurnableToken from "../src/artifacts/contracts/CreateBurnableToken.sol/CreateBurnableToken.json";

export default function Home() {
  const [setPTAddress, setPTAddressState] = useState("");
  const [newPT, setNewPTState] = useState("");
  const [PTSymbol, setPTSymbolState] = useState("");
  const [PTTotalSupply, setPTTotalSupplyState] = useState("");
  const [newPTMessage, setNewPTMessageState] = useState("");
  const [PTSymbolMessage, setPTSymbolMessageState] = useState("");
  const [PTTotalSupplyMessage, setPTTotalSupplyMessageState] = useState("");
  const [connectedWalletAddress, setConnectedWalletAddressState] = useState("");
  const newPTInputRef = useRef();
  const PTSymbolInputRef = useRef();
  const PTTotalSupplyInputRef = useRef();
  const [setBTAddress, setBTAddressState] = useState("");
  const [newBT, setNewBTState] = useState("");
  const [BTSymbol, setBTSymbolState] = useState("");
  const [BTTotalSupply, setBTTotalSupplyState] = useState("");
  const [BTBurnAmount, setBTBurnAmountState] = useState("");
  const [newBTMessage, setNewBTMessageState] = useState("");
  const [BTSymbolMessage, setBTSymbolMessageState] = useState("");
  const [BTTotalSupplyMessage, setBTTotalSupplyMessageState] = useState("");
  const [BTBurnAmountMessage, setBTBurnAmountMessageState] = useState("");
  const newBTInputRef = useRef();
  const BTSymbolInputRef = useRef();
  const BTTotalSupplyInputRef = useRef();
  const BTBurnAmountInputRef = useRef();
  

  // If wallet is already connected...
  useEffect(() => {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`);
      return;
    }
    async function setConnectedWalletAddress() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      try {
        const signerAddress = await signer.getAddress();
        setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`);
      } catch {
        setConnectedWalletAddressState("No wallet connected");
        return;
      }
    }
    setConnectedWalletAddress();
  }, []);

  // Request access to MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // Call burnable token contract, fetch current value
  async function fetchBurnableTokenAddress() {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`);
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CREATEBURNABLETOKEN_ADDRESS,
      CreateBurnableToken.abi,
      provider
    );
    try {
      const data = await contract.getBurnableTokenAddress();
      setBTAddressState(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Call burnable token contract, create new burnable token
  async function setBurnableToken() {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`);
      return;
    }
    if (!newBT) {
      setNewBTMessageState("Please add a token name");
      return;
    }

    if (!BTSymbol) {
      setBTSymbolMessageState("Please add a token symbol");
      return;
    }

    if (!BTTotalSupply) {
      setBTTotalSupplyMessageState("Please add a token supply");
      return;
    }

    if (!BTBurnAmount) {
      setBTBurnAmountMessageState("Please add a token burn amount");
      return;
    }

    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    const web3 = require("web3");
    const amount = web3.utils.toWei(BTTotalSupply, "ether");
    const burnAmount = web3.utils.toWei(BTBurnAmount, "ether");
    setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`);
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CREATEBURNABLETOKEN_ADDRESS,
      CreateBurnableToken.abi,
      signer
    );
    const transaction = await contract.createBurnableToken(
      newBT,
      BTSymbol,
      amount,
      burnAmount
    );
    await transaction.wait();
    setNewBTMessageState(
      `🎉 ${newBT} created! Don't forget to record this token address!`
    );
    newBTInputRef.current.value = "";
    BTSymbolInputRef.current.value = "";
    BTTotalSupplyInputRef.current.value = "";
    BTBurnAmountInputRef.current.value = "";
    setNewBTState("");
    setBTSymbolState("");
    setBTTotalSupplyState("");
    setBTBurnAmountState("");
  }

  // Call smart contract, fetch current value
  async function fetchTokenAddress() {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`);
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CREATEPROJECTTOKEN_ADDRESS,
      CreateProjectToken.abi,
      provider
    );
    try {
      const data = await contract.getProjectTokenAddress();
      setPTAddressState(data);
    } catch (error) {
      console.log(error);
    }
  }

  // Call smart contract, set new value
  async function setProjectToken() {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`);
      return;
    }
    if (!newPT) {
      setNewPTMessageState("Please add a token name");
      return;
    }

    if (!PTSymbol) {
      setPTSymbolMessageState("Please add a token symbol");
      return;
    }

    if (!PTTotalSupply) {
      setPTTotalSupplyMessageState("Please add a token supply");
      return;
    }

    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    const web3 = require("web3");
    const amount = web3.utils.toWei(PTTotalSupply, "ether");
    setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`);
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CREATEPROJECTTOKEN_ADDRESS,
      CreateProjectToken.abi,
      signer
    );
    const transaction = await contract.createProjectToken(
      newPT,
      PTSymbol,
      amount
    );
    await transaction.wait();
    setNewPTMessageState(
      `🎉 ${newPT} created! Don't forget to record this token address!`
    );
    newPTInputRef.current.value = "";
    PTSymbolInputRef.current.value = "";
    PTTotalSupplyInputRef.current.value = "";
    setNewPTState("");
    setPTSymbolState("");
    setPTTotalSupplyState("");
  }

  return (
    <div className="max-w-lg mt-36 mx-auto text-center px-4">
      <Head>
        <title>Shitcoin Playground</title>
        <meta
          name="shitcoin playground"
          content="Your all-in-one shitcoin playground."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="space-y-8">
        {!process.env.NEXT_PUBLIC_CREATEPROJECTTOKEN_ADDRESS ? (
          <p className="text-md">
            Please add a value to the{" "}
            <pre>NEXT_PUBLIC_CREATEPROJECTTOKEN_ADDRESS</pre> environment
            variable.
          </p>
        ) : (
          <>
            <Image
              width="200"
              height="200"
              src="https://media.giphy.com/media/uWWlRGuXzFPKXdXZH1/giphy.gif"
              alt="shitcoin-logo"
            />
            <h1 className="text-4xl font-semibold mb-8">
              💩 Shitcoin Playground
            </h1>
            <div className="space-y-8">
              <h3 className="text-xl font-semibold mb-8">
                Create Standard ERC20
              </h3>
              <div className="flex flex-col space-y-4">
                <input
                  className="border p-4 w-100 text-center"
                  placeholder="👉 Your shitcoin contract address will show here 👈"
                  value={setPTAddress.at(-1)}
                  disabled
                />
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-md w-full"
                  onClick={fetchTokenAddress}
                >
                  Fetch Last Shitcoin Contract Address
                </button>
              </div>
              <div className="space-y-8">
                <div className="flex flex-col space-y-4">
                  <input
                    className="border p-4 text-center"
                    onChange={(e) => setNewPTState(e.target.value)}
                    placeholder="ABCToken"
                    ref={newPTInputRef}
                  />
                  <input
                    className="border p-4 text-center"
                    onChange={(e) => setPTSymbolState(e.target.value)}
                    placeholder="ABC"
                    ref={PTSymbolInputRef}
                  />
                  <input
                    className="border p-4 text-center"
                    onChange={(e) => setPTTotalSupplyState(e.target.value)}
                    placeholder="1.02 ETH worth of tokens"
                    ref={PTTotalSupplyInputRef}
                  />
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-md"
                    onClick={setProjectToken}
                  >
                    Create Shitcoin on Ropsten Testnet Network
                  </button>
                  <div className="h-2">
                    {newPTMessage && (
                      <span className="text-sm text-gray-500 italic">
                        {newPTMessage}
                      </span>
                    )}
                    {PTSymbolMessage && (
                      <span className="text-sm text-gray-500 italic">
                        {PTSymbolMessage}
                      </span>
                    )}
                    {PTTotalSupplyMessage && (
                      <span className="text-sm text-gray-500 italic">
                        {PTTotalSupplyMessage}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <hr></hr>
              <h3 className="text-xl font-semibold mb-8">
                Create Burnable ERC20
              </h3>
              <div className="flex flex-col space-y-4">
                <input
                  className="border p-4 w-100 text-center"
                  placeholder="👉 Your shitcoin contract address will show here 👈"
                  value={setBTAddress.at(-1)}
                  disabled
                />
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-md w-full"
                  onClick={fetchBurnableTokenAddress}
                >
                  Fetch Last Shitcoin Contract Address
                </button>
              </div>
              <div className="space-y-8">
                <div className="flex flex-col space-y-4">
                  <input
                    className="border p-4 text-center"
                    onChange={(e) => setNewBTState(e.target.value)}
                    placeholder="ABCToken"
                    ref={newBTInputRef}
                  />
                  <input
                    className="border p-4 text-center"
                    onChange={(e) => setBTSymbolState(e.target.value)}
                    placeholder="ABC"
                    ref={BTSymbolInputRef}
                  />
                  <input
                    className="border p-4 text-center"
                    onChange={(e) => setBTTotalSupplyState(e.target.value)}
                    placeholder="1.02 ETH worth of tokens"
                    ref={BTTotalSupplyInputRef}
                  />
                  <input
                    className="border p-4 text-center"
                    onChange={(e) => setBTBurnAmountState(e.target.value)}
                    placeholder="0.5 ETH worth of token burned"
                    ref={BTBurnAmountInputRef}
                  />
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-md"
                    onClick={setBurnableToken}
                  >
                    Create Shitcoin on Ropsten Testnet Network
                  </button>
                  <div className="h-2">
                    {newBTMessage && (
                      <span className="text-sm text-gray-500 italic">
                        {newBTMessage}
                      </span>
                    )}
                    {BTSymbolMessage && (
                      <span className="text-sm text-gray-500 italic">
                        {BTSymbolMessage}
                      </span>
                    )}
                    {BTTotalSupplyMessage && (
                      <span className="text-sm text-gray-500 italic">
                        {BTTotalSupplyMessage}
                      </span>
                    )}
                    {BTBurnAmountMessage && (
                      <span className="text-sm text-gray-500 italic">
                        {BTBurnAmountMessage}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="h-4">
                {connectedWalletAddress && (
                  <p className="text-md">{connectedWalletAddress}</p>
                )}
              </div>
            </div>
          </>
        )}
      </main>

      <footer className="mt-20">
        <a
          href="https://github.com/yauwa936/Project3"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-700"
        >
          View on GitHub
        </a>
      </footer>
    </div>
  );
}
