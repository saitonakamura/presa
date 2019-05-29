import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Manager from './manager'
import styled from 'styled-components'

const OpacityBehaviour = styled.div`
  transition: opacity 0.2s ease-in;
  display: ${props => (props.inline ? 'inline-block' : 'block')};
  opacity: ${props => (props.active ? 1 : 0)};
`

const clamp = (index, min, max) => {
  return Math.min(Math.max(index, min), max)
}

class ControlledFragment extends Component {
  static propTypes = {
    behaviour: PropTypes.any,
    numberOfSteps: PropTypes.number,
    manager: PropTypes.object.isRequired
  }

  static defaultProps = {
    behaviour: OpacityBehaviour
  }

  constructor(props) {
    super(props)
    this._instance = props.manager.registerControlledFragment(
      Array(props.numberOfSteps).fill('')
    )
  }

  componentWillUnmount() {
    this._instance.unregister()
  }

  render() {
    const { manager } = this.props

    return this.props.children(
      clamp(manager.state.index, -Infinity, this.props.numberOfSteps - 1)
    )
  }
}

const ControlledFragmentConnected = props => (
  <Manager.Consumer>
    {args => <ControlledFragment {...props} manager={args.manager} />}
  </Manager.Consumer>
)

export default ControlledFragmentConnected
