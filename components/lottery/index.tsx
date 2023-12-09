"use client"

import { useState, useEffect } from 'react'
import { getWinner } from '@/lib/random'
import StarGroup from './star-group'
import BuildingGroup from './building-group'
import type { MouseEventHandler, ReactEventHandler } from 'react'

export default function Lottery() {
  const [winner, setWinner] = useState<null | number>(null)
  const handleLoad: ReactEventHandler<HTMLDivElement> = () => {
    const part = localStorage.getItem('parts')
    if(part === undefined || part === null) {
      alert('Please initialize the data!')
    }
  }
  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
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
    setWinner(win)
    localStorage.setItem('parts', JSON.stringify(data))
    localStorage.setItem('winner', win.toString())
    localStorage.setItem('log', JSON.stringify(log))
  }

  useEffect(() => {
    setWinner(Number(localStorage.getItem('winner')))
  }, [])

  return (
    <>
      <div>
        <StarGroup />
        <BuildingGroup />
        <div className='absolute block top-0 left-0 h-screen w-screen flex justify-center items-center bg-gradient-to-b from-[#001430] via-[#001430] via-30% to-[#013885]'>
          <div onLoad={handleLoad} className='relative block z-20 select-none h-[40vh] w-[40vh] bg-[#d1cd49] rounded-[40vh] shadow-[#d1cd49] shadow-[0_0_5vh_2vh]'>
            <button onClick={handleClick} className='w-full h-full'>
              <span className='text-[20vh] text-white'>
                {
                  winner ? winner.toString() : 'GO'
                }
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
