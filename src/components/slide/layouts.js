import React from 'react'
import styled from 'styled-components'

// Base layout component —
// fits an entire viewport
const PlainLayout = styled.div`
  width: 100%;
  height: 100%;
`

const DefaultLayout = styled(PlainLayout)`
  padding: ${(props) => props.theme.slide.layoutPadding};
`

// A slide layout centered both
// vertically and horizontally
const CenteredLayout = styled(DefaultLayout)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`

export { PlainLayout, DefaultLayout, CenteredLayout }
