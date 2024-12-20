"use client"

import type { MouseEventHandler, ReactEventHandler } from 'react'

export type BulbPropType = { 
  winner: string | null, 
  on: boolean,
  handleLoad: ReactEventHandler<HTMLDivElement>,
  handleClick: MouseEventHandler,
}

export default function Bulb({ winner, on, handleLoad, handleClick }: BulbPropType) {
  return (
    <>
      <div className='block select-none w-[30vw] h-full'>
        <div className='relative block h-full w-[1vw] mx-auto bg-black translate-y-[-1.5vh]' />
        <div className='relative block rounded-t-[1.9vw] bg-[#828583] z-[20] h-[2.5vw] w-[4.7vw] mx-auto translate-y-[-4.5vh]' />
        {
          on ?
          <div onLoad={handleLoad} className='relative block translate-y-[-5vh] z-20 h-[30vw] w-[30vw] bg-[#d1cd49] rounded-[30vw] shadow-[#d1cd49] shadow-[0_0_5vh_2vh]'>
            <button onClick={handleClick} className='flex w-full h-full justify-center items-center text-[13vw] text-white'>
              {
                winner ?
                <span className='grid grid-cols-3 w-[67%] text-center'>
                  {
                    winner.padStart(3, '0').split('').map((v, i) => {
                      return <span key={i}>{v}</span>
                    })
                  }
                </span>
                : ''
              }
            </button>
          </div> :
          <div onLoad={handleLoad} className='relative block translate-y-[-5vh] z-20 h-[30vw] w-[30vw] bg-gradient-radial from-transparent from-[60%] to-[#dbdbdb] opacity-50 rounded-[50vh]'>
            <button onClick={handleClick} className='block w-full h-full'/>
          </div>
        }
      </div>
    </>
  )
}
