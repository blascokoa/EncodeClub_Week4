import { ethers } from "ethers";
import "dotenv/config";
// @ts-ignore
import * as nftContractJson from "../artifacts/contracts/erc721.sol/TiredDev.json";

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);

  console.log(`Using address ${wallet.address}`);
  const provider = ethers.providers.getDefaultProvider("ropsten", {
    etherscan: process.env.ETHERSCAN_API_KEY,
    infura: process.env.INFURA_API_KEY,
  });
  const signer = wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));
  console.log(`Wallet balance ${balance}`);
  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }
  const nftContractFactory = new ethers.ContractFactory(
    nftContractJson.abi,
    nftContractJson.bytecode,
    signer
  );
  console.log("- Deploying the NFT token contract...");
  const nftContract = await nftContractFactory.deploy();
  console.log("Awaiting confirmation...");
  await nftContract.deployed();
  const nftContractAddress = nftContract.address;
  console.log(`NFT contract deployed at ${nftContractAddress}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
