import 'styled-components'

declare module 'styled-components' {
  export interface SlideTheme {
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
    slide: SlideTheme

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

  export interface DefaultTheme extends Theme {}
}
