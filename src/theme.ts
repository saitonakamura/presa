import { SlideTheme, DefaultTheme } from 'styled-components'

const baseFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, ' +
  'Ubuntu, Cantarell, "Helvetica Neue", sans-serif'

const textColor = '#222222'

export const defaultSlideTheme: SlideTheme = {
  baseFontSize: 22,
  fontScale: 1.333,
  background: '#ffffff',
  layoutPadding: '2.5em 5em',
  baseFont,
  textColor,
}

const theme: DefaultTheme = {
  slide: defaultSlideTheme,
  baseFont,
  monoFont:
    '"SF Mono", "Monaco", "Inconsolata", "Fira Mono", "Droid Sans Mono", ' +
    '"Source Code Pro", monospace',
  backgroundColor: '#fafafa',
  fullscreenBackgroundColor: '#000000',
  primaryColor: '#3c59ff',
  textColor,
  darkGrayColor: '#5a5a5a',
  mutedTextColor: '#9E9E9E',
  placeholderColor: '#f1f1f1',
}

export default theme
