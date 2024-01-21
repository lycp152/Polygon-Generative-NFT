require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "sepolia",
  networks: {
    sepolia: {
      url: API_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
