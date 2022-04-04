import React, { useRef } from 'react'
import styled from 'styled-components'
import { useTable, Button, ChevronUpIcon, ColumnType } from '@pancakeswap/uikit'
import { useTranslation } from 'contexts/Localization'

import Row, { RowProps } from './Row'

export interface ITableProps {
  data: RowProps[]
  columns: ColumnType<RowProps>[]
  userDataReady: boolean
  sortColumn?: string
}

const Container = styled.div`
  filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;
  background: ${({ theme }) => theme.card.background};
  border-radius: 16px;
  margin: 16px 0px;
`

const TableWrapper = styled.div`
  overflow: visible;
  scroll-margin-top: 64px;

  &::-webkit-scrollbar {
    display: none;
  }
`



const StyledTable = styled.table`
  border-collapse: separate;
  border-spacing: 0px 16px;
  font-size: 14px;
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  background: rgb(13 4 21);
  
  td: first-child {
    border-radius: 10px 0 0 10px;
  }
  td: last-child {
    border-radius: 0 10px 10px 0;
  }
`

const TableBody = styled.tbody`
  table, tr {
    background: #161522;
    td {
      font-size: 24px;
      vertical-align: middle;
      height: 100px;
    }
  }

`
const styledCardT = styled.div`
    font-size: 16px;
    vertical-align: middle;
`

const TableContainer = styled.div`
  position: relative;
`

const ScrollButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 5px;
  padding-bottom: 5px;
`

const FarmTable: React.FC<ITableProps> = (props) => {
  console.log('debug->userdr3', props)
  const tableWrapperEl = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()
  const { data, columns, userDataReady } = props

  const { rows } = useTable(columns, data, { sortable: true, sortColumn: 'farm' })
  console.log('debug rows',rows)

  const scrollToTop = (): void => {
    tableWrapperEl.current.scrollIntoView({
      behavior: 'smooth',
    })
  }

  return (
    <Container id="farms-table">
      <TableContainer>
        <TableWrapper ref={tableWrapperEl}>
          <StyledTable>
            <TableBody>
              {rows.map((row) => {
                return <Row {...row.original} userDataReady={userDataReady} key={`table-row-${row.id}`} />
              })}
              <div 
              style ={{
                marginBottom: '10px',
              }} />
            </TableBody>
          </StyledTable>
        </TableWrapper>
        {/* <ScrollButtonContainer>
          <Button variant="text" onClick={scrollToTop}>
            {t('To Top')}
            <ChevronUpIcon color="primary" />
          </Button>
        </ScrollButtonContainer> */}
      </TableContainer>
    </Container>
  )
}

export default FarmTable
