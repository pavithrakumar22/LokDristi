require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("./tasks/accounts.js"); // Import accounts task

module.exports = {
    solidity: "0.8.19",
    networks: {
        amoy: {
            url: process.env.ALCHEMY_URL,
            accounts: [process.env.PRIVATE_KEY]
        }
    }
};
