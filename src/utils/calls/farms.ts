import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL,TOKEN_DECIMAL } from 'config'
import getGasPrice from 'utils/getGasPrice'
import { BIG_TEN } from 'utils/bigNumber'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const stakeFarm = async (masterChefContract, pid, amount) => {
  const gasPrice = getGasPrice()
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  console.log('debug->staking',pid, value)
  if (pid === 0) {
    console.log('debug->staking123', value)
    const tx = await masterChefContract.enterStaking(value, { ...options, gasPrice })
    
    const receipt = await tx.wait()
    return receipt.status
  }

  if(pid === 2 || pid === 1){
    const tokenValue = new BigNumber(amount).times(TOKEN_DECIMAL).toString()
    const tx = await masterChefContract.deposit(pid, tokenValue, { ...options, gasPrice })
    const receipt = await tx.wait()
    return receipt.status
  }

  const tx = await masterChefContract.deposit(pid, value, { ...options, gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}

export const unstakeFarm = async (masterChefContract, pid, amount) => {
  const gasPrice = getGasPrice()


  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
  if (pid === 0) {
    const tx = await masterChefContract.leaveStaking(value, { ...options, gasPrice })
    const receipt = await tx.wait()
    return receipt.status
  }

  if(pid === 2 || pid === 1){
    const tokenValue = new BigNumber(amount).times(TOKEN_DECIMAL).toString()
    const tx = await masterChefContract.withdraw(pid, tokenValue, { ...options, gasPrice })
    const receipt = await tx.wait()
    return receipt.status
  }
 
  const tx = await masterChefContract.withdraw(pid, value, { ...options, gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}

export const harvestFarm = async (masterChefContract, pid) => {
  const gasPrice = getGasPrice()
  if (pid === 0) {
    const tx = await masterChefContract.leaveStaking('0', { ...options, gasPrice })
    const receipt = await tx.wait()
    return receipt.status
  }
  const tx = await masterChefContract.deposit(pid, '0', { ...options, gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}
