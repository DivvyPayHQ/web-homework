import React from 'react'
import PropTypes from 'prop-types'
import M from 'react-modal'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../shared/colors'
import { Button } from './'

M.setAppElement('#react-app')

/************************************
 * REACT STYLED COMPONENTS
 ***********************************/
const Content = styled.div`
  flex: 1;
  margin: 24px;
`

const Footer = styled.div`
  border-top: 2px solid ${colors.mystic};
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  padding: 24px;
`

const Header = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 16px;
`

/************************************
 * CONSTANTS
 ***********************************/
const MODAL_STYLE = {
  content: {
    boxShadow: `0px 0px 8px 6px ${colors.mystic}`,
    bottom: 'auto',
    borderColor: colors.mystic,
    borderRadius: '16px',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '800px',
    left: '50%',
    marginRight: '-50%',
    padding: 0,
    right: 'auto',
    top: '50%',
    width: '420px',
    transform: 'translate(-50%, -50%)'
  },
  overlay: {
    overflowX: 'hidden',
    overflowY: 'auto',
    zIndex: 2
  }
}

/************************************
 * LOCAL FUNCTIONS
 ***********************************/
function onRequestClose (navigate) {
  return navigate(-1)
}

/************************************
 * DEFAULT COMPONENT
 ***********************************/
function Modal ({ children, height, title, onSubmit }) {
  const navigate = useNavigate()
  return (
    <M
      isOpen
      onRequestClose={() => onRequestClose(navigate)}
      style={{ ...MODAL_STYLE, content: { ...MODAL_STYLE.content, height } }}
    >
      <Content>
        <Header>{title}</Header>
        {children}
      </Content>
      <Footer>
        <Button onClick={() => onRequestClose(navigate)}>Close</Button>
        {onSubmit && <Button onClick={onSubmit}>Submit</Button>}
      </Footer>
    </M>
  )
}

Modal.propTypes = {
  children: PropTypes.any,
  height: PropTypes.string,
  onSubmit: PropTypes.func,
  title: PropTypes.string
}

export default Modal
