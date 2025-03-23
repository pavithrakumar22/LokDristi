const { ethers } = require("ethers");
require("dotenv").config();

const provider = new ethers.JsonRpcProvider(process.env.ALCHEMY_URL);

async function checkConnection() {
    try {
        const blockNumber = await provider.getBlockNumber();
        console.log("Connected! Latest Block:", blockNumber);
    } catch (error) {
        console.error("Error connecting to blockchain:", error);
    }
}

checkConnection();
