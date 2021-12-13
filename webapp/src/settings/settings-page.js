import React, { useContext } from 'react'
import { CheckBox } from '@kyper/input'

import { SettingsContext } from 'src/context/SettingsContext'

export function Settings () {
  const context = useContext(SettingsContext)
  const { showMusic, showRomanNumerals } = context.options

  return (
    <div>
      <h2>Settings</h2>
      <br />
      <CheckBox
        checked={showMusic}
        id='music'
        label='Enable Music Player'
        labelPosition='right'
        name='music'
        onChange={() => context.updateSettings(state => ({ ...state, showMusic: !state.showMusic }))}
      />
      <br />
      <CheckBox
        checked={showRomanNumerals}
        id='roman'
        label='Enable Roman Numerals'
        labelPosition='right'
        name='roman'
        onChange={() => context.updateSettings(state => ({ ...state, showRomanNumerals: !state.showRomanNumerals }))}
      />

    </div>
  )
}
