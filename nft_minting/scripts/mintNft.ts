import { Contract, ethers } from "ethers";
import "dotenv/config";
// @ts-ignore
import * as nftContractJson from "../artifacts/contracts/erc721.sol/TiredDev.json";
import { TiredDev } from "../typechain-types";

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
  const nftContract: TiredDev = new Contract(
    "0x2dfEB6817033f415E22994DC0fe888850a600e0c",
    nftContractJson.abi,
    signer
  ) as TiredDev;

  console.log("Minting NFT Token...");
  const nftId = process.argv.slice(2)[0];
  const nftUri = "http://localhost:5000/" + nftId;

  const tx = await nftContract.safeMint(nftId, nftUri);
  console.log("Awaiting confirmation...");
  const receipt = await tx.wait();
  console.log("NFT Token minted! at tx hash: " + receipt.transactionHash);
  process.exit(0);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});