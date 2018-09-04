export const formatJsonData = (firstArr, secArr) => {
  let data = []
  for (let item of secArr) {
    firstArr.forEach(
      elem => elem.id === item.id && data.push({ ...elem, ...item })
    )
  }

  return data
}

export const addAttribute = (item, arr) => {
  const newArr = arr.map(elem => {
    if (elem.id === item.id) {
      const attributes = elem.attributes.concat(item.attribute)
      return Object.assign({}, elem, { attributes })
    } else return elem
  })

  return newArr
}
