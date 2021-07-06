import React, { PureComponent } from 'react'
import Layout from 'Components/layout/Layout'
import { withRouter } from 'react-router-dom'
import Section, { SECTION_TYPES } from 'Components/section/Section'
import TextLineInput from 'Components/textLineInput/TextLineInput'
import { connect } from 'react-redux'
import { selectViewState } from 'Reducers/AppReducer'
import SaveButton from 'Components/buttons/SaveButton'
import { shape, string, func } from 'prop-types'
import { isNotEmpty, isNumeric } from 'Validation/validators'
import { onChange, validate } from 'Helpers/fields'
import { css } from '@emotion/core'

class TransactionsNew extends PureComponent {
  state = {
    editing: false,
    loading: false,
    isValid: false,
    fields: {
      amount: {
        value: '',
        validators: [
          isNotEmpty,
          isNumeric
        ]
      },
      name: {
        value: '',
        validators: [
          isNotEmpty
        ]
      },
      category: {
        value: '',
        validators: [
          isNotEmpty
        ]
      },
      location: {
        value: '',
        validators: [
          isNotEmpty
        ]
      }
    }
  }

  onChange = (event) => {
    onChange(event, this)
  }

  onSave = () => {
    const { history } = this.props

    validate(this, () => {
      const { isValid } = this.state
      if (isValid) {
        // Call API Here
        this.setState({ loading: true })
        setTimeout(() => {
          this.setState({ loading: false })
          history.push('/transactions?page=1')
        }, 1500)
      }
    })
  }

  render () {
    const { theme } = this.props
    const { loading, fields: { name, amount, location, category } } = this.state
    return (
      <Layout
        buttons={(
          <SaveButton
            loading={loading}
            onClick={this.onSave}
          />
        )}
        theme={theme}
        title='new transaction'
      >
        <Section
          theme={theme}
          title='detail'
          type={SECTION_TYPES.HALF}
        >
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
        </Section>
        <Section
          theme={theme}
          title='merchant'
          type={SECTION_TYPES.HALF}
        >
          <div css={containerStyles}>
            <TextLineInput
              error={name.error}
              label='name'
              name='name'
              onChange={this.onChange}
              theme={theme}
              value={name.value}
            />
            <TextLineInput
              error={category.error}
              label='category'
              name='category'
              onChange={this.onChange}
              theme={theme}
              value={category.value}
            />
            <TextLineInput
              error={location.error}
              label='location'
              name='location'
              onChange={this.onChange}
              theme={theme}
              value={location.value}
            />
          </div>
        </Section>
      </Layout>
    )
  }
}

const containerStyles = css`
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

function mapStateToProps (state) {
  const viewState = selectViewState(state)
  return {
    theme: viewState.theme
  }
}

export default connect(mapStateToProps)(withRouter(TransactionsNew))

TransactionsNew.propTypes = {
  theme: shape({
    type: string,
    background: string,
    secondary: string,
    color: string,
    accent: string,
    highlight: string
  }),
  history: shape({
    push: func
  })
}
