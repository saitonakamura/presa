import Presentation from './components/presentation'
import {
  SlideDecl as Slide,
  PlainLayout,
  CenteredLayout,
} from './components/slide'
import { SlideProps } from './components/slide/slide-decl'
import BuiltWithPresa from './components/built-with'
import {
  Fragment,
  ControlledFragment,
  useFragments,
  FragmentProps,
} from './components/fragment'
import { ALL_FRAGMENTS, NO_FRAGMENTS } from './components/fragment/constants'

// Export base presentation components
export {
  Slide,
  SlideProps,
  Presentation,
  BuiltWithPresa,
  Fragment,
  ControlledFragment,
  ALL_FRAGMENTS,
  NO_FRAGMENTS,
  useFragments,
  FragmentProps,
  PlainLayout,
  CenteredLayout,
}

export * from './components/slide/background'
export * from './assets/icons'
export { Theme, SlideThemeType } from './theme'
