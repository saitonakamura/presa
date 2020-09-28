import React from 'react'
import styled from 'styled-components'

import ControlGroup from './control-group'
import ControlButton from './control-button'
import { LeftArrow, RightArrow } from '../../assets/icons'

import MiniProgress from './mini-progress'

type SlideSwitcherProps = {
  slide: Fixme
  slides: Fixme[]
  showNextSlide: () => void
  showPrevSlide: () => void
  toggleBirdsEye: () => void
} & Stylable

class SlideSwitcher extends React.Component<SlideSwitcherProps> {
  render() {
    const {
      className,
      slide,
      slides,
      showNextSlide,
      showPrevSlide,
      toggleBirdsEye,
    } = this.props

    return (
      <ControlGroup className={className}>
        <ControlButton
          onClick={() => showPrevSlide()}
          disabled={slide.isFirst}
          activeIconTransform="translateX(-1px)"
        >
          <LeftArrow />
        </ControlButton>

        <CurrentSlide
          onClick={() => toggleBirdsEye()}
          current={slide.index}
          total={slides.length}
        />

        <ControlButton
          onClick={() => showNextSlide()}
          disabled={slide.isLast}
          activeIconTransform="translateX(1px)"
        >
          <RightArrow />
        </ControlButton>
      </ControlGroup>
    )
  }
}

type CurrentSlideProps = {
  current: number
  total: number
  onClick: () => void
}

const CurrentSlide = ({ current, total, onClick }: CurrentSlideProps) => (
  <NavigationOuter onClick={onClick}>
    <Navigation>
      {current + 1}

      <TotalLabel>/{total}</TotalLabel>
    </Navigation>

    <MiniProgress current={current} total={total} />
  </NavigationOuter>
)

const TotalLabel = styled.span`
  color: ${(props) => props.theme.mutedTextColor};
`

const Navigation = styled.div`
  font-family: ${(props) => props.theme.monoFont};
  color: ${(props) => props.theme.textColor};
  user-select: none;
  font-size: 12px;
  margin-bottom: 4px;
`

const NavigationOuter = styled.div`
  align-self: center;

  padding: 8px 6px;
  margin: 0 2px;
  border-radius: 6px;
  cursor: pointer;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  &:hover {
    background: rgba(0, 0, 0, 0.02);
  }
`

export default SlideSwitcher
