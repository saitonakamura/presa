export default () => (
  <Slide name="requestAnimationFrame game loop" centered>
    <Code fontSize={20}>{`const redraw = _ => {
  points.forEach(point => {

    // make sure \`will-change: transform\` is set
    point.element.style.transform = \`
      translate3d($\{point.x}px, $\{point.y}px, 0.0px)
      rotate($\{point.angle}rad)\`
  })
}

const tick = ts => {
  _lastRaf = requestAnimationFrame(tick)

  physicsStep(delta)
  redraw(delta)
}`}</Code>
  </Slide>
)
