import React, { PureComponent } from 'react'
import Section, { SECTION_TYPES } from 'Components/section/Section'
import TextLine from 'Components/textLine/TextLine'
import TextLineInput from 'Components/textLineInput/TextLineInput'
import TransactionStatus from '../transactionStatus/TransactionStatus'
import EditSaveButton from 'Components/buttons/EditSaveButton'
import { onChange, validate } from 'Helpers/fields'
import { isNotEmpty, isNumeric } from 'Validation/validators'
import { css } from '@emotion/core'
import { shape, string } from 'prop-types'

export default class Detail extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      loading: false,
      isValid: false,
      fields: {
        amount: {
          value: '29.00',
          validators: [
            isNotEmpty,
            isNumeric
          ]
        }
      }
    }
  }

    state = {
      editing: false
    }

    toggleEdit = () => {
      const { editing } = this.state
      this.setState({
        editing: !editing
      })
    }

    onChange = (event) => {
      onChange(event, this)
    }

  onSave = () => {
    validate(this, () => {
      const { isValid } = this.state
      if (isValid) {
        // Call API Here
        this.setState({ loading: true })
        setTimeout(() => {
          this.setState({ loading: false })
          this.toggleEdit()
        }, 1500)
      }
    })
  }

  render () {
    const { theme } = this.props
    const { editing, loading, fields: { amount } } = this.state
    return (
      <Section
        buttons={(
          <EditSaveButton
            editing={editing}
            loading={loading}
            onEditClick={this.toggleEdit}
            onSaveClick={this.onSave}
            theme={theme}
          />
        )}
        theme={theme}
        title='detail'
        type={SECTION_TYPES.HALF}
      >
        {
          !editing && (
            <div css={containerStyles}>
              <TextLine
                label='Date'
                theme={theme}
                value='01-01-2021'
              />
              <TextLine
                label='Amount'
                theme={theme}
                value={amount.value}
              />
              <TransactionStatus
                status='PENDING'
                theme={theme}
              />
            </div>
          )
        }
        {
          editing && (
            <div css={containerStyles}>
              <TextLineInput
                error={amount.error}
                label='amount'
                name='amount'
                onChange={this.onChange}
                theme={theme}
                value={amount.value}
              />
            </div>
          )
        }
      </Section>
    )
  }
}

const containerStyles = css`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

Detail.propTypes = {
  theme: shape({
    type: string,
    background: string,
    secondary: string,
    color: string,
    accent: string,
    highlight: string
  })
}