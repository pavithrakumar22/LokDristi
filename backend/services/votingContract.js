import { ethers } from "ethers";
import * as dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read contract address and ABI
const addressPath = path.join(__dirname, "../contracts/Voting-address.json");
const abiPath = path.join(__dirname, "../contracts/Voting.json");

const contractAddress = JSON.parse(fs.readFileSync(addressPath)).address;
const abi = JSON.parse(fs.readFileSync(abiPath)).abi;

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_URL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const votingContract = new ethers.Contract(contractAddress, abi, signer);

export default votingContract;
