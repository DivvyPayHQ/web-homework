import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import colors from '../shared/colors'
import { useUsers } from '../gql'

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
function UserPicker ({ user, setUserId }) {
  const { users } = useUsers()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(user)

  return (
    <Wrapper onClick={() => setIsOpen(!isOpen)}>
      {(selectedUser?.id && `${selectedUser.firstName} ${selectedUser.lastName}`) || 'Select User'}
      {users && isOpen && (
        <DropDown>
          {users.map((u, k) => (
            <Row
              key={k}
              onClick={() => {
                setUserId(u?.id)
                setSelectedUser(u)
              }}
            >
              {`${u.firstName} ${u.lastName}`}
            </Row>
          ))}
        </DropDown>
      )}
    </Wrapper>
  )
}

UserPicker.defaultProps = {
  setUserId: () => {}
}

UserPicker.propTypes = {
  user: PropTypes.object,
  setUserId: PropTypes.func
}

export default UserPicker
