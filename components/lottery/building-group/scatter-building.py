import random

css = """\
span.building:nth-of-type({n}) {{
  left: {x}vw;
  height: {h}vh;
  width: {w}vw;
}}
"""

react = """\
"use client"

import Building from "./building";
import './building-group.css'

export default function BuildingGroup() {{
  return (
    <>
      <div className='building-group'>
{}
      </div>
    </>
  )
}}
"""

building_count = 50
buildings = []

for i in range(building_count):
    h = random.randint(3, 10)
    w = 100 / building_count
    x = w * i
    buildings.append(css.format(n = i+1, x = x, h = h, w = w))

with open('./components/lottery/building-group/building-group.css', 'w') as f:
  f.write('\n'.join(buildings))

with open('./components/lottery/building-group/index.tsx', 'w') as f:
  f.write(react.format('\t\t\t\t<Building />\n' * building_count))
