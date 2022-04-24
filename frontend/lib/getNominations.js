import { ethers } from "ethers"

export async function getNominations(id) {
    console.log(id);

    const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_URL);

    const retroAddress = "0x3cAD7cd0d54E0794D5864e9979B21a60E04fDC6b"
    const retroABI = [
      "function getNominationData(uint256 roundNum, uint256 nominationNum) public view returns (string memory, address, uint256)",
      "function getRoundData(uint256 roundNum) public view returns(string memory, uint256, uint256, uint256, uint256)"
    ]
    const retroContract = new ethers.Contract(retroAddress, retroABI, provider);
    const nominationNum = (await retroContract.getRoundData(id))[3].toNumber();

    let nominations = [];
    for (let i = 0; i < nominationNum; i++) {
        const nom = await retroContract.getNominationData(id, i);
        nominations.push({
            nominationURI: nom[0],
            recipient: nom[1],
            numVotes: nom[2].toNumber()
        })
    }

    return nominations;
}