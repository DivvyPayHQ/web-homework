import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../shared/colors'
import { useCompanies } from '../gql'

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
function CompanyPicker ({ company, setCompanyId }) {
  const { companies } = useCompanies()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(company)

  return (
    <Wrapper onClick={() => setIsOpen(!isOpen)}>
      {selectedCompany?.name || 'Select Company'}
      {companies && isOpen && (
        <DropDown>
          {companies.map((c, k) => (
            <Row
              key={k}
              onClick={() => {
                setCompanyId(c?.id)
                setSelectedCompany(c)
              }}
            >
              {c.name}
            </Row>
          ))}
        </DropDown>
      )}
    </Wrapper>
  )
}

CompanyPicker.defaultProps = {
  setCompanyId: () => {}
}

CompanyPicker.propTypes = {
  company: PropTypes.object,
  setCompanyId: PropTypes.func
}
export default CompanyPicker
