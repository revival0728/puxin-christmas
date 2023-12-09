function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

// return -> winner: number, remove all [ winner ] in data
export function getWinner(data: Array<number>) {
  const winnerId = getRandomIntInclusive(0, data.length - 1)
  const winner = data[winnerId]
  const remove_all = (v: number) => {
    const idL = data.indexOf(v)
    const idR = data.lastIndexOf(v)
    data.splice(idL, idR - idL + 1)
  }
  remove_all(winner)
  return winner
}
