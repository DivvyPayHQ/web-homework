import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { convertToRoman } from 'src/utils/numbers'

export function NumberSpinner ({ start = 0, end = 100, duration = 2000, showRomanNumerals = false }) {
  // Not my code
  const [num, setNum] = useState(start)
  const numRef = useRef(num)
  const isIncreasing = end >= start
  const isDone = isIncreasing ? numRef.current >= end : numRef.current <= end
  const progress = end !== 0 ? numRef.current / end : 0
  const domain = 1 + Math.abs(end - start)
  const delta = domain / 100
  const initialDelay = duration / 100
  const adjustedDelay = Math.round(progress * 80)
  const combinedDelay = progress < 0.9 ? initialDelay : initialDelay + adjustedDelay

  useEffect(() => {
    const interval = setTimeout(() => {
      let n = numRef.current
      if (isDone) {
        n = end
      } else {
        n = isIncreasing ? numRef.current + delta : numRef.current - delta
      }
      numRef.current = isIncreasing ? Math.min(n, end) : Math.max(n, end)
      setNum(numRef.current)
    }, combinedDelay)

    return () => clearTimeout(interval)
  }, [numRef.current])

  return <span>{showRomanNumerals ? convertToRoman(Math.round(numRef.current)) : Math.round(numRef.current)}</span>
}

NumberSpinner.propTypes = {
  start: PropTypes.number,
  end: PropTypes.number,
  duration: PropTypes.number,
  showRomanNumerals: PropTypes.bool
}
