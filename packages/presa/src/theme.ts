const baseFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, ' +
  'Ubuntu, Cantarell, "Helvetica Neue", sans-serif'

const textColor = '#222222'

export interface SlideThemeType {
  baseFont: string
  baseFontSize: number
  fontScale: number
  background: string
  layoutPadding: string
  textColor: string
}

export interface Theme {
  /**
   * Settings related to slide content appearance
   * Can be overwritten
   */
  slide: SlideThemeType

  /** Using web-safe font defaults: base serif font and monospace */
  baseFont: string

  monoFont: string

  /** Color palette
   * Slideshow background
   */
  backgroundColor: string

  fullscreenBackgroundColor: string

  /** Used as an accent color in
   * active elements
   */
  primaryColor: string

  /** Default text color */
  textColor: string

  /** Icon background */
  darkGrayColor: string

  /** default: Stardust gray */
  mutedTextColor: string

  placeholderColor: string
}

export const defaultSlideTheme: SlideThemeType = {
  baseFontSize: 22,
  fontScale: 1.333,
  background: '#ffffff',
  layoutPadding: '2.5em 5em',
  baseFont,
  textColor,
}

const theme: Theme = {
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
