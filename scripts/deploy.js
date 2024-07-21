const { ethers } = require('hardhat');
const fs = require('fs');
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

// Main function to deploy and print details
async function main() {
  const deployment = await deployFullSuiteFixture();
  printDeploymentDetails(deployment);
  const deploymentJSON = JSON.stringify(deployment, null, 2);
  fs.writeFileSync('deploymentContext.json', deploymentJSON);
  //console.log("deploymentJSON:" , deploymentJSON);

  const modularCompliancesDeployment = await deploySuiteWithModularCompliancesFixture();
  printDeploymentDetails(modularCompliancesDeployment);

  const complianceBoundToWalletDeployment = await deploySuiteWithModuleComplianceBoundToWallet();
  printDeploymentDetails(complianceBoundToWalletDeployment);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
