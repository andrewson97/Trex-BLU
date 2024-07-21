const fs = require('fs');
const { ethers } = require('hardhat');

async function main() {
  // Load deployment context from JSON file
  const contextJSON = fs.readFileSync('deploymentContext.json');
  const context = JSON.parse(contextJSON);

  const [deployer, tokenIssuer, tokenAgent, tokenAdmin, claimIssuer, aliceWallet, bobWallet, charlieWallet, davidWallet, anotherWallet] =
  await ethers.getSigners();

  const { token, agentManager, identityRegistry, identities } = context.suite;



  console.log('Token metadata:', await token.getTokenMetadata(1));


  console.log('Interaction script completed.');
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
