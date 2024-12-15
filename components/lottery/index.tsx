"use client"

import { useState, useEffect } from 'react'
import { getWinner, getRandomIntInclusive } from '@/lib/random'
import { numTonumarray, numarrayToString, floor_sin, time_sleep } from '@/lib/algo'
import StarGroup from './star-group'
import BuildingGroup from './building-group'
import type { MouseEventHandler, ReactEventHandler } from 'react'

export default function Lottery() {
  const [winner, setWinner] = useState<null | string>(null)
  const handleLoad: ReactEventHandler<HTMLDivElement> = () => {
    const part = localStorage.getItem('parts')
    if(part === undefined || part === null) {
      alert('Please initialize the data!')
    }
  }
  const reveal_winner = async (win: number) => {
    const digits = numTonumarray(win)
    const proc = Array(3).fill(0)
    for(let i = 0; i < digits.length; ++i) {
      for(let j = 0; j <= 1; j += 0.02) {
        for(let k = i; k < digits.length; ++k) {
          proc[k] = getRandomIntInclusive(0, 9)
        }
        setWinner(numarrayToString(proc).padStart(3, '0'))
        await time_sleep(40)
      }
      proc[i] = digits[i]
      setWinner(numarrayToString(proc).padStart(3, '0'))
    }
  }
  const handleClick: MouseEventHandler<HTMLButtonElement> = async () => {
    const part = localStorage.getItem('parts')
    const slog = localStorage.getItem('log')
    if(part === undefined || part === null) {
      alert('Please initialize the data!')
      return
    }
    if(slog === undefined || slog === null) {
      alert('Please initialize the data!')
      return
    }
    const data = JSON.parse(part)
    const log = JSON.parse(slog)
    if(typeof data !== 'object') {
      alert('Data format error!')
      return
    }
    if(typeof log !== 'object') {
      alert('Data format error!')
      return
    }
    if(data.length === 0)
      return
    const win = getWinner(data)
    log.push({ time: Date.now(), winner: win })
    localStorage.setItem('parts', JSON.stringify(data))
    await reveal_winner(win)
    localStorage.setItem('winner', win.toString())
    localStorage.setItem('log', JSON.stringify(log))
  }

  useEffect(() => {
    setWinner(localStorage.getItem('winner'))
  }, [])

  return (
    <>
      <div>
        <StarGroup />
        <BuildingGroup />
        <div className='absolute top-0 left-0 h-screen w-screen flex justify-center items-center bg-gradient-to-b from-[#001430] via-[#001430] via-30% to-[#013885]'>
          <div onLoad={handleLoad} className='relative block translate-y-[-5vh] z-20 select-none h-[50vh] w-[50vh] bg-[#d1cd49] rounded-[50vh] shadow-[#d1cd49] shadow-[0_0_5vh_2vh]'>
            <button onClick={handleClick} className='flex w-full h-full justify-center items-center text-[20vh] text-white'>
              {
                winner ?
                <span className='grid grid-cols-3 w-[67%] text-center'>
                  {
                    winner.padStart(3, '0').split('').map((v, i) => {
                      return <span key={i}>{v}</span>
                    })
                  }
                </span>
                : 'GO'
              }
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
