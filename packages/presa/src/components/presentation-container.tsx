import { Component } from 'react'
import styled, { ThemeProvider, DefaultTheme } from 'styled-components'

import GlobalBackground from './global-background'
import RemoteControl from './remote-control'
import FullscreenMode from './fullscreen-mode'
import SlideshowMode from './slideshow-mode'
import BirdsEyeMode from './birds-eye-mode'

// default theme for styled components
import defaultTheme from '../theme'

import { NO_FRAGMENTS, ALL_FRAGMENTS } from './fragment/constants'
import Slide from './slide/slide-decl'
import FragmentManager from './fragment/manager'

const modes = {
  FULLSCREEN: 'FULLSCREEN',
  SLIDESHOW: 'SLIDESHOW',
  BIRDSEYE: 'BIRDSEYE',
} as const

export type PresentationMode = typeof modes[keyof typeof modes]

// Gets the current slide index from
// the url hash e.g. /#10
const extractIndexFromLocation = () => {
  const numbers = window.location.hash.replace(/\D/g, '')
  return parseInt(numbers) || 0
}

export type SlideData = {
  name?: string
  description?: string
  element: Slide
}

type PresentationProps = {
  name: string
  aspectRatio: number
  baseWidth: number
  slides: SlideData[]
  theme: Partial<DefaultTheme>
  tableOfContents: boolean
  useFullscreenAPI: boolean
}

type PresentationState = {
  slides: SlideData[]
  presentationName: string
  presentMode: PresentationMode
  currentSlide: number
  initialFragment: number
  showToc: boolean
  slideWidth: number
  slideHeight: number
}

export type ToggleFullscreen = (goFullscreen?: boolean) => void

export type SwitchSlide = (id: number, forwards?: boolean) => void

export type ToggleToc = (shown?: boolean) => void

export type ToggleBirdsEye = () => void

export type ShowNextSlide = () => void

export type ShowPrevSlide = () => void

export type ConnectedState = PresentationState & {
  slide: SlideData & {
    id: number
    index: number
    initialFragmentIndex: number
    isFirst: boolean
    isLast: boolean
    setFragmentManager: (m: FragmentManager) => void
  }

  isSlideshow: boolean
  isFullscreen: boolean
  isBirdsEye: boolean
  toggleFullscreen: ToggleFullscreen

  switchSlide: SwitchSlide
  toggleToc: ToggleToc
  toggleBirdsEye: ToggleBirdsEye
  showNextSlide: ShowNextSlide
  showPrevSlide: ShowPrevSlide
}

const clamp = (min: number, val: number, max: number) =>
  Math.max(Math.min(max, val), min)

class Presentation extends Component<PresentationProps, PresentationState> {
  static defaultProps = {
    name: 'An awesome presentation',
    aspectRatio: 16.0 / 9.0,
    baseWidth: 1066.0,
    tableOfContents: false,
    useFullscreenAPI: false,
    theme: {},
  }
  private _fragmentManager: FragmentManager | undefined

  constructor(props: PresentationProps) {
    super(props)

    const currentIndex = clamp(
      0,
      extractIndexFromLocation(),
      props.slides.length - 1
    )

    this.state = {
      slides: props.slides,
      presentationName: props.name,
      presentMode: modes.SLIDESHOW,
      currentSlide: currentIndex,
      initialFragment: NO_FRAGMENTS,
      showToc: props.tableOfContents,

      slideWidth: props.baseWidth,
      slideHeight: props.baseWidth / props.aspectRatio,
    }
  }

  // Jump through `shift` number of slides/fragments
  navigate = (shift: number) => {
    const { slides, currentSlide } = this.state

    // first, talk to the current fragment manager
    // it returns `false` if no fragments left
    const manager = this._fragmentManager
    if (manager && manager.navigate(shift)) {
      return
    }

    // go to prev/next slide
    const id = currentSlide + shift
    const limited = Math.max(0, Math.min(id, slides.length - 1))

    const forwards = shift >= 0
    this.switchSlide(limited, forwards)
  }

  switchSlide = (id: number, forwards = true) => {
    window.location.hash = id.toString()

    // When moving forwards show no fragments first,
    // when going backwards all fragments activated first.
    const fragment = forwards ? NO_FRAGMENTS : ALL_FRAGMENTS
    this.setState({ currentSlide: id, initialFragment: fragment })
  }

  toggleFullscreen = (goFullscreen?: boolean) => {
    const { useFullscreenAPI } = this.props

    if (typeof goFullscreen === 'undefined') {
      goFullscreen = !(this.state.presentMode === modes.FULLSCREEN)
    }

    if (goFullscreen && useFullscreenAPI) {
      const docEl = document.documentElement

      // Use browser's Fullscreen API
      if (docEl && docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen()
      }
    }

    this.setState(() => ({
      presentMode: goFullscreen ? modes.FULLSCREEN : modes.SLIDESHOW,
    }))
  }

  toggleBirdsEye = () => {
    this.setState((state: PresentationState) => ({
      presentMode:
        state.presentMode === modes.BIRDSEYE ? modes.SLIDESHOW : modes.BIRDSEYE,
    }))
  }

  toggleToc = (shown?: boolean) => {
    const visible = typeof shown === 'undefined' ? !this.state.showToc : shown

    this.setState({
      showToc: visible,
    })
  }

  setFragmentManager = (manager: FragmentManager) => {
    this._fragmentManager = manager
  }

  getConnectedState(): ConnectedState {
    const { slides, currentSlide, presentMode, initialFragment } = this.state

    return {
      ...this.state,

      slide: {
        ...slides[currentSlide],
        id: currentSlide,
        index: currentSlide,
        initialFragmentIndex: initialFragment,
        isFirst: currentSlide <= 0,
        isLast: currentSlide >= slides.length - 1,
        setFragmentManager: this.setFragmentManager,
      },

      isSlideshow: presentMode === modes.SLIDESHOW,
      isFullscreen: presentMode === modes.FULLSCREEN,
      isBirdsEye: presentMode === modes.BIRDSEYE,
      toggleFullscreen: this.toggleFullscreen,

      switchSlide: this.switchSlide,
      toggleToc: this.toggleToc,
      toggleBirdsEye: this.toggleBirdsEye,
      showNextSlide: () => this.navigate(+1),
      showPrevSlide: () => this.navigate(-1),
    }
  }

  render() {
    const state = this.getConnectedState()

    const theme = {
      ...defaultTheme,
      ...this.props.theme,
    }

    return (
      <ThemeProvider theme={theme}>
        <GlobalContainer>
          <GlobalBackground {...state} />

          <RemoteControl
            onNext={state.showNextSlide}
            onPrev={state.showPrevSlide}
            onMute={() => null}
          />

          {state.isFullscreen && <FullscreenMode {...state} />}

          {state.isSlideshow && <SlideshowMode {...state} />}

          {state.isBirdsEye && <BirdsEyeMode {...state} />}
        </GlobalContainer>
      </ThemeProvider>
    )
  }
}

const GlobalContainer = styled.div`
  /* Fit the whole browser window */
  width: 100vw;
  height: 100vh;

  /* Setup typography */
  font-family: ${(props) => props.theme.baseFont};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  * {
    box-sizing: border-box;
  }

  color: ${(props) => props.theme.textColor};
`

export default Presentation
