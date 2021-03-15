import { useCallback, useEffect } from 'react'
import { useTheme } from 'styled-components'
import { ConnectedState } from './presentation-container'

type BodyBackgroundProps = {
  background?: string
}

// Helper component. Update the body background
// according to the `background` prop.
const BodyBackground = (props: BodyBackgroundProps) => {
  const changeBackground = useCallback((prop: string | undefined) => {
    const body = document.querySelector('body')
    body && (body.style.background = prop ?? '')
  }, [])

  useEffect(() => changeBackground(props.background), [props.background])
  return null
}

const GlobalBackground = (props: Pick<ConnectedState, 'isFullscreen'>) => {
  const theme = useTheme()
  let color = theme.backgroundColor

  if (props.isFullscreen) {
    color = theme.fullscreenBackgroundColor
  }

  return <BodyBackground background={color} />
}

export default GlobalBackground
