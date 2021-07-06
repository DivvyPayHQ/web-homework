import React, { PureComponent } from 'react'
import Section, { SECTION_TYPES } from 'Components/section/Section'
import TextLine from 'Components/textLine/TextLine'
import TextLineInput from 'Components/textLineInput/TextLineInput'
import EditSaveButton from 'Components/buttons/EditSaveButton'
import { onChange, validate } from 'Helpers/fields'
import { isNotEmpty, isNumeric } from 'Validation/validators'
import { css } from '@emotion/core'

export default class Merchant extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      loading: false,
      isValid: false,
      fields: {
        name: {
          value: 'Dominoes',
          validators: [
            isNotEmpty,
            isNumeric
          ]
        },
        category: {
          value: 'Food & Drinks',
          validators: [
            isNotEmpty,
            isNumeric
          ]
        },
        location: {
          value: 'Riverton, UT',
          validators: [
            isNotEmpty,
            isNumeric
          ]
        }
      }
    }
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
      // Call Api
    })
  }

  render () {
    const { theme } = this.props
    const { editing, loading, fields: { name, category, location } } = this.state
    return (
      <Section
        buttons={(
          <EditSaveButton
            editing={editing}
            onEditClick={this.toggleEdit}
            onSaveClick={this.toggleEdit}
            theme={theme}
          />
        )}
        theme={theme}
        title='merchant'
        type={SECTION_TYPES.HALF}
      >
        {
          !editing && (
            <div css={containerStyles}>
              <TextLine
                label='Name'
                theme={theme}
                value={name.value}
              />
              <TextLine
                label='Category'
                theme={theme}
                value={category.value}
              />
              <TextLine
                label='Location'
                theme={theme}
                value={location.value}
              />
            </div>
          )
        }
        {
          editing && (
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
