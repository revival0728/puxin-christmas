"use client"

import WrapBulb from "./wrap-bulb"

export default function LightBulbs() {
  return (
    <>
      <div className='grid grid-cols-5 absolute top-0 left-0 w-screen h-screen bg-gradient-to-b from-[#001430] via-[#001430] via-30% to-[#013885]'>
        <WrapBulb
          winner={null}
          on={false}
          handleLoad={()=>{}}
          handleClick={()=>{}}
        />
        <WrapBulb
          winner={null}
          on={false}
          handleLoad={()=>{}}
          handleClick={()=>{}}
        />
        <WrapBulb
          winner={null}
          on={false}
          handleLoad={()=>{}}
          handleClick={()=>{}}
        />
        <WrapBulb
          winner={null}
          on={false}
          handleLoad={()=>{}}
          handleClick={()=>{}}
        />
        <WrapBulb
          winner={null}
          on={false}
          handleLoad={()=>{}}
          handleClick={()=>{}}
        />
      </div>
    </>
  )
}
