import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../shared/colors'
import { useMerchants } from '../gql'

/************************************
 * REACT STYLED COMPONENTS
 ***********************************/
const DropDown = styled.div`
  background-color: ${colors.white};
  border: 1px solid ${colors.jumbo};
  border-radius: 0 0 4px 4px;
  left: -1px;
  height: 100px;
  overflow-y: scroll;
  position: absolute;
  top: 36px;
  width: 100%;
  z-index: 2;
`

const Row = styled.div`
  padding: 8px 16px;
  margin 6px 0;

  :hover {
    background-color: ${colors.smoke};
    cursor: pointer;
  }
`

const Wrapper = styled.div`
  align-items: center;
  border-radius: 4px;
  border: 1px solid ${colors.jumbo};
  display: flex;
  font-size: 16px;
  padding: 8px 16px;
  position: relative;

  :hover {
    background-color: ${colors.smoke};
    cursor: pointer;
  }
`
/************************************
 * DEFAULT COMPONENT
 ***********************************/
function MerchantPicker ({ merchant, setMerchantId }) {
  const { merchants } = useMerchants()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedMerchant, setSelectedMerchant] = useState(merchant)

  return (
    <Wrapper onClick={() => setIsOpen(!isOpen)}>
      {selectedMerchant?.name || 'Select Merchant'}
      {merchants && isOpen && (
        <DropDown>
          {merchants.map((m, k) => (
            <Row
              key={k}
              onClick={() => {
                setMerchantId(m?.id)
                setSelectedMerchant(m)
              }}
            >
              {m.name}
            </Row>
          ))}
        </DropDown>
      )}
    </Wrapper>
  )
}

MerchantPicker.defaultProps = {
  setMerchantId: () => {}
}

MerchantPicker.propTypes = {
  merchant: PropTypes.object,
  setMerchantId: PropTypes.func
}

export default MerchantPicker
