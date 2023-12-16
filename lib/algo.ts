export function numarrayToString(ar: number[]) {
  return ar.map(v => v.toString()).join('')
}

export function numTonumarray(v: number) {
  const ret = []
  while(v > 0) {
    ret.push(v % 10)
    v = Math.floor(v / 10)
  }
  while(ret.length < 3) ret.push(0)
  return ret.reverse()
}

export function numarrayTonum(ar: number[]) {
  let ret = 0, b = 1
  for(let i = ar.length - 1; i >= 0; --i) {
    ret += ar[i] * b
    b *= 10
  }
  return ret
}

const phase = [-1, -0.8, -0.6, -0.4, -0.2, 0, 0.3, 0.5, 0.7, 1]
export function floor_sin(s: number, x: number) {  // s -> [starting number]
  return Math.floor(5 * Math.sin(x * 2 * Math.PI + phase[s]) + 5)
}

export const time_sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
