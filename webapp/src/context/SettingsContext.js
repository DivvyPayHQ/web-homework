import React from 'react'

export const SettingsContext = React.createContext({
  options: { showMusic: false, showRomanNumerals: false },
  updateSettings: () => {}
})
