import { Component } from 'react'
import styled from 'styled-components'
import getYouTubeId from 'get-youtube-id'

import { BaseBackground as BaseBg } from '@saitonakamura/presa'

// Serializes a hash of settings into YouTube query
// compatible format.
// { foo: true } => foo=1
const makeQuery = (options = {}) => {
  return Object.entries(options)
    .map((pair) => {
      let [k, v] = pair
      if (typeof v === 'boolean') v = Number(v)

      return `${k}=${v}`
    })
    .join('&')
}

type OwnVideoBackgroundProps = {
  className?: string
  src: string
  autoPlay?: boolean
  controls?: boolean
  loop?: boolean
  mute?: boolean
}

type VideoBackgroundProps = OwnVideoBackgroundProps &
  typeof VideoBackground.defaultProps

export class VideoBackground extends Component<VideoBackgroundProps> {
  static defaultProps = {
    autoPlay: true,
    controls: false,
    loop: true,
    mute: false,
  }

  renderYouTube(videoId: any) {
    const baseUrl = '//www.youtube.com/embed/'
    const { controls, loop, autoPlay, mute, className } = this.props

    const query = makeQuery({
      autoplay: autoPlay,
      showinfo: false,
      controls,
      loop,
      mute,
    })

    const videoSrc = `${baseUrl}${videoId}?${query}`

    return <IFrame src={videoSrc} className={className} />
  }

  render() {
    // try to extract youtube id first
    const ytVideo = getYouTubeId(this.props.src, { fuzzy: false })

    if (ytVideo) {
      return this.renderYouTube(ytVideo)
    }

    return <Video {...this.props} />
  }
}

const IFrame = styled(BaseBg.withComponent('iframe'))`
  border: none;

  // when video is being loaded
  background: black;
`

const Video = BaseBg.withComponent('video')
