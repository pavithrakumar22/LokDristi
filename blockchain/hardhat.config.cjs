require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("./tasks/accounts.js"); // Import accounts task

module.exports = {
    solidity: {
      compilers: [
        { version: "0.8.19" },
        { version: "0.8.28" }
      ]
    },
    networks: {
      amoy: {
        url: process.env.ALCHEMY_URL,
        accounts: [process.env.PRIVATE_KEY]
      }
    },
    etherscan: {
    apiKey: {
      polygonAmoy: process.env.POLYGONSCAN_API_KEY, // 🔐 Add this to your .env
    },
  },
  };
  