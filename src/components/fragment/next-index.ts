/*
 * This function is used in order to calculate the index
 * of the next fragment.
 *  `variants` — a list of indexes, e.g. [1, 0, 10]
 *  `current` — current index, may not be present in the list.
 *  `shift` — how many indexes to skip, use negative to move
 *   backwards.
 *
 * Returns `null` if the index is out of bounds.
 */
const nextIndex = (variants: any, current: any, shift = 1) => {
  // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'a' implicitly has an 'any' type.
  const sorted = unique(variants).sort((a, b) => a - b)
  const closest = closestIndex(sorted, current, shift > 0)

  if (closest === null) {
    return null
  }

  return elementAt(sorted, closest + shift)
}

const closestIndex = (sortedList: any, elem: any, right = true) => {
  const predicate = (x: any) => (right ? x >= elem : elem >= x)
  const sliced = sortedList.filter(predicate)

  if (!sliced.length) {
    return null
  }

  const closestElement = right ? sliced[0] : sliced[sliced.length - 1]
  return sortedList.indexOf(closestElement)
}

const elementAt = (array: any, index: any) => {
  if (index < 0 || index >= array.length) return null
  return array[index]
}

// returns a list of unique elements of the array
const unique = (list: any) => {
  let result: any = []
  list.forEach((x: any) => result.indexOf(x) === -1 && result.push(x))
  return result
}

export default nextIndex
