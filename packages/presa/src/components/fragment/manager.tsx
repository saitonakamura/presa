import { createContext, Component } from 'react'

import { ALL_FRAGMENTS, NO_FRAGMENTS } from './constants'
import nextIndex from './next-index'

export const FragmentContext = createContext<{
  manager: FragmentManager | null
}>({ manager: null })

type FragmentItem = {
  id: Symbol
  index: number
  unregister: () => void
}

type OwnProps = {
  initialIndex?: number
  isIndexActive?: (...args: any[]) => any
}

type State = any

type Props = OwnProps & typeof FragmentManager.defaultProps

export type RegisteredFragment = {
  id: Symbol
  index: number
  unregister: () => void
}

class FragmentManager extends Component<Props, State> {
  static Consumer = FragmentContext.Consumer

  // by default all fragments are activated
  static defaultProps = {
    initialIndex: ALL_FRAGMENTS,
    isIndexActive: (fragmentIndex: any, currentActiveIndex: any) =>
      fragmentIndex <= currentActiveIndex,
  }

  _fragments: FragmentItem[]
  _lastAutoIndex: number

  constructor(props: Props) {
    super(props)

    this._lastAutoIndex = -1
    this._fragments = []

    this.state = { index: props.initialIndex }
  }

  navigate(shift = 1) {
    const indexes = this._fragments.map((f: any) => f.index)

    // no fragments found, skip
    if (!indexes.length) {
      return false
    }

    const nextValue = nextIndex(
      [NO_FRAGMENTS, ...indexes],
      this.state.index,
      shift
    )

    // switch to the next fragment in the list
    if (nextValue !== null) {
      this.setState({ index: nextValue })
      return true
    }

    // return false otherwise. a signal that
    // the next slide should be shown instead.
    return false
  }

  isIndexActive(index: number) {
    return this.props.isIndexActive(index, this.state.index)
  }

  registerFragment(options = {}) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'index' does not exist on type '{}'.
    let index = options.index

    if (typeof index === 'undefined') {
      index = ++this._lastAutoIndex
    }

    const fragmentId = Symbol()

    const registered: RegisteredFragment = {
      id: fragmentId,
      index: index,
      unregister: () => this.unregisterFragment(fragmentId),
    }

    this._fragments.push(registered)
    return registered
  }

  registerControlledFragment(steps: Array<{}> = []): () => void {
    steps.forEach((_, index) => this.registerFragment({ index }))
    return () => {
      this._fragments.forEach(({ unregister }) => unregister())
    }
    // const fragmentId = Symbol()
    // const registered = steps.map((_, index) => ({
    //   id: fragmentId,
    //   index: index,
    //   unregister: () => this.unregisterFragment(fragmentId),
    // }))

    // Array.prototype.splice.apply(this._fragments, [0, 0, ...registered])

    // return registered[0]
  }

  unregisterFragment(id: any) {
    // remove the fragment reference from the list
    this._fragments = this._fragments.filter((f: any) => f.id !== id)
  }

  render() {
    return (
      <FragmentContext.Provider value={{ manager: this }}>
        {this.props.children}
      </FragmentContext.Provider>
    )
  }
}

export default FragmentManager
