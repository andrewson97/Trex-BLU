const { ethers } = require('hardhat');
const { deployFullSuiteFixture, deploySuiteWithModularCompliancesFixture, deploySuiteWithModuleComplianceBoundToWallet } = require('../test/fixtures/deploy-full-suite.fixture');

// Function to print the deployment details
function printDeploymentDetails(deployment) {
  console.log("Accounts:");
  for (const [key, value] of Object.entries(deployment.accounts)) {
    console.log(`${key}: ${value.address}`);
  }

  console.log("\nIdentities:");
  for (const [key, value] of Object.entries(deployment.identities)) {
    console.log(`${key}: ${value.address}`);
  }

  console.log("\nSuite:");
  for (const [key, value] of Object.entries(deployment.suite)) {
    console.log(`${key}: ${value.address}`);
  }

  console.log("\nAuthorities:");
  for (const [key, value] of Object.entries(deployment.authorities)) {
    console.log(`${key}: ${value.address}`);
  }

  console.log("\nFactories:");
  for (const [key, value] of Object.entries(deployment.factories)) {
    console.log(`${key}: ${value.address}`);
  }

  console.log("\nImplementations:");
  for (const [key, value] of Object.entries(deployment.implementations)) {
    console.log(`${key}: ${value.address}`);
  }
}

async function sendTransactionWithReplacement(txData, deployer) {
  const nonce = await deployer.getTransactionCount('pending');
  const currentGasPrice = await ethers.provider.getGasPrice();
  const increasedGasPrice = currentGasPrice.mul(ethers.BigNumber.from(120)).div(ethers.BigNumber.from(100)); // Increase by 20%

  const tx = {
    ...txData,
    nonce,
    gasPrice: increasedGasPrice,
  };

  try {
    const txResponse = await deployer.sendTransaction(tx);
    console.log(`Transaction sent: ${txResponse.hash}`);
    const receipt = await txResponse.wait();
    console.log(`Transaction mined: ${receipt.transactionHash}`);
  } catch (error) {
    console.error("Transaction failed:", error);
  }
}

// Main function to deploy and print details
async function main() {
  const [deployer] = await ethers.getSigners();

  const deployment = await deployFullSuiteFixture();
  printDeploymentDetails(deployment);

  const modularCompliancesDeployment = await deploySuiteWithModularCompliancesFixture();
  printDeploymentDetails(modularCompliancesDeployment);

  const complianceBoundToWalletDeployment = await deploySuiteWithModuleComplianceBoundToWallet();
  printDeploymentDetails(complianceBoundToWalletDeployment);

  // Example of sending a transaction with replacement logic
  const txData = {
    to: deployment.suite.token.address, // Adjust this to the actual recipient
    value: ethers.utils.parseEther('0.1'),
    gasLimit: 21000, // Adjust as necessary
  };

  await sendTransactionWithReplacement(txData, deployer);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
