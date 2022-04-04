import React from 'react'
import { Currency, Pair } from '@pancakeswap/sdk'
import { Button, ChevronDownIcon, Text, useModal, Flex } from '@pancakeswap/uikit'
import styled from 'styled-components'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import Lottie from 'lottie-react'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import { CurrencyLogo, DoubleCurrencyLogo } from '../Logo'
import selectCoinAnimation from '../../animation/select-coin.json'


import { RowBetween } from '../Layout/Row'
import { Input as NumericalInput } from './NumericalInput'

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

`
  // padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
const CurrencySelectButton = styled(Button).attrs({ variant: 'text', scale: 'sm' })`
  padding: 0 0;
  width: 40%;
  justify-content: left;
  background: none!important;
`
const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
`
const InputPanel = styled.div<{ hideInput?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '10px' : '10px')};
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;
  padding: 20px;
`
const Container = styled.div<{ hideInput: boolean }>`
  height: 54px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
`
const StyledSymbol = styled.div`
  text-align: left;
  margin: 0x 14px;
`
interface CurrencyInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
}
export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label,
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases,
}: CurrencyInputPanelProps) {
  const { account } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const { t } = useTranslation()
  const translatedLabel = label || t('Input')

  const [onPresentCurrencyModal] = useModal(
    <CurrencySearchModal
      onCurrencySelect={onCurrencySelect}
      selectedCurrency={currency}
      otherSelectedCurrency={otherCurrency}
      showCommonBases={showCommonBases}
    />,
  )
  return (
    <InputPanel id={id}>
        <RowBetween style={{ justifyContent: 'end'}}>
          {account && (
            <Text onClick={onMax} fontSize="14px" style={{ display: 'inline', cursor: 'pointer' }}>
              {!hideBalance && !!currency
                ? t('Balance: %balance%', { balance: selectedCurrencyBalance?.toSignificant(6) ?? t('Loading') })
                : ' -'}
            </Text>
          )}
        </RowBetween>
        <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {}} selected={disableCurrencySelect}>
            <CurrencySelectButton
              selected={!!currency}
              className="open-currency-select-button"
              onClick={() => {
                if (!disableCurrencySelect) {
                  onPresentCurrencyModal()
                }
              }}
              >
              <Flex alignItems="center" justifyContent="left">
                {pair ? (
                  <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={54} margin />
                ) : currency ? (
                  <CurrencyLogo currency={currency} size="54px" style={{ marginRight: '8px' }} />
                ) : (
                  <div className="rounded bg-dark-700" style={{ maxWidth: 54, maxHeight: 54 , marginRight:"8px"}}>
                    <div style={{ width: 54, height: 54 }}>
                      <Lottie animationData={selectCoinAnimation} autoplay loop />
                    </div>
                  </div>
                )}
                <StyledSymbol >
                  <Text fontSize='12px' color='#7f7f7f'> {translatedLabel}</Text>
                  <Flex>
                  {pair ? (
                    <Text id="pair" fontSize='24px'>
                      {pair?.token0.symbol}:{pair?.token1.symbol}
                    </Text>
                  ) : (
                    <Text id="pair">
                      {(currency && currency.symbol && currency.symbol.length > 20
                        ? `${currency.symbol.slice(0, 4)}...${currency.symbol.slice(
                            currency.symbol.length - 5,
                            currency.symbol.length,
                          )}`
                        : currency?.symbol) || t('Select a token')}
                    </Text>
                  )}
                  {!disableCurrencySelect && <ChevronDownIcon />}
                  </Flex>
                </StyledSymbol>
              </Flex>
            </CurrencySelectButton>
            
            <NumericalInput
                  className="token-amount-input"
                  value={value}
                  onUserInput={(val) => {
                    onUserInput(val)
                  }}
              />
        </InputRow>
    </InputPanel>
  )
}
