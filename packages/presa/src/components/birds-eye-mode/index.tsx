import { Component } from 'react';
import styled, { css } from 'styled-components'

import Controls from '../controls'
import { Slide } from '../slide'
import { ConnectedState } from '../presentation-container'

const gridSlideWidth = 320

type Props = ConnectedState

type State = {
  isSlideLoaded: Record<string, boolean>
}

class NavigationMode extends Component<Props, State> {
  _observer?: IntersectionObserver
  _root: HTMLElement | null = null
  constructor(props: Props) {
    super(props)
    this.state = {
      isSlideLoaded: {},
    }
  }

  loadSlide = (index: number | string, loaded = true) => {
    this.setState((state: State) => ({
      isSlideLoaded: {
        ...state.isSlideLoaded,
        [String(index)]: loaded,
      },
    }))
  }

  handleSlideClick = (index: number) => {
    this.props.switchSlide(index)
    this.props.toggleBirdsEye()
  }

  handleIntersection = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    // Get the list of slides ids that are
    // currently visible within the viewport.
    const visible: string[] = entries
      .filter((entry) => entry.isIntersecting)
      .map((entry) => (entry.target as HTMLElement).dataset.slideId)
      .filter((id): id is string => !!id)

    visible.forEach((id) => this.loadSlide(id))
  }

  componentDidMount() {
    const { IntersectionObserver } = window

    if (!IntersectionObserver || !this._root) {
      // Fallback for older browsers:
      // load everything up!
      this.props.slides.forEach((_, idx) => this.loadSlide(idx))
      return
    }

    const options = {
      threshold: 0.5,
    }

    this._observer = new IntersectionObserver(this.handleIntersection, options)

    // Fire observer up for slide items
    ;[].forEach.call(this._root.querySelectorAll('[data-slide-id]'), (el) =>
      this._observer?.observe(el)
    )
  }

  componentWillUnmount() {
    const { _observer } = this

    if (_observer && _observer.disconnect) {
      // Stop observing elements when unmounted
      _observer.disconnect()
    }
  }

  render() {
    const { slides, currentSlide } = this.props

    return (
      <Container ref={(el) => (this._root = el)}>
        <Grid>
          {slides.map((slide, index) => {
            const isLoaded = !!this.state.isSlideLoaded[index.toString()]

            return (
              <SlideItem
                onClick={() => this.handleSlideClick(index)}
                key={index}
                data-slide-id={index}
              >
                <SlideCard
                  loaded={isLoaded}
                  slide={slide}
                  width={this.props.slideWidth}
                  height={this.props.slideHeight}
                  fitInto={{ width: gridSlideWidth }}
                  isCurrent={currentSlide === index}
                />

                <SlideName>{slide.name}</SlideName>
              </SlideItem>
            )
          })}
        </Grid>
      </Container>
    )
  }
}

const SlideName = styled.div`
  color: ${(props) => props.theme.darkGrayColor};
  text-align: center;
  padding: 0px 10px;
  margin-top: 10px;
`

const SlideItem = styled.div`
  &:hover {
    ${SlideName} {
      color: black;
    }
  }
`

const SlideCard = styled(Slide)<{ isCurrent: boolean }>`
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.15),
    0px 1px 6px 0px rgba(0, 0, 0, 0.03)
      ${(props) =>
        props.isCurrent &&
        css`
      , 0px 0px 0px 4px ${(props) => props.theme.primaryColor};
    `};
`

const Container = styled.div`
  max-width: 1100px;
  margin: 0px auto;
  padding: 32px 12px 64px 12px;
`

const Grid = styled.div`
  display: grid;

  grid-column-gap: 20px;
  grid-row-gap: 24px;
  justify-content: center;

  grid-template-columns: repeat(auto-fill, ${gridSlideWidth}px);
  grid-auto-flow: dense;
`

export default NavigationMode
