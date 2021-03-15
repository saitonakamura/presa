import { Component } from 'react'
import * as React from 'react'

import Manager, { RegisteredFragment } from './manager'
import styled from 'styled-components'

const OpacityBehaviour = styled.div<{ inline?: boolean; active?: boolean }>`
  transition: opacity 0.2s ease-in;
  display: ${(props) => (props.inline ? 'inline-block' : 'block')};
  opacity: ${(props) => (props.active ? 1 : 0)};
`

type OwnFragmentProps = {
  behaviour: React.ElementType<
    { inline?: boolean; active?: boolean } & Record<string, unknown>
  >
  index?: number
  manager: Manager | null
}

class Fragment_ extends Component<OwnFragmentProps> {
  _instance?: RegisteredFragment

  constructor(props: OwnFragmentProps) {
    super(props)
    this._instance = props.manager?.registerFragment({ index: props.index })
  }

  componentWillUnmount() {
    this._instance?.unregister()
  }

  render() {
    const { manager, behaviour, ...restProps } = this.props
    const Behaviour = behaviour

    const isActive = manager?.isIndexActive(this._instance?.index ?? -1)
    return <Behaviour {...restProps} active={isActive} />
  }
}

export type FragmentProps = Omit<OwnFragmentProps, 'manager' | 'behaviour'> &
  Partial<Pick<OwnFragmentProps, 'behaviour'>> & {
    children: React.ReactNode | ((index: number) => React.ReactNode)
  }

export const Fragment = (props: FragmentProps) => (
  <Manager.Consumer>
    {(args) => (
      <Fragment_
        {...props}
        manager={args.manager}
        behaviour={props.behaviour ?? OpacityBehaviour}
      />
    )}
  </Manager.Consumer>
)
