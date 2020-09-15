import React, { Component } from 'react'

import Manager from './manager'
import styled from 'styled-components'

const OpacityBehaviour = styled.div`
  transition: opacity 0.2s ease-in;
  display: ${(props) =>
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'inline' does not exist on type 'ThemedSt... Remove this comment to see the full error message
    props.inline
      ? 'inline-block'
      : 'block'};
  opacity: ${(props) =>
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'active' does not exist on type 'ThemedSt... Remove this comment to see the full error message
    props.active
      ? 1
      : 0};
`

type OwnFragmentProps = {
  behaviour?: any
  index?: number
  manager: any
}

type FragmentProps = OwnFragmentProps & typeof Fragment.defaultProps

class Fragment extends Component<FragmentProps> {
  static defaultProps = {
    behaviour: OpacityBehaviour,
  }

  _instance: any

  constructor(props: FragmentProps) {
    super(props)
    this._instance = props.manager.registerFragment({ index: props.index })
  }

  componentWillUnmount() {
    this._instance.unregister()
  }

  render() {
    const { manager, behaviour, ...restProps } = this.props
    const Behaviour = behaviour

    const isActive = manager.isIndexActive(this._instance.index)
    return <Behaviour {...restProps} active={isActive} />
  }
}

const FragmentConnected = (props: any) => (
  <Manager.Consumer>
    {(args: any) => <Fragment {...props} manager={args.manager} />}
  </Manager.Consumer>
)

export default FragmentConnected
