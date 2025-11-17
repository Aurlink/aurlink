// src/hooks/useVesting.js
import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';

// ABI for the AURLINK Vesting contract
const VESTING_CONTRACT_ABI = [
  "function aurlinkToken() external view returns (address)",
  "function MAX_VESTING_AMOUNT() external view returns (uint256)",
  "function vestingSchedules(address) external view returns (uint128 totalAmount, uint128 releasedAmount, uint64 startTime, uint32 cliff, uint32 duration, uint8 category, bool initialized)",
  "function getVestingInfo(address) external view returns (uint256 totalAmount, uint256 releasedAmount, uint256 lockedAmount, uint256 releasableAmount, uint256 startTime, uint256 cliffEnd, uint256 vestingEnd, uint8 category)",
  "function calculateReleasableAmount(address) external view returns (uint256)",
  "function releaseTokens() external",
  "function initializeVesting(address,uint256,uint8,uint256) external",
  "function batchInitializeVesting(address[],uint256[],uint8,uint256) external",
  "function revokeVesting(address) external",
  "function modifyVestingSchedule(address,uint256,uint256,uint256) external",
  "function pause() external",
  "function unpause() external",
  "function getContractBalance() external view returns (uint256)",
  "event VestingInitialized(address indexed investor, uint256 totalAmount, uint8 category, uint256 startTime)",
  "event TokensReleased(address indexed investor, uint256 amount)",
  "event VestingRevoked(address indexed investor, uint256 unreleasedAmount)",
  "event VestingModified(address indexed investor, uint256 newStartTime, uint256 newCliff, uint256 newDuration)"
];

// Update this with your actual contract address
const VESTING_CONTRACT_ADDRESS = "YOUR_DEPLOYED_VESTING_CONTRACT_ADDRESS";

export const useVesting = () => {
  const { library, account, active } = useWeb3React();
  const [vestingContract, setVestingContract] = useState(null);
  const [vestingInfo, setVestingInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (library && active) {
      try {
        const signer = library.getSigner();
        const contract = new ethers.Contract(VESTING_CONTRACT_ADDRESS, VESTING_CONTRACT_ABI, signer);
        setVestingContract(contract);
      } catch (err) {
        console.error('Error creating vesting contract:', err);
        setError('Failed to connect to vesting contract');
      }
    }
  }, [library, active]);

  const getVestingInfo = async (investorAddress = null) => {
    if (!vestingContract) {
      setError('Vesting contract not connected');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const address = investorAddress || account;
      if (!address) {
        throw new Error('No wallet address provided');
      }

      const info = await vestingContract.getVestingInfo(address);
      
      const formattedInfo = {
        totalAmount: info.totalAmount.toString(),
        releasedAmount: info.releasedAmount.toString(),
        lockedAmount: info.lockedAmount.toString(),
        releasableAmount: info.releasableAmount.toString(),
        startTime: parseInt(info.startTime.toString()),
        cliffEnd: parseInt(info.cliffEnd.toString()),
        vestingEnd: parseInt(info.vestingEnd.toString()),
        category: parseInt(info.category.toString()),
        initialized: info.totalAmount.gt(0) // If totalAmount > 0, it's initialized
      };
      
      setVestingInfo(formattedInfo);
      return formattedInfo;
    } catch (err) {
      console.error('Error fetching vesting info:', err);
      // If the investor has no vesting schedule, return default values
      if (err.message.includes('No vesting schedule') || err.message.includes('not initialized')) {
        const defaultInfo = {
          totalAmount: '0',
          releasedAmount: '0',
          lockedAmount: '0',
          releasableAmount: '0',
          startTime: 0,
          cliffEnd: 0,
          vestingEnd: 0,
          category: 0,
          initialized: false
        };
        setVestingInfo(defaultInfo);
        return defaultInfo;
      }
      setError('Failed to fetch vesting info: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const releaseTokens = async () => {
    if (!vestingContract) {
      setError('Vesting contract not connected');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const tx = await vestingContract.releaseTokens();
      await tx.wait();
      
      // Refresh vesting info after release
      await getVestingInfo();
      return tx;
    } catch (err) {
      console.error('Error releasing tokens:', err);
      setError('Failed to release tokens: ' + err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const calculateReleasableAmount = async (investorAddress = null) => {
    if (!vestingContract) return '0';
    
    try {
      const address = investorAddress || account;
      if (!address) return '0';
      
      const amount = await vestingContract.calculateReleasableAmount(address);
      return amount.toString();
    } catch (err) {
      console.error('Failed to calculate releasable amount:', err);
      return '0';
    }
  };

  return {
    vestingContract,
    vestingInfo,
    loading,
    error,
    getVestingInfo,
    releaseTokens,
    calculateReleasableAmount
  };
};

export const useVestingAdmin = () => {
  const { library, account } = useWeb3React();
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState('');

  const getContract = () => {
    if (!library) throw new Error('Web3 not connected');
    const signer = library.getSigner();
    return new ethers.Contract(VESTING_CONTRACT_ADDRESS, VESTING_CONTRACT_ABI, signer);
  };

  const initializeVesting = async (investor, amount, category, startTime) => {
    setAdminLoading(true);
    setAdminError('');
    try {
      const contract = getContract();
      const tx = await contract.initializeVesting(
        investor,
        ethers.utils.parseUnits(amount.toString(), 18),
        category,
        Math.floor(startTime / 1000) // Convert to UNIX timestamp
      );
      await tx.wait();
      return tx;
    } catch (err) {
      console.error('Error initializing vesting:', err);
      setAdminError('Failed to initialize vesting: ' + err.message);
      throw err;
    } finally {
      setAdminLoading(false);
    }
  };

  const batchInitializeVesting = async (investors, amounts, category, startTime) => {
    setAdminLoading(true);
    setAdminError('');
    try {
      const contract = getContract();
      const parsedAmounts = amounts.map(amount => 
        ethers.utils.parseUnits(amount.toString(), 18)
      );
      const tx = await contract.batchInitializeVesting(
        investors,
        parsedAmounts,
        category,
        Math.floor(startTime / 1000)
      );
      await tx.wait();
      return tx;
    } catch (err) {
      console.error('Error batch initializing vesting:', err);
      setAdminError('Failed to batch initialize: ' + err.message);
      throw err;
    } finally {
      setAdminLoading(false);
    }
  };

  const revokeVesting = async (investor) => {
    setAdminLoading(true);
    setAdminError('');
    try {
      const contract = getContract();
      const tx = await contract.revokeVesting(investor);
      await tx.wait();
      return tx;
    } catch (err) {
      console.error('Error revoking vesting:', err);
      setAdminError('Failed to revoke vesting: ' + err.message);
      throw err;
    } finally {
      setAdminLoading(false);
    }
  };

  const modifyVestingSchedule = async (investor, newStartTime, newCliff, newDuration) => {
    setAdminLoading(true);
    setAdminError('');
    try {
      const contract = getContract();
      const tx = await contract.modifyVestingSchedule(
        investor,
        Math.floor(newStartTime / 1000),
        newCliff,
        newDuration
      );
      await tx.wait();
      return tx;
    } catch (err) {
      console.error('Error modifying vesting schedule:', err);
      setAdminError('Failed to modify vesting: ' + err.message);
      throw err;
    } finally {
      setAdminLoading(false);
    }
  };

  const pauseVesting = async () => {
    setAdminLoading(true);
    setAdminError('');
    try {
      const contract = getContract();
      const tx = await contract.pause();
      await tx.wait();
      return tx;
    } catch (err) {
      console.error('Error pausing vesting:', err);
      setAdminError('Failed to pause vesting: ' + err.message);
      throw err;
    } finally {
      setAdminLoading(false);
    }
  };

  const unpauseVesting = async () => {
    setAdminLoading(true);
    setAdminError('');
    try {
      const contract = getContract();
      const tx = await contract.unpause();
      await tx.wait();
      return tx;
    } catch (err) {
      console.error('Error unpausing vesting:', err);
      setAdminError('Failed to unpause vesting: ' + err.message);
      throw err;
    } finally {
      setAdminLoading(false);
    }
  };

  return {
    adminLoading,
    adminError,
    initializeVesting,
    batchInitializeVesting,
    revokeVesting,
    modifyVestingSchedule,
    pauseVesting,
    unpauseVesting
  };
};