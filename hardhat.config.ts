import '@xyrusworx/hardhat-solidity-json';
import '@nomicfoundation/hardhat-toolbox';
import { HardhatUserConfig } from 'hardhat/config';
import '@openzeppelin/hardhat-upgrades';
import 'solidity-coverage';
import '@nomiclabs/hardhat-solhint';
import '@primitivefi/hardhat-dodoc';
import * as dotenv from 'dotenv';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    polygon: {
      url: process.env.INFURA_POLYGON_RPC,
      accounts: [
        process.env.DEPLOYER_PRIVATE_KEY as string,
        process.env.TOKEN_ISSUER_PRIVATE_KEY as string,
        process.env.TOKEN_AGENT_PRIVATE_KEY as string,
        process.env.TOKEN_ADMIN_PRIVATE_KEY as string,
        process.env.CLAIM_ISSUER_PRIVATE_KEY as string,
        process.env.ALICE_WALLET_PRIVATE_KEY as string,
        process.env.BOB_WALLET_PRIVATE_KEY as string,
        process.env.CHARLIE_WALLET_PRIVATE_KEY as string,
        process.env.DAVID_WALLET_PRIVATE_KEY as string,
        process.env.ANOTHER_WALLET_PRIVATE_KEY as string,
      ].filter(Boolean),
    },
    polygonAmoy: {
      url: process.env.INFURA_POLYGON_AMOY_RPC,
      accounts: [
        process.env.DEPLOYER_PRIVATE_KEY as string,
        process.env.TOKEN_ISSUER_PRIVATE_KEY as string,
        process.env.TOKEN_AGENT_PRIVATE_KEY as string,
        process.env.TOKEN_ADMIN_PRIVATE_KEY as string,
        process.env.CLAIM_ISSUER_PRIVATE_KEY as string,
        process.env.ALICE_WALLET_PRIVATE_KEY as string,
        process.env.BOB_WALLET_PRIVATE_KEY as string,
        process.env.CHARLIE_WALLET_PRIVATE_KEY as string,
        process.env.DAVID_WALLET_PRIVATE_KEY as string,
        process.env.ANOTHER_WALLET_PRIVATE_KEY as string,
      ].filter(Boolean),
      gasPrice: 30000,
    },
  },
  mocha: {
    timeout: 100000,
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  etherscan: {
    apiKey: {
      polygonAmoy: process.env.INFURA_API_KEY as string,
    },
  },
  customChains: [
    {
      network: 'polygonAmoy',
      chainId: 80002,
      urls: {
        apiURL: 'https://www.oklink.com/api/explorer/v1/contract/verify/async/api/polygonAmoy',
        browserURL: 'https://www.oklink.com/polygonAmoy',
      },
      testnet: true,
    },
  ],
  gasReporter: {
    enabled: true,
  },
  dodoc: {
    runOnCompile: false,
    debugMode: true,
    outputDir: './docgen',
    freshOutput: true,
  },
};

export default config;
