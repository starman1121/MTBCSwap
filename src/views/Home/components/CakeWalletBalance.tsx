import React from 'react'
import { Text } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import { useTranslation } from 'contexts/Localization'
import CardValue from './CardValue'


const CakeWalletBalance = ({ miaBalance }) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '36px' }}>
        {t('Locked')}
      </Text>
    )
  }

  return <CardValue value={miaBalance} fontSize="24px" />
}

export default CakeWalletBalance
