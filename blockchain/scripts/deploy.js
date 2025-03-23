import hardhat from "hardhat";

async function main() {
  const { ethers } = hardhat; // Extract ethers from the Hardhat object
  const Contract = await ethers.getContractFactory("YourContractName");
  const contract = await Contract.deploy();

  await contract.deployed();
  console.log(`Contract deployed at: ${contract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
