import { FC } from 'react'
import * as React from 'react'
import styled, { useTheme } from 'styled-components'
import { Stylable } from '../global-types'

export type Language = 'javascript' | 'typescript' | 'reason'

export type CodeProps = {
  language: Language
  fontSize?: React.CSSProperties['fontSize']
  children?: string
} & Stylable

const warning =
  'The `Code` component relies on `react-syntax-highlighter` ' +
  'package. Please install it via the package manager.'

// Use warning as a fallback
let Code: FC<CodeProps> = () => React.createElement('code', null, warning)

try {
  const Highlight = require('react-syntax-highlighter').Prism
  const defaultColorScheme = require('react-syntax-highlighter/dist/esm/styles/prism')
    .prism

  const defaultLineHeight = 1.4

  // Override additional styles without
  // touching the theme object.
  const StyledHighlight = styled(Highlight)`
    font-size: ${(props) => props.fontSize}px;
    line-height: ${defaultLineHeight};
    text-align: left;

    &,
    code,
    pre {
      font-family: ${(props) => props.theme.monoFont};
    }
  `

  Code = ({
    language = 'javascript',
    fontSize,
    children,
    className,
  }: CodeProps) => {
    const theme = useTheme()

    function getSyntaxTheme() {
      // const overridenTheme = theme.syntaxHighlight

      // Allow to override syntax highlighting theme
      // using global styled-components theme settings.
      // if (overridenTheme) {
      //   return overridenTheme
      // }

      return defaultColorScheme
    }

    const code = children

    // Use given font size or fall back to theme defaults
    fontSize = fontSize || theme.slide.baseFontSize

    return (
      <StyledHighlight
        style={getSyntaxTheme()}
        language={language}
        fontSize={fontSize}
        className={className}
      >
        {code}
      </StyledHighlight>
    )
  }
} catch (_) {
  // show additional warning in the console
  console.warn(warning)
}

export default Code
