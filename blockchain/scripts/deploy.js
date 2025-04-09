const { ethers, artifacts } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const Voting = await ethers.getContractFactory("Voting");
  const voting = await Voting.deploy();

  await voting.waitForDeployment();

  console.log("Voting deployed to:", voting.target);

  // ✅ Save contract address and ABI to frontend
  saveFrontendFiles(voting, "Voting");
}

function saveFrontendFiles(contract, name) {
  // const frontendDir = path.join(__dirname, "..", "frontend", "contracts");
  const frontendDir = path.join(__dirname, "..", "..", "frontend", "contracts");
  if (!fs.existsSync(frontendDir)) fs.mkdirSync(frontendDir, { recursive: true });

  // Save address
  fs.writeFileSync(
    path.join(frontendDir, `${name}-address.json`),
    JSON.stringify({ address: contract.target }, null, 2)
  );

  // Save ABI
  const artifact = artifacts.readArtifactSync(name);
  fs.writeFileSync(
    path.join(frontendDir, `${name}.json`),
    JSON.stringify(artifact, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
