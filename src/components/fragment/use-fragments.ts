import { useContext, useEffect } from 'react'
import { FragmentContext } from './manager'

export const useFragments = (stepsCount: number) => {
  const FragmentManager = useContext(FragmentContext).manager!

  useEffect(() => {
    FragmentManager.registerControlledFragment(new Array(stepsCount).fill(null))
  }, [])

  const index = FragmentManager.state.index
  const forward = () => FragmentManager.navigate(1)
  const backward = () => FragmentManager.navigate(-1)

  return [index, forward, backward]
}
