export const parseSortString = (sortString) => {
  if (!sortString) {
    return ['', '']
  } else {
    return sortString.split('.')
  }
}

export const makeSortString = (currentSortString, sortBy) => {
  const [currBy, currDir] = parseSortString(currentSortString)
  if (currBy === sortBy) {
    const dir = currDir === 'asc' ? 'desc' : 'asc'
    return `${sortBy}.${dir}`
  } else {
    return `${sortBy}.asc`
  }
}
