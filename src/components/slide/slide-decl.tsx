import React, { Component } from 'react'

import styled from 'styled-components'

import { backgroundFor, BackgroundForProps } from './background'
import { DefaultLayout, CenteredLayout } from './layouts'
import FragmentManager from '../fragment/manager'

export type SlideProps = {
  name?: string
  description?: string
  onBackgroundChange?: (...args: any[]) => any
  centered?: boolean
  className?: string
  initialFragmentIndex?: number
  setFragmentManager?: (...args: any[]) => any
  layout?: 'default' | 'centered' | boolean | React.ComponentType<any>
  children?: React.ReactNode
} & BackgroundForProps

class Slide extends Component<SlideProps> {
  static defaultProps = {
    centered: false,
    layout: 'default',
  }

  componentWillMount() {
    const bgChanged = this.props.onBackgroundChange

    const backgroundEl = backgroundFor(this.props)
    bgChanged && bgChanged(backgroundEl)
  }

  getLayoutComponent(handle: any) {
    switch (handle) {
      case 'default':
        return DefaultLayout
      case 'centered':
        return CenteredLayout
    }

    // use no layout
    return null
  }

  renderWithinLayout(children?: React.ReactNode) {
    let layout = this.props.layout
    const { centered } = this.props

    if (centered) layout = 'centered'
    const Layout = this.getLayoutComponent(layout)

    if (Layout) {
      return <Layout>{children}</Layout>
    } else if (layout) {
      const Layout = layout
      // @ts-ignore
      return <Layout>{children}</Layout>
    } else {
      return children
    }
  }

  render() {
    const { className, centered } = this.props

    return (
      <SlideContent className={className} centered={centered}>
        <FragmentManager
          ref={this.props.setFragmentManager}
          initialIndex={this.props.initialFragmentIndex}
        >
          {this.renderWithinLayout(this.props.children)}
        </FragmentManager>
      </SlideContent>
    )
  }
}

const SlideContent = styled.div<{ centered?: boolean }>`
  width: 100%;
  height: 100%;

  font-family: ${(props) => props.theme.slide.baseFont};
  font-size: ${(props) => props.theme.slide.baseFontSize}px;
  color: ${(props) => props.theme.slide.textColor};

  ${(props) =>
    props.centered &&
    `
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
  `};
`

export default Slide
