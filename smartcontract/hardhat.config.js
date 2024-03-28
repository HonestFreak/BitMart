require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });

const privateKey = process.env.PRIVATE_KEY;

module.exports = {
  solidity: { version: "0.8.20" },
  networks: {
    testnet: {
      url: `https://testnet-rpc.Botanix.network`,
      accounts: [`0x${privateKey}`],
    },
    ganache: {
      url: `http://127.0.0.1:7545`,
    },
  }
};