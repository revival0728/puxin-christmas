"use client"

import Bulb from "../bulb"
import type { BulbPropType } from "../bulb"

export default function WrapBulb({ winner, on, handleLoad, handleClick }: BulbPropType) {
  return (
    <>
      <div className='scale-[50%] odd:translate-y-[-40vh] even:translate-y-[-60vh]'>
        <Bulb
          winner={winner} 
          on={on}
          handleLoad={handleLoad}
          handleClick={handleClick}
        />
      </div>
    </>
    
  )
}
