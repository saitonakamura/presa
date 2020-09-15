import React, { Component } from 'react'

import Manager from './manager'
import styled from 'styled-components'
import FragmentManager from './manager'
import { NO_FRAGMENTS } from './constants'

const OpacityBehaviour = styled.div<{ inline?: boolean; active?: boolean }>`
  transition: opacity 0.2s ease-in;
  display: ${(props) => (props.inline ? 'inline-block' : 'block')};
  opacity: ${(props) => (props.active ? 1 : 0)};
`

const clamp = (index: number, min: number, max: number) => {
  return Math.min(Math.max(index, min), max)
}

type ControlledFragmentProps = {
  behaviour?: any
  numberOfSteps: number
  manager: FragmentManager
  children: (index: number) => React.ReactElement<any, any>
}

class ControlledFragment extends Component<ControlledFragmentProps> {
  static defaultProps = {
    behaviour: OpacityBehaviour,
  }

  _unregister: any

  constructor(props: ControlledFragmentProps) {
    super(props)
    this._unregister = props.manager.registerControlledFragment(
      Array(props.numberOfSteps).fill('')
    )
  }

  componentWillUnmount() {
    this._unregister()
  }

  render() {
    const { manager } = this.props

    return this.props.children(
      clamp(manager.state.index, NO_FRAGMENTS, this.props.numberOfSteps - 1)
    )
  }
}

const ControlledFragmentConnected = (
  props: Omit<ControlledFragmentProps, 'manager'>
) => (
  <Manager.Consumer>
    {(args: any) => <ControlledFragment {...props} manager={args.manager} />}
  </Manager.Consumer>
)

export default ControlledFragmentConnected
