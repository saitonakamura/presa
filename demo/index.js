import React from 'react'
import ReactDOM from 'react-dom'
import styled, { injectGlobal } from 'styled-components'
import CodeSurfer from 'code-surfer'

import { Presentation, Slide } from '../src'
import { H1, H3, Code } from '../src/blocks'
import VideoBackground from '../src/blocks/video-background'

import { Presa } from '../src/assets/icons'
import SidebarLayout from './components/sidebar-layout'
import GithubButton from './components/github-button'
import RegularFragment, { ControlledFragment } from '../src/components/fragment'

import IntroSlide from './slides/intro'

const baseTextColor = '#444'
const primaryColor = '#3c59ff'

const Hideable = props => {
  return props.active ? props.children(props.index) : null
}
const Fragment = props => <RegularFragment {...props} behaviour={Hideable} />

const code = `const looper = fn => {
      let cb = (time) => {
        requestAnimationFrame(cb)
        let diff = ~~(time - (cb.time || 0)),
          seconds_passed = diff/1000
        fn(seconds_passed)
        cb.time = time
      }
      return cb
    }
     const looper = fn => {
      let cb = (time) => {
        requestAnimationFrame(cb)
        let diff = ~~(time - (cb.time || 0)),
          seconds_passed = diff/1000
        fn(seconds_passed)
        cb.time = time
      }
      return cb
    }
     `

const CustomCode = props => {
  const { lines = [] } = props
  const step = lines.length ? { lines } : {}

  return (
    <CodeWrapper>
      <CodeSurfer lang="javascript" showNumbers code={code} step={step} />
    </CodeWrapper>
  )
}

const PitchDeck = () => (
  <Presentation
    name="Presa pitch deck"
    tableOfContents
    useFullscreenAPI
    theme={{ textColor: baseTextColor }}
  >
    <IntroSlide />

    <Slide name="Durex heart" layout={ImageLayout}>
      <ImageBackground backgroundColor="black">
        <img src={require('./images/gifs/heart.gif')} alt="heart" />
      </ImageBackground>
    </Slide>

    <Slide
      name="What is Presa?"
      layout={children => (
        <SidebarLayout
          src={require('./images/conference.jpg')}
          proportion="6/9"
          children={children}
        />
      )}
    >
      <PresaTitle>Presa</PresaTitle>
      <PresaSlogan>
        Create slides in <b>React</b>, present with joy! <br />
        Built with styled-components 💅
      </PresaSlogan>

      <p>
        Presa is lightweight, declarative and modular. Each slide is a React
        component: only rendered when visible.
      </p>

      <StarOnGithub>
        <GithubButton repo="presa" user="molefrog" />
      </StarOnGithub>

      <Footnote>
        —<br />
        Press the ➡️ button on your keyboard to go to the next slide or use
        controls below.
      </Footnote>
    </Slide>
    <Slide name="Fragment demo">
      <Fragment index={0}>{index => `text ${index}`}</Fragment>
      <Fragment index={1}>{index => `text ${index}`}</Fragment>
      <Fragment index={2}>{index => `text ${index}`}</Fragment>
    </Slide>
    <Slide name="Controlled fragment demo">
      <ControlledFragment numberOfSteps={5}>
        {currentIndex => {
          const lineMap = {
            0: [1, 2],
            1: [3, 4],
            2: [5, 6],
            3: [6],
            4: [14, 15, 16, 17, 18, 19, 20]
          }

          return (
            <CodeSlide>
              <H3> Example how to loop by RAF</H3>

              <CustomCode lines={lineMap[currentIndex]} />

              <p>
                Presa is lightweight, declarative and modular. Each slide is a
                React component: only rendered when visible.
              </p>
            </CodeSlide>
          )
        }}
      </ControlledFragment>
    </Slide>

    <Slide name="Native code from presa">
      <Code>{`
      ${code}
      const redraw = _ => {
  points.forEach(point => {

    // make sure \\\`will-change: transform\\\` is set
    point.element.style.transform = \\\`
      translate3d($\\{point.x}px, $\\{point.y}px, 0.0px)
      rotate($\\{point.angle}rad)\\\`
  })
}

const tick = ts => {
  _lastRaf = requestAnimationFrame(tick)

  physicsStep(delta)
  redraw(delta)
}\`
      `}</Code>
    </Slide>
    <Slide name="Installing Presa" fade={0.2} centered>
      <Numbered number={1}>
        <H1>Quick Start</H1>
        <H3>creating your first presentation in 10 seconds</H3>

        <Description>
          Install Presa in your project by running{' '}
          <InlineCode>yarn add presa</InlineCode> command.
          <br /> You'll need to install <InlineCode>react</InlineCode> and{' '}
          <InlineCode>styled-components</InlineCode> as well.
        </Description>
      </Numbered>
    </Slide>

    <Slide name="Getting started: code" centered>
      <Code>{`import { Presentation, Slide } from 'presa'

const App = () =>
  <Presentation name="Lightning talk">
    <Slide name="Introduction">
      Hello, everyone!
    </Slide>

    {/* Add your own slides here */}
  </Presentation>

// Make sure you render into a full-page container
ReactDOM.render(<App />, container)`}</Code>
    </Slide>

    <Slide
      name="Slide Backgrounds"
      background={require('./images/camera.jpg')}
      fade={0.2}
      centered
    >
      <Numbered inverse number={2}>
        <H1>Slide Backgrounds</H1>
        <H3>
          Presa supports images, colors and custom elements <br />
          as slide backgrounds
        </H3>
      </Numbered>
    </Slide>

    <Slide name="Slide backgrounds: code" centered>
      <Code>{`// Use an image
<Slide background="hello.jpg" />

// Add an overlay
<Slide background="hello.jpg" fade={0.5} />

// Or custom CSS prop
<Slide background=
  "linear-gradient(to right, #da4453, #89216b)" />`}</Code>
    </Slide>

    <Slide
      name="Video backgrounds"
      background={
        <VideoBackground
          mute
          src="https://www.youtube.com/watch?v=6qGiXY1SB68"
        />
      }
      fade={0.2}
      centered
    >
      <Numbered inverse number={3}>
        <H1>Video Backgrounds</H1>
        <H3>made with custom background elements</H3>
      </Numbered>
    </Slide>

    <Slide name="Video backgrounds: code" centered>
      <Code>{`// blocks are optional elements
import { VideoBackground } from 'presa/blocks'

// \`background\` accepts any valid React element —
// allows to use custom backgrounds.
<Slide background={
  <VideoBackground src="..." />
} />

// (you can pass YouTube link or link to a local file)`}</Code>
    </Slide>

    <Slide
      name="Blocks"
      fade={0.3}
      layout={children => (
        <SidebarLayout
          src={require('./images/stairs.jpg')}
          proportion="2/3"
          children={children}
        />
      )}
    >
      <Numbered number={4}>
        <H1>Including Blocks</H1>
        <H3>Reusable components for your slides</H3>

        <Description>
          Presa ships with additional components that can be used in slides.
          These components are not added by default.
        </Description>

        <Description>
          Currently available blocks: <InlineCode>{'H1'}</InlineCode>,{' '}
          <InlineCode>{'H2'}</InlineCode>, <InlineCode>{'H3'}</InlineCode>,{' '}
          <InlineCode>{'Code'}</InlineCode>
        </Description>
      </Numbered>
    </Slide>

    <Slide name="Code block" centered>
      <Code>{`import { H1, H2, Code } from 'presa/blocks'

<Slide>
  <H1>JavaScript</H1>
  <H2 color="pink">A beginner's guide</H2>

  <Code language="ruby">
    {\'Object.new.tap(&:inspect);\'}
  </Code>
</Slide>
        `}</Code>
    </Slide>

    <Slide name="Support us!" centered>
      <Presa />
      <H3>Check out more</H3>
      <p>Let us know if you want to use Presa for your talk!</p>
      <a href="https://github.com/molefrog/presa">
        https://github.com/molefrog/presa
      </a>
    </Slide>
  </Presentation>
)

const NumberedNumber = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 6px;
  font-size: 26px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;

  color: ${props => props.color};
  border: 3px solid ${props => props.color};
  text-shadow: none;
`

const NumberedCont = styled.div`
  display: flex;
  flex-flow: column;
  align-items: ${props => (props.centered ? 'center' : 'flex-start')};
  text-align: ${props => (props.centered ? 'center' : 'left')};

  padding-bottom: 100px;

  ${props =>
    props.inverse &&
    `
    color: white;
    text-shadow: 1px 2px rgba(0,0,0,0.6);`};
`

const Numbered = props => (
  <NumberedCont centered={props.centered} inverse={props.inverse}>
    <NumberedNumber color={props.inverse ? 'white' : primaryColor}>
      {props.number}
    </NumberedNumber>
    {props.children}
  </NumberedCont>
)

const Footnote = styled.div`
  color: #999;
  font-size: 18px;
`

const PresaTitle = styled(H1)`
  color: ${primaryColor};
`

const PresaSlogan = styled(H3)`
  color: #444;
  margin-bottom: 40px;
`

const StarOnGithub = styled.div`
  margin-top: 20px;
  margin-bottom: 90px;
`

const CodeSlide = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const CodeWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin: 40px 0 20px 0;
`

const Description = styled.p`
  margin: 40px 0;
  text-align: left;
  line-height: 1.5;
`

const InlineCode = styled.code`
  letter-spacing: -0.5px;
  background: rgba(60, 89, 255, 0.07);
  color: ${primaryColor};
  padding: 3px 8px;
  border-radius: 3px;
`

const PresaIcon = styled(Presa)`
  display: inline-block;
  margin-right: 14px;
  width: 40px;
  height: 40px;
`

const ImageLayout = children => <ImageCentred>{children}</ImageCentred>

const ImageCentred = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`

const ImageBackground = styled(ImageCentred)`
  background-color: ${props => props.backgroundColor};
`
// to prevent additional scrollbars
injectGlobal`
  body {
    margin: 0;
    padding: 0;
  }
`

const rerenderApp = () => {
  const container = document.getElementById('container')

  // clean up and render
  ReactDOM.unmountComponentAtNode(container)
  ReactDOM.render(<PitchDeck />, container)
}

if (module.hot) {
  module.hot.accept(rerenderApp)
}

document.addEventListener('DOMContentLoaded', () => {
  rerenderApp()
})
