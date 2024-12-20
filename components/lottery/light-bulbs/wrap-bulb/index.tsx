"use client"

import Bulb from "../bulb"
import type { BulbPropType } from "../bulb"

export default function WrapBulb({ winner, on, handleLoad, handleClick }: BulbPropType) {
  return (
    <>
      <div className='inline-flex justify-center h-full w-full odd:translate-y-[-40vh] even:translate-y-[-60vh]'>
        <div className='scale-[50%] h-full'>
          <Bulb
            winner={winner} 
            on={on}
            handleLoad={handleLoad}
            handleClick={handleClick}
          />
        </div>
      </div>
    </>
    
  )
}
