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
      <div className='block select-none w-[50vh] h-full'>
        <div className='relative block h-full w-[2vh] mx-auto bg-black' />
        <div className='relative block rounded-t-[4.5vh] bg-[#828583] z-20 h-[5vh] w-[10vh] mx-auto translate-y-[-4vh]' />
        {
          on ?
          <div onLoad={handleLoad} className='relative block translate-y-[-5vh] z-20 h-[50vh] w-[50vh] bg-[#d1cd49] rounded-[50vh] shadow-[#d1cd49] shadow-[0_0_5vh_2vh]'>
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
                : ''
              }
            </button>
          </div> :
          <div onLoad={handleLoad} className='relative block translate-y-[-5vh] z-20 h-[50vh] w-[50vh] bg-gradient-radial from-transparent from-[60%] to-[#dbdbdb] opacity-20 rounded-[50vh]' />
        }
      </div>
    </>
  )
}
