import React from 'react'

import ControlGroup from './control-group'
import ControlButton from './control-button'
import { Navigation as TocIcon } from '../../assets/icons'

type Props = {
  toggled: boolean
  onClick: () => void
} & Stylable

const FullscreenToggle = ({ toggled, className, onClick }: Props) => (
  <ControlGroup className={className}>
    <ControlButton onClick={onClick} toggled={toggled}>
      <TocIcon />
    </ControlButton>
  </ControlGroup>
)

export default FullscreenToggle
