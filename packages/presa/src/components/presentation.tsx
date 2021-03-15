import { Children, Component } from 'react'
import { Theme } from '../theme'

import PresentationContainer, { SlideData } from './presentation-container'
import Slide from './slide/slide-decl'

type Props = {
  name?: string
  aspectRatio?: number
  baseWidth?: number
  theme?: Partial<Theme>
  tableOfContents?: boolean
  useFullscreenAPI?: boolean
}

class Presentation extends Component<Props> {
  getSlideStructure(): SlideData[] {
    const { children } = this.props

    if (!children) {
      return []
    }

    // @ts-expect-error
    return Children.map(children, (el) => el)
      .filter(
        (element): element is Slide =>
          typeof element === 'object' && !!element && 'props' in element
      )
      .map((slideElement) => ({
        name: slideElement.props.name,
        description: slideElement.props.description,
        element: slideElement,
      }))
  }

  render() {
    // We assume that slides don't change over
    // application lifetime. Normally this render
    // method will only be called once.
    const slides = this.getSlideStructure()

    // All futher logic runs inside `PresentationContainer`
    return <PresentationContainer {...this.props} slides={slides} />
  }
}

export default Presentation
