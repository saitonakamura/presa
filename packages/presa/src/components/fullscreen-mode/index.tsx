import { Component } from 'react'
import styled from 'styled-components'

import { Slide } from '../slide'
import { ConnectedState } from '../presentation-container'

const KEY_ESC = 27

type Props = Pick<
  ConnectedState,
  'slide' | 'slideWidth' | 'slideHeight' | 'toggleFullscreen'
>

type State = {
  screenWidth: number
  screenHeight: number
}

class FullscreenMode extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
    }
  }

  componentWillMount() {
    this.onResize()
  }

  // TODO: implement an event throttling
  onResize = () => {
    this.setState({
      screenWidth: document.documentElement.clientWidth,
      screenHeight: document.documentElement.clientHeight,
    })
  }

  onKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === KEY_ESC) {
      this.props.toggleFullscreen()
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize)
    document.body.addEventListener('keydown', this.onKeyDown)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
    document.body.removeEventListener('keydown', this.onKeyDown)
  }

  render() {
    const { slide, slideWidth, slideHeight } = this.props

    const screenGeometry = {
      width: this.state.screenWidth,
      height: this.state.screenHeight,
    }

    return (
      <Fullscreen>
        <Layer>
          <Slide
            slide={slide}
            key={slide.index}
            width={slideWidth}
            height={slideHeight}
            fitInto={screenGeometry}
          />
        </Layer>
      </Fullscreen>
    )
  }
}

const Layer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
`

const Fullscreen = styled.div`
  height: 100%;
  width: 100%;
  overflow: hidden;
`

export default FullscreenMode
