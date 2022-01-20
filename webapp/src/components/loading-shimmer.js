import styled, { keyframes } from 'styled-components'

const shimmer = keyframes`
  to {
    background-position: -200% center;
  }
`

const LoadingShimmerShape = styled.div(
  ({ height, width, maxWidth, minWidth, margin, marginTop, marginBottom, marginLeft, marginRight }) => `
  height: ${height || '18px'};
  width: ${width};
  max-width: ${maxWidth};
  min-width: ${minWidth};
  margin-top: ${marginTop};
  margin-right: ${marginRight};
  margin-bottom: ${marginBottom};
  margin-left: ${marginLeft};
  margin: ${margin};
`
)

const LoadingShimmer = styled(LoadingShimmerShape)`
  background: linear-gradient(-90deg, rgba(232, 233, 236, 0.3) 0%, #e8e9ec 100%);
  animation-name: ${shimmer};
  animation-duration: 1.5s;
  animation-fill-mode: forwards;
  animation-function: linear;
  animation-iteration-count: infinite;
  background-size: 200% auto;
`

export default LoadingShimmer
