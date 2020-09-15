import React from 'react'
import { useTheme } from 'styled-components'
import { ConnectedState } from './presentation-container'

type BodyBackgroundProps = {
  background?: string
}

// Helper component. Update the body background
// according to the `background` prop.
class BodyBackground extends React.Component<BodyBackgroundProps> {
  constructor(props: BodyBackgroundProps) {
    super(props)
    this.useBackground(props.background)
  }

  useBackground(prop: any) {
    const body = document.querySelector('body')
    body && (body.style.background = prop)
  }

  componentWillReceiveProps(nextProps: BodyBackgroundProps) {
    if (nextProps.background !== this.props.background) {
      this.useBackground(nextProps.background)
    }
  }

  shouldComponentUpdate() {
    return false
  }

  // Don't render anything
  render() {
    return null
  }
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
