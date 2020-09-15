import React, { FC } from 'react'
import { ThemeProvider, DefaultTheme, SlideTheme } from 'styled-components'
import { defaultSlideTheme } from '../../theme'

// SlideTheme provides computed theme defaults
// to child components on a slide.
const themeTransformer = (theme: DefaultTheme): DefaultTheme => {
  let slideTheme = {} as SlideTheme
  const inheritedKeys = ['baseFont', 'monoFont', 'textColor']

  // @ts-expect-error ts-migrate(7053) FIXME: No index signature with a parameter of type 'strin... Remove this comment to see the full error message
  inheritedKeys.forEach((key) => (slideTheme[key] = theme[key]))
  Object.assign(slideTheme, defaultSlideTheme, theme.slide)

  return {
    ...theme,
    slide: slideTheme,
  }
}

const SlideTheme: FC = (props) => (
  <ThemeProvider theme={themeTransformer} {...props} />
)

export default SlideTheme
