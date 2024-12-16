"use client"

import StarGroup from './star-group'
import BuildingGroup from './building-group'
import LightBulbs from './light-bulbs'

export default function Lottery() {
  return (
    <>
      <div className='absolute top-0 left-0 w-screen h-screen bg-gradient-to-b from-[#001430] via-[#001430] via-30% to-[#013885]'>
        <StarGroup />
        <BuildingGroup />
        <LightBulbs />
      </div>
    </>
  )
}
