import styled, { DefaultTheme } from 'styled-components'

// Don't style anything after h3
const maxHeading = 3

const calcFontSize = (props: { theme: DefaultTheme; level?: number }) => {
  const scale = props.theme.slide.fontScale || 1.0
  const level = props.level || 0

  // [0..maxHeading]
  const pow = Math.min(Math.max(0, maxHeading - level + 1), maxHeading)

  const size = Math.pow(scale, pow)
  return `${size}em`
}

export const Header = styled.h1<{ weight?: React.CSSProperties['fontWeight'] }>`
  font-size: ${calcFontSize};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
  line-height: 1.2;
  margin: 0.2em 0;
`

export const makeHeader = (
  tag: keyof JSX.IntrinsicElements | React.ComponentType<any>,
  level?: number,
  weight?: React.CSSProperties['fontWeight']
) => styled(Header.withComponent(tag)).attrs({ level, weight })``

// Header components
export const H1 = makeHeader('h1', 1, 'bold')
export const H2 = makeHeader('h2', 2, 'normal')
export const H3 = makeHeader('h3', 3, 'normal')
export const H4 = makeHeader('h4', 4, 'normal')

// Friendly aliases
export const Title = H1
export const Subtitle = H2
export const Caption = H3
