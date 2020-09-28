import React from 'react'
import PropTypes from 'prop-types'

// Provides an adapter for presentation remotes.
//
// Technically, remotes are very small keyboards with a  limited
// number of keys. The forward and backward buttons simply send the same
// key codes as the cursor keys on a regular keyboard.

// The button to blank the screen simply sends the letter 'B' (and if
// you didn't know this, try hitting the 'B' key on your keyboard in your
// presentation software).
// (https://www.themobilepresenter.com/article.php/how-does-a-remote-work)

const k = {
  KEY_LEFT: 37,
  KEY_RIGHT: 39,
  KEY_DOWN: 40,
  KEY_UP: 38,
  KEY_SPACE: 32,

  // some clickers supports it
  // for example, Logitech
  KEY_PAGE_UP: 33,
  KEY_PAGE_DOWN: 34,

  // Blank screen
  KEY_B: 66,
}

class RemoteControl extends React.Component {
  static propTypes = {
    onNext: PropTypes.func.isRequired,
    onPrev: PropTypes.func.isRequired,
    onMute: PropTypes.func.isRequired,
  }

  handleKeyDown = (e: any) => {
    // Go to the next slide: right,
    // down arrow or space
    if (
      e.keyCode === k.KEY_RIGHT ||
      e.keyCode === k.KEY_DOWN ||
      e.keyCode === k.KEY_SPACE ||
      e.keyCode === k.KEY_PAGE_DOWN
    ) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'onNext' does not exist on type 'Readonly... Remove this comment to see the full error message
      return this.props.onNext()
    }

    // Go to previous slide
    if (
      e.keyCode === k.KEY_LEFT ||
      e.keyCode === k.KEY_UP ||
      e.keyCode === k.KEY_PAGE_UP
    ) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'onPrev' does not exist on type 'Readonly... Remove this comment to see the full error message
      return this.props.onPrev()
    }

    if (e.keyCode === k.KEY_B) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'onMute' does not exist on type 'Readonly... Remove this comment to see the full error message
      return this.props.onMute()
    }
  }

  componentDidMount() {
    document.body.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.body.removeEventListener('keydown', this.handleKeyDown)
  }

  render() {
    return null
  }
}

export default RemoteControl
