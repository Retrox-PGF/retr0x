const { expect } = require("chai");
const { ethers,waffle } = require("hardhat");

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

describe("Retro", function () {
  it("should create a round", async function () {
    const provider = waffle.provider;
    const [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();

    console.log(owner.address);

    let baseNonce = provider.getTransactionCount(owner.address);
    let nonceOffset = 0;
    function getNonce() {
      return baseNonce.then((nonce) => (nonce + (nonceOffset++)));
    }
    const Retro = await ethers.getContractFactory("Retro");
    const host = "0x74b57883f8ce9F2BD330286E884CfD8BB24AC4ED";
    const retro = await Retro.deploy(host);
    await retro.deployed();
    const badgeHolders = [addr1.address,addr2.address];

    await retro.createRound("round1", badgeHolders, {value:ethers.utils.parseEther("0.1")});
    console.log("createRound");
    await retro.nominate(0,"nomination1", addr3.address, {value:ethers.utils.parseEther("0.005")});
    console.log("nominate1");
    await retro.nominate(0,"nomination2", addr4.address, {value:ethers.utils.parseEther("0.005")});
    console.log("nominate2");
    await retro.castVote(0,[50,50]);
    console.log("cast1");
    // await retro.castVote(0,[20,80]);
    // console.log("cast2");

    // await retro.disperseFunds(0);
    // const addr3WeiValue = await provider.getBalance(addr3.address)
    // const addr3EthValue = ethers.utils.formatEther(addr3WeiValue);
    // const addr4WeiValue = await provider.getBalance(addr4.address)
    // const addr4EthValue = ethers.utils.formatEther(addr4WeiValue);
    // //const addr3ExpectedValue = ethers.utils.formatEther(BigInt(10423*(10**18)));
    // //const addr4ExpectedValue = ethers.utils.formatEther(BigInt(10576*(10**18)));

    // const nom1 = await retro.getNominationData(0,0);
    // const nom2 = await retro.getNominationData(0,1);
    // const round1 = await retro.getRoundData(0);

    // console.log(addr3EthValue);
    // console.log(addr4EthValue);

    //expect(addr3EthValue > (addr3ExpectedValue-2));
    //expect(addr4EthValue > (addr4ExpectedValue-2));
  });
});