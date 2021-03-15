import ControlGroup from './control-group'
import ControlButton from './control-button'
import { Fullscreen as FullscreenIcon } from '../../assets/icons'
import { Stylable } from '../../global-types'

const FullscreenToggle = ({
  className,
  onClick,
}: { onClick: () => void } & Stylable) => (
  <ControlGroup className={className}>
    <ControlButton onClick={onClick}>
      <FullscreenIcon />
    </ControlButton>
  </ControlGroup>
)

export default FullscreenToggle
