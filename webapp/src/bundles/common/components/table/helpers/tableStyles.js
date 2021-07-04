import * as colors from '../../../config/colors'

export const header = (props) => {
  return {
    '& th': {
      background: props.theme.secondary,
      borderBottom: 'none',
      fontFamily: 'Open Sans',
      fontSize: '14',
      fontWeight: '700',
      textTransform: 'capitalize',
      color: props.theme.color
    }
  }
}

export const responsiveColumn = {
  '@media(max-width: 900px)': {
    display: 'none'
  }
}

export const row = (props) => {
  return {
    '& td': {
      fontFamily: 'Open Sans',
      fontSize: '14px',
      border: 'none',
      color: props.theme.color,
      borderBottom: 'none',
      cursor: 'pointer',
      height: '72px',
      boxSizing: 'border-box'
    },
    '&:hover': {
      background: props.theme.highlight,
      '& td': {
        color: colors.WHITE
      },
      '& td div svg': {
        stroke: `${colors.WHITE} !important`
      },
      '& td div p': {
        color: `${colors.WHITE} !important`
      }
    }
  }
}

export const rowOdd = (props) => {
  return {
    '& td': {
      fontFamily: 'Open Sans',
      fontSize: '14px',
      border: 'none',
      color: props.theme.color,
      borderBottom: 'none',
      cursor: 'pointer',
      background: props.theme.secondary,
      height: '72px',
      boxSizing: 'border-box'
    },
    '&:hover': {
      '& td': {
        color: colors.WHITE,
        background: `${props.theme.highlight}`
      },
      '& td div svg': {
        stroke: `${colors.WHITE} !important`
      },
      '& td div p': {
        color: `${colors.WHITE} !important`
      }
    }
  }
}
