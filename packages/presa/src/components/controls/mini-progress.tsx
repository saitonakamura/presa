import { Component } from 'react'

import styled from 'styled-components'

type Props = {
  current: number
  total: number
  height: number
  width: number
}

class MiniProgress extends Component<Props> {
  static defaultProps = {
    height: 4,
    width: 40,
  }

  render() {
    const { total, current, width, height } = this.props
    const percentage = total ? (current + 1) / total : 0.0

    return (
      <ProgressBox width={width} height={height}>
        <Progress style={{ width: `${percentage * 100.0}%` }} radius={height} />
      </ProgressBox>
    )
  }
}

const progressBackground = '#dddddd'

const ProgressBox = styled.div<{ height: number; width: number }>`
  height: ${(props) => props.height}px;
  border-radius: ${(props) => props.height}px;
  width: ${(props) => props.width}px;

  background: ${progressBackground};
  position: relative;
  overflow: hidden;
`

const Progress = styled.div<{ radius: number }>`
  position: absolute;
  height: 100%;
  width: 0;
  left: 0;

  background: ${(props) => props.theme.primaryColor};
  border-radius: ${(props) => props.radius}px;
`

export default MiniProgress
