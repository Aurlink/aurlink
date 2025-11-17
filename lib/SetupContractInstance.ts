import { ethers } from "ethers";
import { useWallet } from "../contexts/WalletContext";
import AURLINKVestingABI from "../abis/AURLINKVesting.json"; // your ABI JSON

const VESTING_CONTRACT_ADDRESS = "0xYourVestingContractAddress";

export const useVestingContract = () => {
  const { walletAddress, provider } = useWallet();

  const contract = new ethers.Contract(
    VESTING_CONTRACT_ADDRESS,
    AURLINKVestingABI,
    provider?.getSigner()
  );

  return { contract, walletAddress };
};
